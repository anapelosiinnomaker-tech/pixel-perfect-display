/**
 * Site content. Shaped to be replaced by a future WordPress (REST/GraphQL) fetch:
 * keep components reading from these typed objects only.
 */
export const WHATSAPP_URL =
  "https://wa.me/5521966396480?text=Ol%C3%A1%2C%20gostaria%20de%20conhecer%20melhor%20os%20servi%C3%A7os%20da%20Innomaker%20e%20conversar%20sobre%20um%20projeto.";

export type NavItem = { label: string; href: string };
export type ServiceArea = { id: string; index: string; title: string; lead: string; highlight: string; href: string };
export type Partner = { name: string; logoUrl?: string; href?: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "https://innomaker.com.br/sobre-2026/" },
  { label: "Serviços", href: "https://innomaker.com.br/servicos-2026/" },
  { label: "Contato", href: "https://innomaker.com.br/contato-2026/" },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/innomaker-brazil" },
  { label: "Instagram", href: "https://www.instagram.com/innomakerbrasil/" },
];

export const services: ServiceArea[] = [
  {
    id: "engenharia",
    index: "01",
    title: "Engenharia",
    lead: "Soluções de engenharia para",
    highlight: "transformar necessidades em produtos e sistemas.",
    href: "https://innomaker.com.br/servicos-2026/#engenharia",
  },
  {
    id: "processos",
    index: "02",
    title: "Processos",
    lead: "Mapeamento e automação de processos para",
    highlight: "tornar operações mais eficientes.",
    href: "https://innomaker.com.br/servicos-2026/#processos",
  },
  {
    id: "tecnologia",
    index: "03",
    title: "Tecnologia",
    lead: "Desenvolvimento de soluções digitais e sistemas",
    highlight: "sob medida para diferentes necessidades.",
    href: "https://innomaker.com.br/servicos-2026/#tecnologia",
  },
];

/** Fill with real partners (from CMS). Empty slots render as neutral placeholders. */
export const partners: Partner[] = [];
