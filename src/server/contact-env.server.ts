import type { ContactEnv } from "./contact-handler.server";

type NitroRequest = Request & { runtime?: { cloudflare?: { env?: Record<string, unknown> } } };

export function getContactEnv(request: Request): ContactEnv {
  // Nitro's Cloudflare preset attaches bindings to the request and exposes __env__.
  // Node development uses process.env (start Node with --env-file=.env.local).
  const runtimeEnv = (request as NitroRequest).runtime?.cloudflare?.env
    ?? (globalThis as typeof globalThis & { __env__?: Record<string, unknown> }).__env__;
  const names = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_ORIGIN", "TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"] as const;
  const result: ContactEnv = {};
  for (const name of names) {
    const value = runtimeEnv?.[name] ?? process.env[name];
    if (typeof value === "string" && value) result[name] = value;
  }
  return result;
}
