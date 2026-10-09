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

export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className={cn("font-display text-xl font-extrabold tracking-tight", tone === "dark" ? "text-on-graphite" : "text-foreground")}>
      inno<span className="text-primary">maker</span>
    </span>
  );
}
