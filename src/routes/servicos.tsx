import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, CtaLink, Eyebrow } from "@/components/site/primitives";
import { images, serviceCatalog, WHATSAPP_URL } from "@/content/site";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Innomaker | Engenharia, Processos e Tecnologia" },
      { name: "description", content: "Carta de serviços da Innomaker: desenvolvimento de produtos, prototipagem, engenharia reversa, painéis elétricos, automação, processos e software." },
      { property: "og:title", content: "Carta de Serviços — Innomaker" },
      { property: "og:description", content: "Ideias ganham forma. Projetos ganham caminho. Conheça os serviços da Innomaker." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Intro />
        <AreasIndex />
        {serviceCatalog.map((c, i) => (
          <Category key={c.id} cat={c} dark={i % 2 === 1} />
        ))}
        <ProjectCta />
      </main>
      <SiteFooter />
    </>
  );
}

function Intro() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
      <Container className="relative grid gap-12 pb-16 pt-32 lg:grid-cols-12 lg:items-end lg:pb-24 lg:pt-40">
        <div className="lg:col-span-6">
          <h1 className="animate-rise mt-8 text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.98]" style={{ animationDelay: "120ms" }}>
            Ideias ganham forma.
            <br />
            <span className="text-primary">Projetos</span> ganham caminho.
          </h1>
          <p className="animate-rise mt-8 max-w-lg text-base leading-relaxed text-on-graphite-muted" style={{ animationDelay: "240ms" }}>
            Conheça os serviços disponíveis para o desenvolvimento do seu próximo projeto, desde os primeiros passos até os detalhes que farão a sua visão ganhar forma.
          </p>
          <CtaLink href={WHATSAPP_URL} className="animate-rise mt-10">Solicite um orçamento</CtaLink>
        </div>
        <div className="relative lg:col-span-6">
          <img src={images.servicesIntro} alt="Painel elétrico com controladores e cabeamento organizado" width={1280} height={1024} className="aspect-[5/4] w-full object-cover" />
          <div className="animate-scan absolute inset-x-0 top-0 h-px bg-primary/60" />
        </div>
      </Container>
    </section>
  );
}

function AreasIndex() {
  return (
    <section className="bg-background">
      <Container className="py-16 lg:py-20">
        <Eyebrow className="text-muted-foreground">Nossas áreas de atuação</Eyebrow>
        <div className="mt-10 grid border-t border-foreground md:grid-cols-3">
          {serviceCatalog.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="group flex flex-col gap-3 border-b border-border py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
              <span className="font-mono text-xs text-muted-foreground group-hover:text-primary">{c.index}</span>
              <span className="text-xl font-bold uppercase" style={{ fontFamily: "var(--font-display)" }}>{c.title}</span>
              <span className="text-sm text-muted-foreground">{c.summary}</span>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary">
                Ver serviços <ArrowUpRight className="h-4 w-4 rotate-90" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Category({ cat, dark }: { cat: (typeof serviceCatalog)[number]; dark: boolean }) {
  const muted = dark ? "text-on-graphite-muted" : "text-muted-foreground";
  const strong = dark ? "text-on-graphite" : "text-foreground";
  const line = dark ? "border-line-dark" : "border-border";
  return (
    <section id={cat.id} className={`scroll-mt-20 ${dark ? "bg-graphite text-on-graphite" : "bg-secondary"}`}>
      <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="font-mono text-sm text-primary">{cat.index}.</span>
            <h2 className="mt-3 text-3xl font-bold uppercase sm:text-4xl">{cat.title}</h2>
            <p className={`mt-5 max-w-sm text-base leading-relaxed ${muted}`}>
              {cat.lead} <strong className={`font-medium ${strong}`}>{cat.highlight}</strong>
              {cat.tail ? ` ${cat.tail}` : ""}
            </p>
          </div>
        </div>
        <ol className={`border-t lg:col-span-8 ${dark ? "border-on-graphite" : "border-foreground"}`}>
          {cat.items.map((s) => (
            <li key={s.title} className={`border-b ${line}`}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 gap-x-4 gap-y-3 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">{s.title}</h3>
                  <p className={`mt-2 max-w-xl text-sm leading-relaxed ${muted}`}>{s.description}</p>
                </div>
                <span className={`inline-flex items-center gap-2 text-sm font-medium sm:col-start-2 sm:pt-1 ${strong} group-hover:text-primary`}>
                  Saiba mais <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ProjectCta() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
      <Container className="relative grid gap-10 border-t border-line-dark py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-7">
          <Eyebrow className="text-on-graphite-muted">Contato</Eyebrow>
          <h2 className="mt-6 text-3xl font-extrabold uppercase leading-[0.98] sm:text-5xl">
            Tem um projeto <span className="text-primary">em mente?</span>
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-base leading-relaxed text-on-graphite-muted">
            Conte-nos do que você precisa. Vamos entender o seu desafio <strong className="font-medium text-on-graphite">e encontrar o melhor caminho juntos.</strong>
          </p>
          <CtaLink href={WHATSAPP_URL} className="mt-8">Fale com a Innomaker</CtaLink>
        </div>
      </Container>
    </section>
  );
}
