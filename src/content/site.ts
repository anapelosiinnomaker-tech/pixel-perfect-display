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

const p = (name: string, file: string): Partner => ({ name, logoUrl: `/images/parceiros/${file}.png` });

/** Destaque (ordem de prioridade): Estaleiro Mauá, NVIDIA, Shell. */
export const featuredPartners: Partner[] = [
  p("Estaleiro Mauá", "estaleiro-maua"),
  p("NVIDIA Inception Program", "nvidia"),
  p("Shell StartUp Engine", "shell"),
];

export const partners: Partner[] = [
  p("UFF — Universidade Federal Fluminense", "uff"),
  p("Instituto de Computação UFF", "ic-uff"),
  p("GSCAR COPPE/UFRJ", "gscar"),
  p("Laboratório MídiaCom", "midiacom"),
  p("NIT EE", "nit-ee"),
  p("TEE", "tee"),
  p("Cluster Tecnológico Naval RJ", "cluster-naval"),
  p("SEBRAE", "sebrae"),
  p("Prefeitura de Niterói", "niteroi"),
  p("Prefeitura de Maricá", "marica"),
  p("CEDAE", "cedae"),
  p("CESS", "cess"),
  p("dotBot", "dotbot"),
  p("friends lab", "friends-lab"),
];

export const images = {
  hero: "/images/hero.jpg",
  integration: "/images/integracao-engenharia.jpg",
  logoColor: "/images/innomaker-logo-color.png",
  logoWhite: "/images/innomaker-logo-white.png",
  whatsappIcon: "/images/whatsapp.png",
};
