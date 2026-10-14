import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, CtaLink } from "@/components/site/primitives";
import { ProductReveal } from "@/components/products/ProductReveal";
import { WHATSAPP_URL } from "@/content/site";
import type { ServiceLanding } from "@/content/service-landings";

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
const headingStyle = "text-3xl font-bold uppercase leading-[1.08] sm:text-4xl";

export function serviceLandingHead(service: ServiceLanding) {
  return {
    meta: [
      { title: `${service.title} — Innomaker` },
      { name: "description", content: service.description },
      { property: "og:title", content: `${service.title} — Innomaker` },
      { property: "og:description", content: service.introduction },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}

/** Shares the established product-page structure; only service data and layout vary. */
export function ServiceLandingPage({ service }: { service: ServiceLanding }) {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceHero service={service} />
        <ServiceApproach service={service} />
        <ServiceStages service={service} />
        <ServiceContact service={service} />
      </main>
      <SiteFooter />
    </>
  );
}

function ServiceHero({ service }: { service: ServiceLanding }) {
  const balanced = service.heroLayout === "balanced";
  const compact = service.slug === "des-de-software";
  return (
    <section
      aria-labelledby="service-title"
      className="relative overflow-hidden bg-graphite text-on-graphite"
    >
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <Container className="relative pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <ProductReveal className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className={`min-w-0 ${balanced ? "lg:col-span-6" : "lg:col-span-7"}`}>
            <h1
              id="service-title"
              className={`${compact ? "text-[clamp(1.5rem,4.2vw,3.5rem)]" : "text-[clamp(2rem,4.2vw,3.5rem)]"} font-extrabold uppercase leading-[1.04] tracking-[-0.025em]`}
            >
              {service.heading[0] && <>{service.heading[0]} </>}
              <span className={`${service.heading[0] ? "mt-1 block " : ""}text-primary`}>
                {service.heading[1]}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-on-graphite">
              {service.introduction}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-on-graphite-muted sm:text-base">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CtaLink
                href={WHATSAPP_URL}
                className={`w-full justify-between sm:w-auto ${focusStyle} motion-reduce:[&_svg]:transform-none`}
              >
                Fale com um especialista
              </CtaLink>
              <a
                href="#etapas"
                className={`inline-flex min-h-11 items-center gap-3 border-b border-primary text-sm font-medium transition-colors hover:text-primary ${focusStyle}`}
              >
                Conheça as etapas <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <figure className={`min-w-0 ${balanced ? "lg:col-span-6" : "lg:col-span-5"}`}>
            <img
              src={service.image}
              alt={service.imageAlt}
              width={1536}
              height={1024}
              fetchPriority="high"
              className={`aspect-[8/5] w-full object-cover sm:aspect-[16/9] ${balanced ? "lg:aspect-[5/4]" : "lg:aspect-square"}`}
            />
            <figcaption className="mt-4 border-l-2 border-primary pl-3 text-xs leading-relaxed text-on-graphite-muted">
              {service.approachesTitle}
            </figcaption>
          </figure>
        </ProductReveal>
      </Container>
    </section>
  );
}

function ServiceApproach({ service }: { service: ServiceLanding }) {
  const editorial = service.approachesLayout === "editorial";
  const columns = service.approachesLayout === "columns";
  return (
    <section aria-labelledby="service-approach-title" className="bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <ProductReveal className={editorial ? "grid gap-10 lg:grid-cols-12 lg:gap-16" : ""}>
          <div className={editorial ? "lg:col-span-5" : "mb-10 lg:mb-12"}>
            <h2
              id="service-approach-title"
              className={`${headingStyle} ${editorial ? "max-w-md" : "max-w-2xl"}`}
            >
              {service.approachesTitle}
            </h2>
          </div>
          <dl
            className={
              columns
                ? "grid border-t border-foreground md:grid-cols-3"
                : `border-t border-foreground ${editorial ? "lg:col-span-7" : ""}`
            }
          >
            {service.approaches.map((item) => (
              <div
                key={item.title}
                className={
                  columns
                    ? "border-b border-border py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                    : `border-b border-border py-7 sm:py-8 ${editorial ? "" : "grid gap-3 md:grid-cols-12 md:gap-10"}`
                }
              >
                <dt
                  className={`text-lg font-semibold uppercase leading-snug ${!editorial && !columns ? "md:col-span-5" : ""}`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </dt>
                <dd
                  className={`max-w-xl text-base leading-relaxed text-muted-foreground ${editorial || columns ? "mt-3" : "md:col-span-7"}`}
                >
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </ProductReveal>
      </Container>
    </section>
  );
}

function ServiceStages({ service }: { service: ServiceLanding }) {
  const grid = service.stagesLayout === "grid";
  const split = service.stagesLayout === "split";
  return (
    <section
      id="etapas"
      aria-labelledby="service-stages-title"
      className="scroll-mt-20 bg-secondary"
    >
      <Container className="py-16 sm:py-20 lg:py-24">
        <ProductReveal className={split ? "grid gap-10 lg:grid-cols-12 lg:gap-16" : ""}>
          <div
            className={
              split
                ? "lg:col-span-5"
                : "mb-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-foreground pb-8 lg:mb-4"
            }
          >
            <h2 id="service-stages-title" className={`${headingStyle} max-w-lg`}>
              {service.stagesTitle}
            </h2>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center border-b border-primary text-sm font-medium transition-colors hover:text-primary ${split ? "mt-6" : ""} ${focusStyle}`}
            >
              Fale com um especialista{" "}
              <span aria-hidden="true" className="ml-3">
                ↗
              </span>
            </a>
          </div>
          <ol
            className={
              grid
                ? "grid gap-x-10 md:grid-cols-2 lg:gap-x-16"
                : split
                  ? "border-t border-foreground lg:col-span-7"
                  : ""
            }
          >
            {service.stages.map((stage, index) => (
              <li
                key={stage.title}
                className={`grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-border py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-8 ${!grid && !split ? "lg:grid-cols-12 lg:gap-8" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className={`pt-0.5 font-mono text-sm text-primary ${!grid && !split ? "lg:col-span-1" : ""}`}
                >
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <div
                  className={
                    !grid && !split ? "lg:col-span-11 lg:grid lg:grid-cols-11 lg:gap-8" : undefined
                  }
                >
                  <h3
                    className={`text-lg font-semibold uppercase leading-snug sm:text-xl ${!grid && !split ? "lg:col-span-4" : ""}`}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base ${!grid && !split ? "lg:col-span-7 lg:mt-0" : ""}`}
                  >
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </ProductReveal>
      </Container>
    </section>
  );
}

function ServiceContact({ service }: { service: ServiceLanding }) {
  const prefix = service.closingTitle.slice(0, -service.closingAccent.length).trimEnd();
  return (
    <section
      aria-labelledby="service-contact-title"
      className="relative overflow-hidden border-b border-primary/60 bg-graphite text-on-graphite"
    >
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <ProductReveal className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <h2
              id="service-contact-title"
              className="max-w-2xl text-[clamp(1.75rem,4vw,3.5rem)] font-extrabold uppercase leading-[1.04]"
            >
              {prefix} <span className="text-primary">{service.closingAccent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-on-graphite-muted">
              {service.closingDescription}
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <CtaLink
              href={WHATSAPP_URL}
              className={`w-full justify-between gap-6 px-7 py-5 text-base font-semibold hover:bg-primary/90 sm:w-auto ${focusStyle} motion-reduce:[&_svg]:transform-none`}
            >
              Fale com a Innomaker
            </CtaLink>
          </div>
        </ProductReveal>
      </Container>
    </section>
  );
}
