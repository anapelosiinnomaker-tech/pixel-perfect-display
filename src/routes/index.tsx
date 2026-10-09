import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactCta, Hero, Integration, Partners, ServiceAreas } from "@/components/home/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Innomaker — Engenharia, Processos e Tecnologia" },
      { name: "description", content: "Integramos engenharia, processos e tecnologia para desenvolver soluções sob medida para desafios complexos." },
      { property: "og:title", content: "Innomaker — Desafios complexos, soluções sob medida" },
      { property: "og:description", content: "Engenharia, processos e tecnologia integrados para soluções personalizadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ServiceAreas />
        <Integration />
        <Partners />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
