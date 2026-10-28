import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, CtaLink, Eyebrow } from "@/components/site/primitives";
import { ProductReveal } from "@/components/products/ProductReveal";
import { WHATSAPP_URL } from "@/content/site";
import innoboatPoster from "@/assets/innoboat-video-poster.jpg.asset.json";
import { cn } from "@/lib/utils";

const VIDEO_URL = "https://res.cloudinary.com/i1pdbo6b/video/upload/V%C3%ADdeo_Innoboat_Final.mp4";
const PHOTO = "/images/innoboat/innoboat-praia.jpg";
const SCHEME = "/images/innoboat/innoboat-visao-geral.png";

export const Route = createFileRoute("/innoboat")({
  head: () => ({
    meta: [
      { title: "Conheça o Innoboat — Innomaker | Monitoramento inteligente da água" },
      { name: "description", content: "Innoboat: catamarã 100% elétrico, solar e controlado remotamente que coleta dados de qualidade da água, batimetria e varredura em tempo real." },
      { property: "og:title", content: "Innoboat — A água, lida em tempo real" },
      { property: "og:description", content: "Catamarã elétrico e solar da Innomaker para monitoramento ambiental de rios, lagos, baías e regiões costeiras." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InnoboatPage,
});

function InnoboatPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <Diagram />
        <Monitoring />
        <VideoSection />
        <Differentials />
        <ProductCta />
      </main>
      <SiteFooter />
    </>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative grid gap-12 pb-20 pt-32 lg:grid-cols-12 lg:items-end lg:pb-24 lg:pt-40">
        <div className="lg:col-span-5">
          <Eyebrow className="text-on-graphite-muted">Conheça o Innoboat</Eyebrow>
          <h1 className="animate-rise mt-8 text-[clamp(2.25rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.95]" style={{ animationDelay: "120ms" }}>
            A água, lida <span className="text-primary">em tempo real.</span>
          </h1>
          <p className="animate-rise mt-8 max-w-md text-base leading-relaxed text-on-graphite-muted" style={{ animationDelay: "240ms" }}>
            Catamarã <strong className="font-medium text-on-graphite">100% elétrico, solar e remoto</strong> para monitoramento ambiental de rios, lagos, baías e regiões costeiras.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: "360ms" }}>
            <CtaLink href={WHATSAPP_URL}>Fale sobre o Innoboat</CtaLink>
            <CtaLink href="#esquema" variant="outline-dark">Explore o barco</CtaLink>
          </div>
        </div>
        <div className="relative lg:col-span-7">
          <div className="relative overflow-hidden rounded-sm">
            <img src={PHOTO} alt="Innoboat na praia, com painéis solares e propulsor elétrico" width={1448} height={1086} className="aspect-[4/3] w-full object-cover" />
            <div className="animate-scan absolute inset-x-0 top-0 h-px bg-primary/70" />
          </div>
          <div className="absolute -bottom-6 left-4 grid grid-cols-3 divide-x divide-line-dark border border-line-dark bg-graphite sm:left-8">
            {["Elétrico", "Solar", "Remoto"].map((t) => (
              <span key={t} className="eyebrow px-4 py-3 text-on-graphite sm:px-6">{t}</span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Como funciona ---------- */
const steps = [
  { n: "01", t: "Energia", d: "Painéis solares carregam as baterias." },
  { n: "02", t: "Navegação", d: "Propulsão elétrica, controlada a distância." },
  { n: "03", t: "Coleta", d: "Sondas acopladas medem a água e o fundo." },
  { n: "04", t: "Dados", d: "Informações chegam em tempo real ao dashboard." },
];

function HowItWorks() {
  return (
    <section className="bg-background">
      <Container className="py-20 lg:py-28">
        <ProductReveal className="grid gap-8 lg:grid-cols-12">
          <Eyebrow index="01" className="text-muted-foreground lg:col-span-4">Como funciona</Eyebrow>
          <h2 className="text-3xl font-bold uppercase leading-[1] sm:text-5xl lg:col-span-8">
            Do sol ao dado, <span className="text-primary">sem combustível.</span>
          </h2>
        </ProductReveal>
        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-border lg:block" />
          {steps.map((s, i) => (
            <ProductReveal key={s.n} className="relative lg:pr-8">
              <span className={cn("relative block h-[15px] w-[15px] rounded-full border-2 border-primary bg-background", i === steps.length - 1 && "bg-primary")} />
              <span className="mt-6 block font-mono text-sm text-primary">{s.n}</span>
              <h3 className="mt-2 text-xl font-bold uppercase">{s.t}</h3>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </ProductReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------- Esquema interativo ---------- */
type Hotspot = { id: string; x: number; y: number; title: string; text: string };
const hotspots: Hotspot[] = [
  { id: "solar", x: 50, y: 52, title: "Painéis solares", text: "Cobrem o convés e carregam as baterias que alimentam todo o sistema." },
  { id: "portico", x: 72, y: 17, title: "Pórtico de equipamentos", text: "Estrutura elevada que suporta os equipamentos de comunicação usados na operação remota." },
  { id: "propulsor", x: 95, y: 63, title: "Propulsão elétrica", text: "Motor elétrico submerso: navegação silenciosa, sem combustíveis fósseis." },
  { id: "cascos", x: 18, y: 58, title: "Dois cascos", text: "Estrutura de catamarã que garante estabilidade sobre a água." },
  { id: "modulos", x: 67, y: 59, title: "Estrutura modular", text: "Permite acoplar diferentes sondas conforme a aplicação: qualidade da água, batimetria ou varredura." },
];

function Diagram() {
  const [active, setActive] = useState(hotspots[0].id);
  const current = hotspots.find((h) => h.id === active)!;
  return (
    <section id="esquema" className="relative scroll-mt-20 overflow-hidden bg-secondary">
      <div className="tech-grid-light pointer-events-none absolute inset-0" />
      <Container className="relative grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-4">
          <Eyebrow index="02" className="text-muted-foreground">Por dentro do barco</Eyebrow>
          <h2 className="mt-8 text-3xl font-bold uppercase leading-[1] sm:text-4xl">
            Toque nos pontos <span className="text-primary">e explore.</span>
          </h2>
          <ul className="mt-10 border-t border-foreground">
            {hotspots.map((h, i) => (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => setActive(h.id)}
                  onMouseEnter={() => setActive(h.id)}
                  aria-pressed={active === h.id}
                  className={cn(
                    "flex w-full items-baseline gap-4 border-b border-border py-4 text-left transition-colors",
                    active === h.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className={cn("font-mono text-xs", active === h.id && "text-primary")}>0{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-display text-base font-bold uppercase">{h.title}</span>
                    {active === h.id && <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{h.text}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative lg:col-span-8">
          <div className="relative">
            <img src={SCHEME} alt="Esquema do Innoboat com painéis solares, pórtico, cascos e propulsor" width={2000} height={1414} className="w-full" />
            {hotspots.map((h, i) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setActive(h.id)}
                onMouseEnter={() => setActive(h.id)}
                aria-label={h.title}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span className={cn("absolute inset-0 rounded-full bg-primary/40", active === h.id ? "animate-ping" : "opacity-0")} />
                <span className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-[11px] font-medium transition-all",
                  active === h.id ? "scale-110 border-primary bg-primary text-primary-foreground" : "border-graphite bg-card text-foreground group-hover:border-primary",
                )}>{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-4 border-l-2 border-primary bg-card px-5 py-4 lg:hidden">
            <p className="text-sm"><strong className="font-display uppercase">{current.title}.</strong> <span className="text-muted-foreground">{current.text}</span></p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- O que monitora ---------- */
const measures = [
  { t: "Qualidade da água", d: "Parâmetros coletados por sondas acopladas ao barco." },
  { t: "Batimetria", d: "Leitura da profundidade e do relevo do fundo." },
  { t: "Varredura", d: "Mapeamento sistemático da área navegada." },
];
const places = ["Rios", "Lagos", "Baías", "Regiões costeiras"];

function Monitoring() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative py-20 lg:py-28">
        <ProductReveal className="grid gap-8 lg:grid-cols-12">
          <Eyebrow index="03" className="text-on-graphite-muted lg:col-span-4">O que monitora</Eyebrow>
          <h2 className="text-3xl font-bold uppercase leading-[1] sm:text-5xl lg:col-span-8">
            Três leituras. <span className="text-primary">Um só barco.</span>
          </h2>
        </ProductReveal>
        <div className="mt-16 grid border-t border-line-dark md:grid-cols-3">
          {measures.map((m, i) => (
            <ProductReveal key={m.t} className="group border-b border-line-dark py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <span className="font-mono text-6xl font-light text-on-graphite/15 transition-colors duration-500 group-hover:text-primary">0{i + 1}</span>
              <h3 className="mt-6 text-2xl font-bold uppercase">{m.t}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-graphite-muted">{m.d}</p>
            </ProductReveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="eyebrow text-on-graphite-muted">Onde opera</span>
          {places.map((p) => (
            <span key={p} className="font-display text-lg font-semibold uppercase text-on-graphite">{p}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Vídeo ---------- */
function VideoSection() {
  return (
    <section className="bg-background">
      <Container className="grid gap-14 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:order-2 lg:col-span-6 lg:col-start-7">
          <Eyebrow index="04" className="text-muted-foreground">Em operação</Eyebrow>
          <h2 className="mt-8 text-3xl font-bold uppercase leading-[1] sm:text-5xl">
            Veja o Innoboat <span className="text-primary">na água.</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Silencioso, sem emissões e sem equipe embarcada: o barco navega enquanto os dados chegam ao dashboard.
          </p>
        </div>
        <div className="relative flex justify-center lg:order-1 lg:col-span-5">
          <div className="absolute inset-y-8 left-1/2 w-[85%] -translate-x-1/2 bg-secondary sm:w-[70%]" />
          <div className="tech-grid-light absolute inset-y-8 left-1/2 w-[85%] -translate-x-1/2 sm:w-[70%]" />
          <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
            <span className="absolute -left-3 -top-3 h-10 w-10 border-l-2 border-t-2 border-primary" />
            <span className="absolute -bottom-3 -right-3 h-10 w-10 border-b-2 border-r-2 border-primary" />
            <video
              src={VIDEO_URL}
              poster={innoboatPoster.url}
              controls
              playsInline
              preload="metadata"
              className="relative aspect-[9/16] w-full rounded-sm bg-graphite object-contain shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Diferenciais ---------- */
const differentials = [
  { k: "Energia solar", v: "Painéis e baterias: autonomia sem combustíveis fósseis." },
  { k: "Propulsão elétrica", v: "Navegação silenciosa e sem emissões." },
  { k: "Controle remoto", v: "Operado à distância: menos risco para as equipes e menor custo operacional." },
  { k: "Estrutura modular", v: "Sondas acopláveis conforme a aplicação." },
  { k: "Dados em tempo real", v: "Resultados disponíveis em um dashboard durante a operação." },
];

function Differentials() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="tech-grid-light pointer-events-none absolute inset-0" />
      <Container className="relative grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <Eyebrow index="05" className="text-muted-foreground">Diferenciais</Eyebrow>
          <h2 className="mt-8 text-3xl font-bold uppercase leading-[1.02] sm:text-5xl">
            Menos custo, menos risco. <span className="text-muted-foreground">Mais dados.</span>
          </h2>
        </div>
        <ul className="border-t border-foreground lg:col-span-8">
          {differentials.map((d, i) => (
            <li key={d.k} className="border-b border-border">
              <button
                type="button"
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                aria-expanded={open === i}
                className="grid w-full grid-cols-[3rem_1fr] items-baseline gap-2 py-6 text-left sm:grid-cols-[4rem_1fr_1fr] sm:gap-6"
              >
                <span className={cn("font-mono text-sm transition-colors", open === i ? "text-primary" : "text-muted-foreground")}>0{i + 1}</span>
                <span className={cn("font-display text-xl font-bold uppercase transition-colors sm:text-3xl", open === i ? "text-foreground" : "text-foreground/45")}>{d.k}</span>
                <span className={cn("col-start-2 text-sm leading-relaxed text-muted-foreground transition-opacity duration-300 sm:col-start-3", open === i ? "opacity-100" : "hidden opacity-0 sm:block")}>{d.v}</span>
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- CTA ---------- */
function ProductCta() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
      <Container className="relative grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
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
