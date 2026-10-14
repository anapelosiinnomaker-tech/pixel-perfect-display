import { contactRequestSchema, fieldErrors, type ContactResult } from "@/lib/contact";

export type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_ORIGIN?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
};

const recipients = ["anapelosi.innomaker@gmail.com", "wandersoncorrea@innomaker.com.br"];
const unavailable = "Não foi possível enviar sua mensagem agora. Tente novamente ou fale conosco pelo WhatsApp.";
const reply = (body: ContactResult | { siteKey: string | null }, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
const fail = (message: string, status: number) => reply({ ok: false, message }, status);

// Supplemental per-instance throttle; Turnstile verification is mandatory even on cold starts.
export function createContactHandler(getEnv: (request: Request) => ContactEnv, fetcher: typeof fetch = fetch, now = Date.now) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return async function handleContact(request: Request): Promise<Response> {
    const env = getEnv(request);
    const configured = Boolean(env.RESEND_API_KEY && env.CONTACT_FROM_EMAIL && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY);
    if (request.method === "GET") return reply({ siteKey: configured ? env.TURNSTILE_SITE_KEY! : null });
    if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
    const origin = env.CONTACT_ORIGIN || new URL(request.url).origin;
    if (request.headers.get("origin") !== origin || request.headers.get("sec-fetch-site") === "cross-site") return fail("Origem da solicitação inválida.", 403);
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return fail("Formato de solicitação inválido.", 415);
    const time = now();
    for (const [key, entry] of attempts) if (entry.expires <= time) attempts.delete(key);
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const entry = attempts.get(ip) || { count: 0, expires: time + 60_000 };
    if (entry.count >= 5 || (!attempts.has(ip) && attempts.size >= 2000)) return fail("Muitas tentativas. Aguarde um minuto antes de tentar novamente.", 429);
    entry.count++;
    attempts.set(ip, entry);
    let input: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return fail("Preencha os campos do formulário.", 400);
      let bytes = 0;
      const chunks: Uint8Array[] = [];
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        bytes += chunk.value.byteLength;
        if (bytes > 16_384) { await reader.cancel(); return fail("Mensagem muito longa.", 413); }
        chunks.push(chunk.value);
      }
      const data = new Uint8Array(bytes);
      let offset = 0;
      for (const chunk of chunks) { data.set(chunk, offset); offset += chunk.byteLength; }
      input = JSON.parse(new TextDecoder().decode(data));
    } catch { return fail("Não foi possível ler o formulário.", 400); }
    const parsed = contactRequestSchema.safeParse(input);
    if (!parsed.success) return reply({ ok: false, message: "Confira os campos e a verificação de segurança.", errors: fieldErrors(parsed.error) }, 400);
    if (!configured) return fail(unavailable, 503);
    const data = parsed.data;
    try {
      const verificationResponse = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: data.token }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!verificationResponse.ok) return fail(unavailable, 503);
      const verification = await verificationResponse.json() as { success?: boolean; hostname?: string; action?: string };
      if (!verification.success || verification.hostname !== new URL(origin).hostname || verification.action !== "contact") return fail("A verificação de segurança expirou ou falhou. Verifique novamente e tente enviar.", 400);
      const response = await fetcher("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${data.submissionId}` },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL,
          to: recipients,
          reply_to: data.email,
          subject: `Contato pelo site — ${data.subject}`,
          text: [`Nome: ${data.name}`, `E-mail: ${data.email}`, `Empresa: ${data.company || "Não informada"}`, `Telefone: ${data.phone}`, `Assunto: ${data.subject}`, "", data.message].join("\n"),
        }),
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) return fail(unavailable, 502);
      const result = await response.json() as { id?: unknown };
      if (typeof result.id !== "string" || !result.id) return fail(unavailable, 502);
      return reply({ ok: true });
    } catch { return fail(unavailable, 502); }
  };
}
