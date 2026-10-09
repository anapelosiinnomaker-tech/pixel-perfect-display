import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, WHATSAPP_URL } from "@/content/site";
import { Container, Wordmark } from "./primitives";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "border-b border-line-dark bg-graphite/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between py-5">
        <a href="/" aria-label="Innomaker — início">
          <Wordmark tone="dark" />
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="text-sm text-on-graphite-muted transition-colors hover:text-on-graphite">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-on-graphite hover:text-graphite sm:inline-flex"
          >
            Fale conosco
          </a>
          <button
            className="text-on-graphite md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>
      {open && (
        <Container className="flex flex-col gap-1 pb-6 md:hidden">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="border-b border-line-dark py-3 text-on-graphite">
              {n.label}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-4 rounded-sm bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground">
            Fale conosco
          </a>
        </Container>
      )}
    </header>
  );
}
