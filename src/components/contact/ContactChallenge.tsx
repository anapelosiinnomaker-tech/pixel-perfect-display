import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: { sitekey: string; action: string; theme: string; size: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }
let scriptPromise: Promise<TurnstileApi> | undefined;
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    const timeout = window.setTimeout(() => { script.remove(); reject(new Error("Verification timeout")); }, 15000);
    script.onload = () => { clearTimeout(timeout); window.turnstile ? resolve(window.turnstile) : reject(new Error("Verification unavailable")); };
    script.onerror = () => { clearTimeout(timeout); script.remove(); reject(new Error("Verification unavailable")); };
    document.head.append(script);
  }).catch(error => { scriptPromise = undefined; throw error; });
  return scriptPromise;
}

export function ContactChallenge({ siteKey, onToken, onFailure }: { siteKey: string; onToken: (token: string) => void; onFailure: () => void }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let widget: string | undefined;
    let api: TurnstileApi | undefined;
    let observer: ResizeObserver | undefined;
    loadTurnstile().then(loaded => {
      if (disposed || !element.current) return;
      api = loaded;
      let currentSize: string | undefined;
      const renderWidget = () => {
        if (disposed || !element.current || !api) return;
        // Flexible widgets require 300px; compact fits the narrowest phone layout.
        const size = element.current.clientWidth < 300 ? "compact" : "flexible";
        if (size === currentSize) return;
        if (widget !== undefined) api.remove(widget);
        currentSize = size;
        onToken("");
        try {
          widget = api.render(element.current, { sitekey: siteKey, action: "contact", theme: "light", size, callback: onToken, "expired-callback": () => onToken(""), "error-callback": () => { onToken(""); onFailure(); } });
        } catch { onFailure(); }
      };
      renderWidget();
      observer = new ResizeObserver(renderWidget);
      observer.observe(element.current);
    }).catch(() => { if (!disposed) onFailure(); });
    return () => { disposed = true; observer?.disconnect(); if (widget !== undefined) api?.remove(widget); };
  }, [siteKey, onToken, onFailure]);
  return <div ref={element} className="min-h-[65px] w-full" aria-label="Verificação de segurança" />;
}
