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
      <Container className="relative pb-12 pt-32 sm:pt-36 lg:pb-16 lg:pt-44">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="mb-6 text-sm text-on-graphite-muted">Sobre a Innomaker</p>
            <h1 id="sobre-title" className="animate-rise max-w-3xl text-[clamp(2.25rem,4.8vw,4.25rem)] font-extrabold uppercase leading-[1.02]">
              Tecnologia que <span className="text-primary">nasceu da prática.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-lg text-base leading-relaxed text-on-graphite-muted">
              E se transforma em soluções que geram impacto real.
            </p>
            <a href="#trajetoria" className="mt-6 inline-flex border-b border-primary pb-1 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Conheça nossa trajetória <span aria-hidden="true" className="ml-4">↓</span>
            </a>
          </div>
        </div>
        <figure className="mt-12 lg:mt-16">
          <img src={about.images.field} alt="Innoboat navegando em frente ao Museu de Arte Contemporânea de Niterói" width={1441} height={1442} fetchPriority="high" className="aspect-[4/3] w-full object-cover object-[center_65%] sm:aspect-[16/9] lg:aspect-[21/9]" />
          <figcaption className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-2 text-xs leading-relaxed text-on-graphite-muted">
            <span>Innoboat em campo · Niterói, RJ</span>
            <span>Engenharia aplicada a desafios reais.</span>
          </figcaption>
        </figure>
        <div className="mt-10 grid gap-6 border-t border-line-dark pt-8 lg:grid-cols-12 lg:gap-12">
          <p className="text-sm text-on-graphite-muted lg:col-span-4">Uma extensão da sua engenharia e do seu P&amp;D.</p>
          <p className="max-w-3xl text-base leading-relaxed sm:text-lg lg:col-span-8">{about.introduction}</p>
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
    <section aria-labelledby="abordagem-title" className="bg-secondary">
      <Container className="py-20 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <h2 id="abordagem-title" className="text-3xl font-bold uppercase leading-[1.08] sm:text-4xl lg:col-span-5">Como encaramos<br />cada desafio.</h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:col-span-7 lg:self-end">Engenharia, processos e tecnologia integrados para desenvolver soluções de acordo com as necessidades de cada projeto.</p>
        </div>
        <div className="mt-10 grid border-t border-foreground md:grid-cols-3 lg:mt-14">
          {about.approach.map((item) => (
            <div key={item.title} className="border-b border-border py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <h3 className="text-lg font-semibold uppercase">{item.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8"><CtaLink href="/servicos" variant="outline-light">Conheça nossos serviços</CtaLink></div>
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
      <Container className="border-t border-border pb-20 pt-12 lg:pb-24">
        <h2 id="parceiros-title" className="text-2xl font-bold uppercase sm:text-3xl">Parceiros que confiam.</h2>
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
