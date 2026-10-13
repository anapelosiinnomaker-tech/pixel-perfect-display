import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("eyebrow flex items-center gap-3", className)}>
      {index && <span className="text-primary">{index}</span>}
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </div>
  );
}

type CtaProps = { href: string; children: ReactNode; variant?: "primary" | "outline-dark" | "outline-light"; className?: string };

export function CtaLink({ href, children, variant = "primary", className }: CtaProps) {
  const external = href.startsWith("http");
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-foreground",
    "outline-dark": "border border-line-dark text-on-graphite hover:border-primary hover:text-primary",
    "outline-light": "border border-foreground/20 text-foreground hover:border-primary hover:text-primary",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-3 rounded-sm px-6 py-4 text-sm font-medium tracking-wide transition-colors duration-300",
        styles,
        className,
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

import { images, WHATSAPP_URL } from "@/content/site";

export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const src = tone === "dark" ? images.logoWhite : images.logoColor;
  return <img src={src} alt="Innomaker — Criando Inovações" className="h-8 w-auto sm:h-9" />;
}

/** Botão global do WhatsApp — renderizado uma única vez em __root. */
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale com a Innomaker pelo WhatsApp"
      className="fixed bottom-4 right-4 z-[2147483647] block h-12 w-12 drop-shadow-lg transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <img src={images.whatsappIcon} alt="" width={56} height={56} className="h-full w-full object-contain" />
    </a>
  );
}
