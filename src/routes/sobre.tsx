import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, CtaLink } from "@/components/site/primitives";
import { about } from "@/content/about";
import { featuredPartners, partners, WHATSAPP_URL } from "@/content/site";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Innomaker | Engenharia e tecnologia na prática" },
      { name: "description", content: "Conheça a Innomaker: nossa trajetória, nossa abordagem e quem transforma desafios de engenharia e tecnologia em soluções aplicáveis." },
      { property: "og:title", content: "Sobre a Innomaker — Tecnologia que nasceu da prática" },
      { property: "og:description", content: about.introduction },
      { property: "og:type", content: "website" },
      { property: "og:image", content: about.images.field },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Introduction />
        <Trajectory />
        <Approach />
        <Founder />
        <Partners />
        <Conversation />
      </main>
      <SiteFooter />
    </>
  );
}

function Introduction() {
  return (
    <section aria-labelledby="sobre-title" className="relative overflow-hidden bg-graphite text-on-graphite">
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-40">
        <div className="grid gap-10 md:grid-cols-12 md:items-center lg:gap-16">
          <div className="md:col-span-7">
            <p className="mb-6 text-sm text-on-graphite-muted">Sobre a Innomaker</p>
            <h1 id="sobre-title" className="animate-rise max-w-3xl text-[clamp(2.25rem,4.8vw,4.25rem)] font-extrabold uppercase leading-[1.02]">
              Tecnologia que <span className="text-primary">nasceu da prática.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-on-graphite-muted sm:text-lg">
              E se transforma em soluções que geram impacto real.
            </p>
            <a href="#trajetoria" className="mt-6 inline-flex border-b border-primary pb-1 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Conheça nossa trajetória <span aria-hidden="true" className="ml-4">↓</span>
            </a>
          </div>
          <figure className="mx-auto w-full max-w-[440px] md:col-span-5 md:justify-self-end">
            <img src={about.images.field} alt="Innoboat navegando em frente ao Museu de Arte Contemporânea de Niterói" width={1441} height={1442} fetchPriority="high" className="aspect-[4/3] w-full object-cover object-[center_70%]" />
            <figcaption className="mt-4 space-y-1 border-l-2 border-primary pl-3 text-xs leading-relaxed text-on-graphite-muted">
              <span className="block">Innoboat em campo · Niterói, RJ</span>
              <span className="block">Engenharia aplicada a desafios reais.</span>
            </figcaption>
          </figure>
        </div>
        <div className="mt-14 grid gap-6 border-t border-line-dark pt-10 sm:mt-16 md:grid-cols-12 md:gap-10 lg:mt-20 lg:pt-12">
          <h2 className="max-w-lg text-2xl font-bold uppercase leading-[1.15] sm:text-3xl md:col-span-5 lg:text-4xl">Uma extensão da sua engenharia e do seu <span className="text-primary">P&amp;D.</span></h2>
          <p className="max-w-2xl text-base leading-relaxed text-on-graphite-muted sm:text-lg md:col-span-7 lg:text-xl">{about.introduction}</p>
        </div>
      </Container>
    </section>
  );
}

