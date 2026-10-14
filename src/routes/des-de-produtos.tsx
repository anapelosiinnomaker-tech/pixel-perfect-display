import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, CtaLink } from "@/components/site/primitives";
import { ProductReveal } from "@/components/products/ProductReveal";
import { productDevelopment as content } from "@/content/product-development";
import { WHATSAPP_URL } from "@/content/site";

export const Route = createFileRoute("/des-de-produtos")({
  head: () => ({ meta: [
    { title: "Desenvolvimento de Produtos — Innomaker" },
    { name: "description", content: content.description },
    { property: "og:title", content: "Desenvolvimento de Produtos — Innomaker" },
    { property: "og:description", content: content.introduction },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ProductDevelopmentPage,
});

const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

function ProductDevelopmentPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero />
        <ProductApproach />
        <ProjectStages />
        <ProductContact />
      </main>
      <SiteFooter />
    </>
  );
}

function ProductHero() {
  return (
    <section aria-labelledby="product-title" className="relative overflow-hidden bg-graphite text-on-graphite">
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <ProductReveal className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <h1 id="product-title" className="text-[clamp(1.5rem,4.2vw,3.5rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.025em]">
              Desenvolvimento <span className="mt-1 block">de <span className="text-primary">produtos</span></span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-on-graphite">{content.introduction}</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-on-graphite-muted sm:text-base">{content.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CtaLink href={WHATSAPP_URL} className={`w-full justify-between sm:w-auto ${focusStyle} motion-reduce:[&_svg]:transform-none`}>Fale com um especialista</CtaLink>
              <a href="#etapas" className={`inline-flex min-h-11 items-center gap-3 border-b border-primary text-sm font-medium transition-colors hover:text-primary ${focusStyle}`}>Conheça as etapas <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="min-w-0 lg:col-span-5">
            <img src={content.image} alt="Composição ilustrativa de componentes mecânicos em alumínio, desenho técnico e paquímetro sobre bancada grafite" width={1536} height={1024} fetchPriority="high" className="aspect-[8/5] w-full object-cover sm:aspect-[16/9] lg:aspect-square" />
            <figcaption className="mt-4 border-l-2 border-primary pl-3 text-xs leading-relaxed text-on-graphite-muted">Projeto, desenvolvimento e validação.</figcaption>
          </figure>
        </ProductReveal>
      </Container>
    </section>
  );
}

function ProductApproach() {
  return (
    <section aria-labelledby="product-approach-title" className="bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <ProductReveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="product-approach-title" className="max-w-md text-3xl font-bold uppercase leading-[1.08] sm:text-4xl">Produtos pensados para <span className="text-primary">ganhar forma</span></h2>
          </div>
          <dl className="border-t border-foreground lg:col-span-7">
            {content.approaches.map(item => (
              <div key={item.title} className="border-b border-border py-7 first:pt-7 sm:py-8">
                <dt className="text-lg font-semibold uppercase leading-snug" style={{ fontFamily: "var(--font-display)" }}>{item.title}</dt>
                <dd className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{item.description}</dd>
              </div>
            ))}
          </dl>
        </ProductReveal>
      </Container>
    </section>
  );
}

function ProjectStages() {
  return (
    <section id="etapas" aria-labelledby="product-stages-title" className="scroll-mt-20 bg-secondary">
      <Container className="py-16 sm:py-20 lg:py-24">
        <ProductReveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-foreground pb-8 lg:mb-12">
            <h2 id="product-stages-title" className="max-w-lg text-3xl font-bold uppercase leading-[1.08] sm:text-4xl">Da concepção à<br />consolidação do projeto.</h2>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center border-b border-primary text-sm font-medium transition-colors hover:text-primary ${focusStyle}`}>Fale com um especialista <span aria-hidden="true" className="ml-3">↗</span></a>
          </div>
          <ol className="grid gap-x-10 md:grid-cols-2 lg:gap-x-16">
            {content.stages.map((stage, index) => (
              <li key={stage.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-border py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-8">
                <span aria-hidden="true" className="pt-0.5 font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}.</span>
                <div>
                  <h3 className="text-lg font-semibold uppercase leading-snug sm:text-xl">{stage.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </ProductReveal>
      </Container>
    </section>
  );
}

function ProductContact() {
  return (
    <section aria-labelledby="product-contact-title" className="relative overflow-hidden border-b border-primary/60 bg-graphite text-on-graphite">
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <ProductReveal className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-8">
            <h2 id="product-contact-title" className="max-w-2xl text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[1.04]">Sua ideia pode virar <span className="text-primary">um produto.</span></h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-on-graphite-muted">{content.closingDescription}</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <CtaLink href={WHATSAPP_URL} className={`w-full justify-between gap-6 px-7 py-5 text-base font-semibold hover:bg-primary/90 sm:w-auto ${focusStyle} motion-reduce:[&_svg]:transform-none`}>Fale com a Innomaker</CtaLink>
          </div>
        </ProductReveal>
      </Container>
    </section>
  );
}
