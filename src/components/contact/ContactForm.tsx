import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { contactFieldsSchema, fieldErrors, type ContactErrors, type ContactFields, type ContactResult } from "@/lib/contact";
import { ContactChallenge } from "./ContactChallenge";

const fields: { name: Exclude<keyof ContactFields, "message">; label: string; type: string; autoComplete?: string; maxLength: number; optional?: boolean }[] = [
  { name: "name", label: "Nome", type: "text", autoComplete: "name", maxLength: 100 },
  { name: "email", label: "E-mail", type: "email", autoComplete: "email", maxLength: 254 },
  { name: "company", label: "Empresa", type: "text", autoComplete: "organization", maxLength: 150, optional: true },
  { name: "phone", label: "Telefone", type: "tel", autoComplete: "tel", maxLength: 30 },
  { name: "subject", label: "Assunto", type: "text", maxLength: 150 },
];
const inputClass = "mt-2 w-full rounded-sm border border-foreground/25 bg-background px-4 py-3 text-base text-foreground transition-colors focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:opacity-60 aria-invalid:border-destructive";

export function ContactForm() {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [configuration, setConfiguration] = useState<"loading" | "ready" | "error">("loading");
  const [token, setToken] = useState("");
  const [challengeVersion, setChallengeVersion] = useState(0);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const submissionId = useRef<string | null>(null);
  const inFlight = useRef(false);
  const statusElement = useRef<HTMLDivElement>(null);
  const touched = useRef(new Set<keyof ContactFields>());

  function validateField(name: keyof ContactFields, value: string) {
    const parsed = contactFieldsSchema.shape[name].safeParse(value);
    setErrors(previous => {
      const next = { ...previous };
      if (parsed.success) delete next[name];
      else next[name] = parsed.error.issues[0]?.message ?? "Confira este campo.";
      return next;
    });
  }

  function blurField(name: keyof ContactFields, value: string) {
    touched.current.add(name);
    validateField(name, value);
  }

  function changeField(name: keyof ContactFields, value: string) {
    if (touched.current.has(name) || errors[name]) validateField(name, value);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contato", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Unavailable");
      const config = await response.json() as { siteKey?: unknown };
      if (typeof config.siteKey !== "string" || !config.siteKey) throw new Error("Unavailable");
      setSiteKey(config.siteKey);
      setConfiguration("ready");
    }).catch(() => { if (!controller.signal.aborted) setConfiguration("error"); });
    return () => controller.abort();
  }, []);
  const challengeFailure = useCallback(() => {
    setStatus("error");
    setMessage("Não foi possível carregar a verificação de segurança. Verifique sua conexão e use “Tentar verificação novamente”.");
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = contactFieldsSchema.safeParse(Object.fromEntries(formData));
    touched.current = new Set(Object.keys(contactFieldsSchema.shape) as (keyof ContactFields)[]);
    if (!parsed.success) {
      const validationErrors = fieldErrors(parsed.error);
      setErrors(validationErrors);
      const firstField = Object.keys(validationErrors)[0];
      if (firstField) (form.elements.namedItem(firstField) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    if (!token || configuration !== "ready") {
      setStatus("error"); setMessage("Conclua a verificação de segurança antes de enviar."); return;
    }
    inFlight.current = true;
    setStatus("submitting");
    setMessage("");
    submissionId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/contato", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: formData.get("website") || "", token, submissionId: submissionId.current }),
        signal: AbortSignal.timeout(30_000),
      });
      const result = await response.json() as ContactResult;
      if (!response.ok || result.ok !== true) {
        setStatus("error");
        setMessage(result.ok === false ? result.message : "Não foi possível enviar. Tente novamente ou fale conosco pelo WhatsApp.");
        if (result.ok === false && result.errors) setErrors(result.errors);
      } else {
        setStatus("success");
        setMessage("Mensagem enviada! Obrigado pelo contato.");
        form.reset();
        touched.current.clear();
        submissionId.current = null;
      }
    } catch {
      setStatus("error");
      setMessage("Não foi possível confirmar o envio. Verifique sua conexão e tente novamente ou fale conosco pelo WhatsApp.");
    } finally {
      inFlight.current = false;
      setToken("");
      setChallengeVersion(value => value + 1);
      statusElement.current?.focus();
    }
  }

  return (
    <form onSubmit={submit} noValidate aria-labelledby="form-title" aria-busy={status === "submitting"} onChange={() => { submissionId.current = null; }}>
      <div className="mb-8 border-b border-border pb-6">
        <h2 id="form-title" className="text-2xl font-bold uppercase sm:text-3xl">Conte o que você precisa.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Nossa equipe avaliará a melhor forma de contribuir. Apenas o campo empresa é opcional.</p>
      </div>
      <fieldset disabled={status === "submitting"} className="grid min-w-0 gap-x-6 gap-y-5 sm:grid-cols-2">
        <legend className="sr-only">Seus dados e sua mensagem</legend>
        {fields.map(field => (
          <div key={field.name} className={field.name === "subject" ? "sm:col-span-2" : "min-w-0"}>
            <label htmlFor={`contact-${field.name}`} className="text-sm font-medium">{field.label}{field.optional && <span className="font-normal text-muted-foreground"> (opcional)</span>}</label>
            <input id={`contact-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} required={!field.optional} maxLength={field.maxLength} className={inputClass} onBlur={event => blurField(field.name, event.currentTarget.value)} onChange={event => changeField(field.name, event.currentTarget.value)} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} />
            {errors[field.name] && <p id={`error-${field.name}`} aria-live="polite" className="mt-2 text-sm text-destructive">{errors[field.name]}</p>}
          </div>
        ))}
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-medium">Mensagem</label>
          <textarea id="contact-message" name="message" rows={5} required minLength={10} maxLength={5000} className={`${inputClass} min-h-36 resize-y`} onBlur={event => blurField("message", event.currentTarget.value)} onChange={event => changeField("message", event.currentTarget.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "error-message" : undefined} />
          {errors.message && <p id="error-message" aria-live="polite" className="mt-2 text-sm text-destructive">{errors.message}</p>}
        </div>
        <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </fieldset>
      <div className="mt-6 max-w-full">
        {configuration === "loading" && <p role="status" className="text-sm text-muted-foreground">Carregando formulário seguro…</p>}
        {configuration === "error" && <p role="alert" className="text-sm leading-relaxed text-destructive">O formulário está indisponível no momento. Você pode falar conosco pelo WhatsApp.</p>}
        {siteKey && <ContactChallenge key={challengeVersion} siteKey={siteKey} onToken={setToken} onFailure={challengeFailure} />}
        {siteKey && status === "error" && !token && <button type="button" className="mt-3 text-sm underline underline-offset-4 hover:text-primary" onClick={() => { setMessage(""); setStatus("idle"); setChallengeVersion(value => value + 1); }}>Tentar verificação novamente</button>}
      </div>
      <div ref={statusElement} tabIndex={-1} role={status === "error" ? "alert" : "status"} aria-live="polite" className="mt-4 focus:outline-none">
        {message && <p className={`border-l-2 pl-4 text-sm leading-relaxed ${status === "success" ? "border-primary text-foreground" : "border-destructive text-destructive"}`}>{message}</p>}
      </div>
      <button type="submit" disabled={status === "submitting" || configuration !== "ready" || !token} className="mt-6 inline-flex w-full items-center justify-between gap-4 rounded-sm bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {status === "submitting" ? "Enviando mensagem…" : "Enviar mensagem"}
        {status === "submitting" ? <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin motion-reduce:animate-none" /> : <ArrowUpRight aria-hidden="true" className="h-5 w-5" />}
      </button>
      <p className="mt-4 max-w-lg text-xs leading-relaxed text-muted-foreground">Ao enviar, você compartilha esses dados para que a Innomaker possa responder ao seu contato.</p>
    </form>
  );
}