function Trajectory() {
  return (
    <section id="trajetoria" aria-labelledby="trajetoria-title" className="scroll-mt-20 bg-background">
      <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="trajetoria-title" className="text-3xl font-bold uppercase leading-[1.08] sm:text-4xl">Da primeira ideia<br />à <span className="text-primary">evolução contínua.</span></h2>
          <figure className="mt-8 max-w-md">
            <img src={about.images.team} alt="Profissionais da Innomaker em uma mesa de trabalho com computadores" width={712} height={712} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
            <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">Conhecimento técnico e experiência prática.</figcaption>
          </figure>
        </div>
        <ol aria-label="Trajetória da Innomaker" className="border-t border-foreground lg:col-span-7">
          {about.timeline.map((milestone) => (
            <li key={milestone.year} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4 border-b border-border py-7 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-8 sm:py-8">
              <span className="font-mono text-base text-primary sm:text-lg">{milestone.year}</span>
              <div>
                <h3 className="text-lg font-semibold uppercase leading-snug">{milestone.title}</h3>
                {"description" in milestone && <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Approach() {
  return (
    <section aria-labelledby="abordagem-title" className="bg-graphite text-on-graphite">
      <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <h2 id="abordagem-title" className="text-3xl font-bold uppercase leading-[1.08] sm:text-4xl">Como encaramos<br />cada <span className="text-primary">desafio.</span></h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-on-graphite-muted">Engenharia, processos e tecnologia integrados para desenvolver soluções de acordo com as necessidades de cada projeto.</p>
          <CtaLink href="/servicos" variant="outline-dark" className="mt-8">Conheça nossos serviços</CtaLink>
        </div>
        <div className="border-t border-primary lg:col-span-7">
          {about.approach.map((item) => (
            <details key={item.title} open className="group border-b border-line-dark px-1 transition-colors duration-200 hover:border-primary/60 hover:bg-on-graphite/5 focus-within:border-primary motion-reduce:transition-none">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold uppercase transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold uppercase sm:text-xl">{item.title}</h3>
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-primary">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-current group-open:hidden" />
                </span>
              </summary>
              <p className="max-w-xl pb-6 pr-6 text-base leading-relaxed text-on-graphite-muted">{item.description}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Founder() {
  return (
    <section aria-labelledby="fundador-title" className="bg-background">
      <Container className="grid gap-10 py-20 md:grid-cols-12 md:items-center lg:gap-20 lg:py-28">
        <figure className="md:col-span-5">
          <img src={about.images.founder} alt="Wanderson Corrêa, fundador da Innomaker" width={1182} height={1242} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
        </figure>
        <div className="md:col-span-7">
          <p className="mb-5 text-sm text-muted-foreground">Quem faz a Innomaker</p>
          <h2 id="fundador-title" className="text-3xl font-bold uppercase leading-[1.08] sm:text-4xl">{about.founder.name}</h2>
          <p className="mt-3 text-sm font-medium text-primary">{about.founder.role}</p>
          <div className="mt-8 max-w-xl space-y-5 border-t border-border pt-8 text-base leading-relaxed text-muted-foreground">
            <p className="text-foreground">{about.founder.introduction}</p>
            <p>{about.founder.description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Partners() {
  return (
    <section aria-labelledby="parceiros-title" className="bg-background">
      <Container className="pb-20 lg:pb-24">
        <div className="border-t border-border pt-12">
          <h2 id="parceiros-title" className="text-center text-2xl font-bold uppercase sm:text-3xl">Parceiros que confiam</h2>
          <ul className="mt-8 grid grid-cols-1 border-y border-border sm:grid-cols-3">
            {featuredPartners.map((partner) => (
              <li key={partner.name} className="flex h-32 items-center justify-center border-border px-6 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r">
                <img src={partner.logoUrl} alt={partner.name} loading="lazy" className="h-16 w-full max-w-[200px] object-contain" />
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
            {partners.map((partner) => (
              <li key={partner.name} className="flex h-14 min-w-0 items-center justify-center">
                <img src={partner.logoUrl} alt={partner.name} loading="lazy" className="max-h-12 w-auto max-w-full object-contain" />
              </li>
            ))}
          </ul>
          </div>
      </Container>
    </section>
  );
}

function Conversation() {
  return (
    <section aria-labelledby="conversa-title" className="border-l-4 border-primary bg-graphite text-on-graphite">
      <Container className="grid gap-8 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
        <h2 id="conversa-title" className="max-w-2xl text-3xl font-extrabold uppercase leading-[1.05] sm:text-4xl lg:col-span-7">Seu desafio pode virar <span className="text-primary">uma solução.</span></h2>
        <div className="lg:col-span-5">
          <p className="text-base leading-relaxed text-on-graphite-muted">Vamos colocar as suas ideias em prática.</p>
          <CtaLink href={WHATSAPP_URL} className="mt-6">Fale com a Innomaker</CtaLink>
        </div>
      </Container>
    </section>
  );
}
