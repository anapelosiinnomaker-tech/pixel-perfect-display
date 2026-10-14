import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, CtaLink } from "@/components/site/primitives";
import { ContactForm } from "@/components/contact/ContactForm";
import { WHATSAPP_URL } from "@/content/site";

export const Route = createFileRoute("/contato")({
  head: () => ({ meta: [
    { title: "Contato — Innomaker | Seu projeto começa aqui" },
    { name: "description", content: "Conte o que você precisa e nossa equipe avaliará a melhor forma de contribuir. Fale com a Innomaker pelo formulário ou pelo WhatsApp." },
    { property: "og:title", content: "Contato — Innomaker" },
    { property: "og:description", content: "Seu projeto começa aqui. Vamos conversar sobre o seu desafio." },
    { property: "og:type", content: "website" },
  ] }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section aria-labelledby="contact-title" className="relative overflow-hidden bg-graphite text-on-graphite">
          <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
          <Container className="relative grid gap-6 pb-14 pt-32 sm:pb-16 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pt-40">
            <div className="lg:col-span-7">
              <h1 id="contact-title" className="text-[clamp(2.25rem,4.8vw,4.25rem)] font-extrabold uppercase leading-[1.02]">Seu projeto<br /><span className="text-primary">começa aqui.</span></h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-on-graphite-muted sm:text-lg lg:col-span-5 lg:pb-1">Conte o que você precisa e nossa equipe avaliará a melhor forma de contribuir.</p>
          </Container>
        </section>
        <section aria-label="Entre em contato" className="bg-background">
          <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
            <div className="min-w-0 lg:col-span-8"><ContactForm /></div>
            <aside aria-label="Outros canais de contato" className="min-w-0 border-t border-border pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="text-xl font-bold uppercase">Prefere conversar?</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Fale com a Innomaker pelo WhatsApp e compartilhe o que você precisa.</p>
              <CtaLink href={WHATSAPP_URL} variant="outline-light" className="mt-6 w-full justify-between">Fale pelo WhatsApp</CtaLink>
              <div className="mt-10 border-t border-border pt-8">
                <h3 className="text-sm font-semibold uppercase">Acompanhe a Innomaker</h3>
                <ul className="mt-4 divide-y divide-border border-b border-border">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/company/innomaker-brazil/" },
                    { label: "Instagram", href: "https://www.instagram.com/innomakerbrasil/" },
                  ].map(link => <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4 text-sm transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" /></a></li>)}
                </ul>
              </div>
            </aside>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
