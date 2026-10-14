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
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
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
    href: "/servicos#engenharia",
  },
  {
    id: "processos",
    index: "02",
    title: "Processos",
    lead: "Mapeamento e automação de processos para",
    highlight: "tornar operações mais eficientes.",
    href: "/servicos#processos",
  },
  {
    id: "tecnologia",
    index: "03",
    title: "Tecnologia",
    lead: "Desenvolvimento de soluções digitais e sistemas",
    highlight: "sob medida para diferentes necessidades.",
    href: "/servicos#tecnologia",
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
  servicesIntro: "/images/servicos-intro.jpg",
  logoColor: "/images/innomaker-logo-color.png",
  logoWhite: "/images/innomaker-logo-white.png",
  whatsappIcon: "/images/whatsapp.png",
};

export type ServiceItem = { title: string; description: string; href: string };
export type ServiceCategory = {
  id: string;
  index: string;
  title: string;
  summary: string;
  lead: string;
  highlight: string;
  tail?: string;
  items: ServiceItem[];
};

/** Carta de serviços — conteúdo de innomaker.com.br/servicos-2026/. */
export const serviceCatalog: ServiceCategory[] = [
  {
    id: "engenharia",
    index: "01",
    title: "Engenharia",
    summary: "Produtos, sistemas e soluções de engenharia.",
    lead: "Do conceito à implementação, desenvolvemos",
    highlight: "produtos, sistemas e estruturas",
    tail: "que atendem a diferentes necessidades.",
    items: [
      { title: "Desenvolvimento de produtos", description: "Projeto e desenvolvimento de produtos e sistemas de acordo com a demanda do cliente.", href: "/des-de-produtos" },
      { title: "Prototipagem", description: "Desenvolvimento e validação de protótipos para transformar ideias em aplicações funcionais, testando conceitos e aprimorando seu desempenho antes da implementação.", href: "https://innomaker.com.br/prototipagem" },
      { title: "Engenharia reversa", description: "Projeto para produtos já existentes, detalhando seu funcionamento e aprimorando seu desempenho.", href: "https://innomaker.com.br/eng-reversa" },
      { title: "Painéis elétricos", description: "Projeto e desenvolvimento de painéis elétricos para diferentes aplicações e necessidades, desde a definição dos componentes até a montagem e implementação dos sistemas.", href: "https://innomaker.com.br/paineis-eletricos" },
      { title: "Automação industrial e sistemas de controle", description: "Desenvolvimento de soluções para automação, controle e integração de sistemas, buscando tornar operações mais eficientes, precisas e confiáveis.", href: "https://innomaker.com.br/automacao-industrial" },
    ],
  },
  {
    id: "processos",
    index: "02",
    title: "Processos",
    summary: "Mapeamento, estruturação e automação de processos.",
    lead: "Estruturamos e otimizamos processos para aumentar",
    highlight: "eficiência e gerar resultados.",
    items: [
      { title: "Mapeamento de processos", description: "Análise e representação dos processos para visualizar etapas, fluxos e responsabilidades, trazendo mais clareza sobre como a operação funciona.", href: "https://innomaker.com.br/mapeamento-de-processos" },
      { title: "Automação de processos", description: "Automação de atividades e fluxos para reduzir tarefas manuais, integrar etapas e tornar a execução das operações mais ágil e eficiente.", href: "https://innomaker.com.br/automacao-de-processos" },
    ],
  },
  {
    id: "tecnologia",
    index: "03",
    title: "Tecnologia",
    summary: "Sistemas e soluções digitais sob medida.",
    lead: "Criamos",
    highlight: "soluções digitais",
    tail: "sob medida para necessidades específicas do seu negócio.",
    items: [
      { title: "Desenvolvimento de software", description: "Desenvolvimento de sistemas e aplicações personalizados para atender às demandas de cada projeto.", href: "https://innomaker.com.br/des-de-software" },
    ],
  },
];
