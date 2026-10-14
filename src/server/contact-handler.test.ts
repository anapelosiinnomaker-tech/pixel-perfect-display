import { describe, expect, it, vi } from "vitest";
import { createContactHandler, type ContactEnv } from "./contact-handler.server";
import { getContactEnv } from "./contact-env.server";

const environment: ContactEnv = { RESEND_API_KEY: "test-only-key", CONTACT_FROM_EMAIL: "Innomaker <sender@example.test>", CONTACT_ORIGIN: "https://site.example", TURNSTILE_SITE_KEY: "public-test-key", TURNSTILE_SECRET_KEY: "test-only-secret" };
const valid = { name: "Pessoa Teste", email: "pessoa@example.test", company: "Empresa", phone: "+55 (21) 99999-1234", subject: "Projeto de engenharia", message: "Gostaria de conversar sobre um projeto.", website: "", token: "test-challenge", submissionId: "d119f590-a067-4904-8b70-ccf0ff27b079" };
const request = (data: unknown = valid, origin = "https://site.example") => new Request("https://site.example/api/contato", { method: "POST", headers: { "Content-Type": "application/json", origin }, body: JSON.stringify(data) });
const approved = () => Response.json({ success: true, hostname: "site.example", action: "contact" });
const sender = () => vi.fn<typeof fetch>().mockResolvedValueOnce(approved()).mockResolvedValueOnce(Response.json({ id: "email-id" }));

describe("Contact endpoint", () => {
  it("sends one real API request addressed to both recipients with visitor reply-to", async () => {
    const fetcher = sender();
    const handle = createContactHandler(() => environment, fetcher);
    const response = await handle(request());
    expect(await response.json()).toEqual({ ok: true });
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[1]?.[0]).toBe("https://api.resend.com/emails");
    const options = fetcher.mock.calls[1]?.[1];
    const payload = JSON.parse(options?.body as string);
    expect(payload.to).toEqual(["anapelosi.innomaker@gmail.com", "wandersoncorrea@innomaker.com.br"]);
    expect(payload.from).toBe(environment.CONTACT_FROM_EMAIL);
    expect(payload.reply_to).toBe(valid.email);
    expect(payload.text).toContain(valid.message);
    expect(payload).not.toHaveProperty("html");
    expect(options?.headers).toMatchObject({ "Idempotency-Key": `contact/${valid.submissionId}` });
  });
  it.each([
    { ...valid, name: "" }, { ...valid, email: "bad" }, { ...valid, phone: "123" },
    { ...valid, subject: "x\r\nBcc: somebody" }, { ...valid, message: "curta" },
    { ...valid, message: "x".repeat(5001) }, { ...valid, website: "spam.test" },
    { ...valid, token: "" }, { ...valid, to: ["other@example.test"] },
  ])("rejects invalid or manipulated input before external requests", async data => {
    const fetcher = sender();
    expect((await createContactHandler(() => environment, fetcher)(request(data))).status).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("requires matching origin", async () => {
    const fetcher = sender();
    expect((await createContactHandler(() => environment, fetcher)(request(valid, "https://attacker.example"))).status).toBe(403);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("limits request bytes even without Content-Length", async () => {
    expect((await createContactHandler(() => environment)(request({ ...valid, message: "é".repeat(20000) }))).status).toBe(413);
  });
  it("rejects malformed JSON and unsupported content type", async () => {
    const handle = createContactHandler(() => environment);
    const malformed = request();
    expect((await handle(new Request(malformed, { body: "{" }))).status).toBe(400);
    const wrongType = request(); wrongType.headers.set("content-type", "text/plain");
    expect((await handle(wrongType)).status).toBe(415);
  });
  it("fails closed without secrets and never discloses them in public config", async () => {
    const fetcher = sender();
    const handle = createContactHandler(() => ({}), fetcher);
    expect(await (await handle(new Request("https://site.example/api/contato"))).json()).toEqual({ siteKey: null });
    expect((await handle(request())).status).toBe(503);
    expect(fetcher).not.toHaveBeenCalled();
    const configured = createContactHandler(() => environment, fetcher);
    expect(await (await configured(new Request("https://site.example/api/contato"))).json()).toEqual({ siteKey: environment.TURNSTILE_SITE_KEY });
  });
  it.each([{ success: false }, { success: true, hostname: "other.test", action: "contact" }, { success: true, hostname: "site.example", action: "other" }])("blocks failed, wrong-host or wrong-action challenges", async result => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(result));
    expect((await createContactHandler(() => environment, fetcher)(request())).status).toBe(400);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it.each([400, 403, 429, 500])("never reports success when Resend returns %s", async status => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValueOnce(approved()).mockResolvedValueOnce(Response.json({ message: "private provider details" }, { status }));
    const response = await createContactHandler(() => environment, fetcher)(request());
    expect(response.status).toBe(502);
    const result = await response.json();
    expect(result.ok).toBe(false);
    expect(JSON.stringify(result)).not.toContain("private provider details");
  });
  it("rejects unexpected success payloads and handles provider timeouts", async () => {
    const invalidResponse = vi.fn<typeof fetch>().mockResolvedValueOnce(approved()).mockResolvedValueOnce(Response.json({}));
    expect((await createContactHandler(() => environment, invalidResponse)(request())).status).toBe(502);
    const networkError = vi.fn<typeof fetch>().mockResolvedValueOnce(approved()).mockRejectedValueOnce(new Error("timeout"));
    expect((await createContactHandler(() => environment, networkError)(request())).status).toBe(502);
    const challengeFailure = vi.fn<typeof fetch>().mockResolvedValue(Response.json({}, { status: 503 }));
    expect((await createContactHandler(() => environment, challengeFailure)(request())).status).toBe(503);
  });
  it("throttles attempts and permits another window after expiry", async () => {
    let clock = 0;
    const fetcher = sender();
    const handle = createContactHandler(() => environment, fetcher, () => clock);
    for (let i = 0; i < 5; i++) expect((await handle(request({}))).status).toBe(400);
    expect((await handle(request())).status).toBe(429);
    expect(fetcher).not.toHaveBeenCalled();
    clock = 60_001;
    expect((await handle(request())).status).toBe(200);
  });
  it("reads per-request Cloudflare bindings without exposing all bindings", () => {
    const runtimeRequest = Object.assign(new Request("https://site.example"), { runtime: { cloudflare: { env: { ...environment, UNRELATED_SECRET: "private" } } } });
    expect(getContactEnv(runtimeRequest)).toEqual(environment);
  });
});
