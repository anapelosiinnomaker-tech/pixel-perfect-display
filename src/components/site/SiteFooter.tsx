import { nav, services, social } from "@/content/site";
import { Container, Wordmark } from "./primitives";

export function SiteFooter() {
  return (
    <footer className="bg-graphite text-on-graphite">
      <Container className="grid gap-12 border-t border-line-dark py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark tone="dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-graphite-muted">
            Integramos engenharia, processos e tecnologia para desenvolver soluções de acordo com as necessidades de cada projeto.
          </p>
        </div>
        <FooterCol title="Empresa" items={nav} />
        <FooterCol title="Serviços" items={services.map((s) => ({ label: s.title, href: s.href }))} />
        <FooterCol title="Redes" items={social} external />
      </Container>
      <Container className="flex flex-col justify-between gap-2 border-t border-line-dark py-6 text-xs text-on-graphite-muted sm:flex-row">
        <span>© {new Date().getFullYear()} Innomaker. Todos os direitos reservados.</span>
        <span className="eyebrow">Engenharia · Processos · Tecnologia</span>
      </Container>
    </footer>
  );
}

function FooterCol({ title, items, external }: { title: string; items: { label: string; href: string }[]; external?: boolean }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <p className="eyebrow text-on-graphite-muted">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="transition-colors hover:text-primary">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
