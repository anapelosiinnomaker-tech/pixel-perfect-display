import { ArrowUpRight } from "lucide-react";
import { featuredPartners, images, partners, services, WHATSAPP_URL } from "@/content/site";
import { Container, CtaLink, Eyebrow } from "@/components/site/primitives";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative grid grid-cols-1 items-center gap-10 pb-16 pt-28 lg:min-h-[100svh] lg:grid-cols-12 lg:pb-20 lg:pt-32">
        <div className="relative z-10 lg:col-span-6">
          <Eyebrow index="IM/26" className="animate-rise text-on-graphite-muted">
            Engenharia · Processos · Tecnologia
          </Eyebrow>
          <h1 className="animate-rise mt-8 text-[clamp(2.25rem,5.2vw,4.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.025em]" style={{ animationDelay: "120ms" }}>
            Desafios complexos.
            <br />
            <span className="text-primary">Soluções</span> sob medida.
          </h1>
          <div className="animate-rise mt-10 grid gap-8 border-t border-line-dark pt-8 sm:grid-cols-[1fr_auto] sm:items-end" style={{ animationDelay: "260ms" }}>
            <p className="max-w-md text-base leading-relaxed sm:text-lg text-on-graphite-muted">
              Integramos <strong className="font-medium text-on-graphite">engenharia, processos e tecnologia</strong> para desenvolver soluções de acordo com as necessidades de cada projeto.
            </p>
            <CtaLink href="https://innomaker.com.br/servicos-2026/">Conheça nossos serviços</CtaLink>
          </div>
        </div>
        <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[46%]">
          <div className="relative h-[50vh] overflow-hidden sm:h-[60vh] lg:h-full">
            <img src={images.hero} alt="Braço robótico em célula de automação industrial" width={1280} height={1600} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/30 to-transparent" />
            <div className="animate-scan absolute inset-x-0 top-0 h-px bg-primary/60" />
          </div>
          <div className="eyebrow absolute bottom-6 right-6 hidden flex-col items-end gap-1 text-on-graphite-muted lg:flex">
            <span>Inovação aplicada</span>
            <span className="text-primary">● Engenharia avançada</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ServiceAreas() {
  return (
    <section id="servicos" className="relative bg-background">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <Eyebrow index="01" className="text-muted-foreground lg:col-span-4">Áreas de atuação</Eyebrow>
          <h2 className="text-4xl font-bold leading-[1.02] sm:text-5xl lg:col-span-8 lg:text-6xl">
            Três competências.
            <br />
            <span className="text-muted-foreground">Uma visão integrada.</span>
          </h2>
        </div>
        <div className="mt-20 border-t border-foreground">
          {services.map((s) => (
            <a
              key={s.id}
              href={s.href}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-6 border-b border-border py-10 transition-colors md:grid-cols-12 md:gap-8"
            >
              <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary md:col-span-1">{s.index}</span>
              <h3 className="text-3xl font-bold uppercase transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl md:col-span-5">{s.title}</h3>
              <p className="col-span-3 col-start-2 max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-auto">
                {s.lead} <strong className="font-medium text-foreground">{s.highlight}</strong>
              </p>
              <span className="row-start-1 col-start-3 flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground md:col-span-1 md:row-start-auto md:col-start-auto md:justify-self-end">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-12 flex justify-end">
          <CtaLink href={WHATSAPP_URL} variant="outline-light">Fale com um especialista</CtaLink>
        </div>
      </Container>
    </section>
  );
}

export function Integration() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="tech-grid-light pointer-events-none absolute inset-0" />
      <Container className="relative grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="relative lg:col-span-7">
          <img src={images.integration} alt="Peça mecânica usinada em alumínio ao lado do seu modelo 3D em CAD" width={1440} height={1024} loading="lazy" className="aspect-[4/3] w-full object-cover grayscale-[30%]" />
          <div className="absolute -bottom-6 left-6 bg-graphite px-6 py-5 text-on-graphite sm:left-10">
            <p className="eyebrow text-primary">Engenharia + Processos + Tecnologia</p>
          </div>
        </div>
        <div className="flex flex-col justify-center lg:col-span-5 lg:pl-6">
          <Eyebrow index="02" className="text-muted-foreground">Soluções personalizadas</Eyebrow>
          <h2 className="mt-8 text-4xl font-bold uppercase leading-[0.98] sm:text-5xl">
            Quando o desafio não cabe em uma <span className="text-primary">fórmula pronta.</span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Unimos diferentes competências para transformar <strong className="font-medium text-foreground">necessidades específicas</strong> em <strong className="font-medium text-foreground">resultados concretos.</strong>
          </p>
          <div className="mt-10">
            <CtaLink href={WHATSAPP_URL}>Receba um diagnóstico</CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Partners() {
  return (
    <section className="bg-background">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col items-center text-center">
          <Eyebrow index="03" className="text-muted-foreground">Parceiros</Eyebrow>
          <h2 className="mt-6 text-3xl font-bold uppercase leading-none sm:text-5xl">Parceiros que confiam</h2>
        </div>
        <ul className="mt-14 grid grid-cols-1 border-y border-border sm:grid-cols-3">
          {featuredPartners.map((p) => (
            <li key={p.name} className="flex h-32 items-center justify-center border-border px-8 not-last:border-b sm:h-40 sm:not-last:border-b-0 sm:not-last:border-r">
              <img src={p.logoUrl} alt={p.name} loading="lazy" className="max-h-16 max-w-[220px] w-auto object-contain sm:max-h-20" />
            </li>
          ))}
        </ul>
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
          {partners.map((p) => (
            <li key={p.name} className="flex h-14 items-center justify-center">
              <img src={p.logoUrl} alt={p.name} loading="lazy" className="max-h-12 max-w-[130px] w-auto object-contain" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-graphite text-on-graphite">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
      <Container className="relative grid gap-12 py-24 lg:grid-cols-12 lg:items-end lg:py-32">
        <div className="lg:col-span-8">
          <Eyebrow index="04" className="text-on-graphite-muted">Contato</Eyebrow>
          <h2 className="mt-8 text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92]">
            Pronto para dar o <span className="text-primary">próximo passo?</span>
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="text-lg text-on-graphite-muted">
            Conte com quem transforma <strong className="font-medium text-on-graphite">ideias em realidade.</strong>
          </p>
          <CtaLink href={WHATSAPP_URL} className="mt-8">Fale com a Innomaker pelo WhatsApp</CtaLink>
        </div>
      </Container>
    </section>
  );
}
