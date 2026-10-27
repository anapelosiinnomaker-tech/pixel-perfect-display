import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, CtaLink, Eyebrow } from "@/components/site/primitives";
import { WHATSAPP_URL } from "@/content/site";
import innoboatAsset from "@/assets/innoboat.png.asset.json";
import innoboatPoster from "@/assets/innoboat-video-poster.jpg.asset.json";

const VIDEO_URL = "https://res.cloudinary.com/i1pdbo6b/video/upload/V%C3%ADdeo_Innoboat_Final.mp4";

export const Route = createFileRoute("/innoboat")({
  head: () => ({
    meta: [
      { title: "Conheça o Innoboat — Innomaker | Monitoramento ambiental" },
      { name: "description", content: "O Innoboat é um catamarã elétrico, alimentado por energia solar e controlado remotamente, para monitoramento ambiental em rios, lagos, baías e regiões costeiras." },
      { property: "og:title", content: "Conheça o Innoboat — Innomaker" },
      { property: "og:description", content: "Catamarã 100% elétrico e solar para coleta de dados ambientais em tempo real." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InnoboatPage,
});

const differentials = [
  {
    index: "01",
    title: "Energia solar",
    text: "100% elétrico, alimentado por painéis solares e baterias. Navegação sem combustíveis fósseis.",
  },
  {
    index: "02",
    title: "Operação remota",
    text: "Controlado à distância, reduz riscos para equipes e custos operacionais.",
  },
  {
    index: "03",
    title: "Estrutura modular",
    text: "Catamarã de dois cascos que acopla diferentes sondas conforme a aplicação.",
  },
  {
    index: "04",
    title: "Dados em tempo real",
    text: "Qualidade da água, batimetria e varredura disponibilizados em um dashboard.",
  },
];

function InnoboatPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <VideoSection />
        <Differentials />
        <ProductCta />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
      <Container className="relative grid gap-12 pb-16 pt-32 lg:grid-cols-12 lg:items-center lg:pb-24 lg:pt-40">
        <div className="lg:col-span-6">
          <Eyebrow className="text-on-graphite-muted">Conheça o Innoboat</Eyebrow>
          <h1 className="animate-rise mt-8 text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.98]" style={{ animationDelay: "120ms" }}>
            Monitoramento ambiental <span className="text-primary">sobre a água.</span>
          </h1>
          <p className="animate-rise mt-8 max-w-lg text-base leading-relaxed text-on-graphite-muted" style={{ animationDelay: "240ms" }}>
            O Innoboat é um catamarã <strong className="font-medium text-on-graphite">100% elétrico</strong>, alimentado por energia solar e controlado remotamente, que coleta dados ambientais em rios, lagos, baías e regiões costeiras.
          </p>
          <CtaLink href={WHATSAPP_URL} className="animate-rise mt-10">Fale sobre o Innoboat</CtaLink>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative overflow-hidden bg-white">
            <img src={innoboatAsset.url} alt="Innoboat — catamarã elétrico com painéis solares desenvolvido pela Innomaker" width={2000} height={1333} className="w-full object-contain" />
            <div className="animate-scan absolute inset-x-0 top-0 h-px bg-primary/60" />
          </div>
          <div className="absolute -bottom-5 left-5 bg-graphite px-5 py-4 sm:left-8">
            <p className="eyebrow text-primary">Elétrico · Solar · Remoto</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="bg-background">
      <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-6">
          <Eyebrow index="01" className="text-muted-foreground">Innoboat em operação</Eyebrow>
          <h2 className="mt-8 text-3xl font-bold uppercase leading-[0.98] sm:text-5xl">
            Veja o Innoboat <span className="text-primary">em ação.</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Coleta de dados sobre a qualidade da água, batimetria e varredura, com informações disponibilizadas em tempo real.
          </p>
        </div>
        <div className="flex justify-center lg:col-span-6 lg:justify-end">
          <video
            src={VIDEO_URL}
            poster={innoboatPoster.url}
            controls
            playsInline
            preload="metadata"
            className="aspect-[9/16] w-full max-w-[300px] rounded-sm border border-border bg-graphite object-cover shadow-2xl sm:max-w-[340px]"
          />
        </div>
      </Container>
    </section>
  );
}

function Differentials() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="tech-grid-light pointer-events-none absolute inset-0" />
      <Container className="relative py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <Eyebrow index="02" className="text-muted-foreground lg:col-span-4">Diferenciais</Eyebrow>
          <h2 className="text-3xl font-bold uppercase leading-[1.02] sm:text-5xl lg:col-span-8">
            Menos custo, menos risco.
            <br />
            <span className="text-muted-foreground">Mais dados.</span>
          </h2>
        </div>
        <ol className="mt-16 grid border-t border-foreground sm:grid-cols-2">
          {differentials.map((d) => (
            <li key={d.index} className="border-b border-border py-8 sm:odd:border-r sm:odd:pr-10 sm:even:pl-10">
              <span className="font-mono text-sm text-primary">{d.index}</span>
              <h3 className="mt-3 text-xl font-bold uppercase sm:text-2xl">{d.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{d.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ProductCta() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
      <Container className="relative grid gap-10 border-t border-line-dark py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-7">
          <Eyebrow className="text-on-graphite-muted">Contato</Eyebrow>
          <h2 className="mt-6 text-3xl font-extrabold uppercase leading-[0.98] sm:text-5xl">
            Leve o Innoboat para a <span className="text-primary">sua operação.</span>
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-base leading-relaxed text-on-graphite-muted">
            Conte-nos sobre o seu cenário de monitoramento <strong className="font-medium text-on-graphite">e descubra como o Innoboat pode ajudar.</strong>
          </p>
          <CtaLink href={WHATSAPP_URL} className="mt-8">Fale com a Innomaker</CtaLink>
        </div>
      </Container>
    </section>
  );
}
