/** Conteúdo recuperado das sete URLs publicadas pela Innomaker em 14/10/2026.
 * Revisão editorial solicitada pelo usuário corrige associações e textos incoerentes.
 * As imagens são ilustrações geradas por IA, não instalações ou cases identificados.
 * As correções mantêm o escopo descrito nas fontes, sem novas capacidades ou especificações.
 */
export type ServiceLanding = {
  slug: string;
  title: string;
  heading: [string, string];
  closingAccent: string;
  approachesLayout: "columns" | "editorial" | "wide";
  stagesLayout: "grid" | "timeline" | "split";
  stagesTitle: string;
  imageAlt: string;
  heroLayout: "standard" | "balanced";
  source: string;
  introduction: string;
  description: string;
  approachesTitle: string;
  approaches: { title: string; description: string }[];
  stages: { title: string; description: string }[];
  closingTitle: string;
  closingDescription: string;
  image: string;
};

export const serviceLandings = [
  {
    slug: "prototipagem",
    title: "Prototipagem",
    heading: ["", "Prototipagem"],
    closingAccent: "coloque sua ideia à prova",
    approachesLayout: "columns",
    stagesLayout: "grid",
    stagesTitle: "Do conceito à validação",
    imageAlt:
      "Composição ilustrativa de protótipos de um dispositivo, peças de encaixe e instrumentos de medição sobre uma bancada grafite",
    heroLayout: "balanced",
    source: "https://innomaker.com.br/prototipagem/",
    introduction:
      "Tire sua ideia do campo das hipóteses e coloque seu funcionamento à prova antes de investir nas próximas etapas.",
    description:
      "Desenvolvemos protótipos que permitem colocar uma ideia em prática, avaliar seu funcionamento e gerar aprendizados para os próximos passos.",
    approachesTitle: "Do conceito ao protótipo funcional",
    approaches: [
      {
        title: "Prova de conceito",
        description:
          "Materialização de uma ideia para avaliar sua viabilidade antes de avançar no desenvolvimento.",
      },
      {
        title: "Simulação de funcionamento",
        description:
          "Representação prática das características esperadas para observar seu comportamento em uso.",
      },
      {
        title: "Limitações e ajustes",
        description:
          "Identificação de limitações e possíveis ajustes, apoiando decisões nas próximas etapas.",
      },
    ],
    stages: [
      {
        title: "Conceito",
        description: "Compreensão da ideia e do que precisa ser demonstrado ou testado.",
      },
      {
        title: "Desenvolvimento",
        description:
          "Construção do protótipo a partir das características definidas para o projeto.",
      },
      {
        title: "Testes",
        description: "Avaliação do funcionamento do protótipo em relação ao que foi proposto.",
      },
      {
        title: "Validação",
        description: "Análise dos resultados e dos próximos passos para evolução do projeto.",
      },
    ],
    closingTitle: "Antes de avançar coloque sua ideia à prova",
    closingDescription:
      "Desenvolva um protótipo, teste seu conceito e descubra os próximos passos para sua ideia.",
    image: "/images/services/prototipagem.jpg",
  },
  {
    slug: "eng-reversa",
    title: "Engenharia reversa",
    heading: ["Engenharia", "reversa"],
    closingAccent: "aprimoramento.",
    approachesLayout: "editorial",
    stagesLayout: "timeline",
    stagesTitle: "Da análise ao aprimoramento",
    imageAlt:
      "Composição ilustrativa de um componente mecânico desmontado, micrômetro, paquímetro e desenho técnico",
    heroLayout: "standard",
    source: "https://innomaker.com.br/eng-reversa/",
    introduction:
      "Do produto existente ao entendimento técnico, analisamos produtos existentes para compreender sua estrutura, funcionamento e desempenho.",
    description:
      "A partir dessa análise, detalhamos informações técnicas que permitem documentar o produto e identificar oportunidades de aprimoramento.",
    approachesTitle: "Do produto existente ao aprimoramento",
    approaches: [
      {
        title: "Análise do produto",
        description:
          "Investigação da estrutura e componentes do produto para compreender seu funcionamento.",
      },
      {
        title: "Reconstrução do produto",
        description:
          "Levantamento e representação das características técnicas e detalhamento do produto.",
      },
      {
        title: "Documentação técnica",
        description:
          "Organização das informações levantadas para criar uma documentação técnica detalhada do produto.",
      },
    ],
    stages: [
      {
        title: "Análise",
        description: "Levantamento dos componentes e funcionamento do produto.",
      },
      {
        title: "Mapeamento",
        description:
          "Organização das informações e relações entre os elementos que compõem o produto.",
      },
      {
        title: "Reconstrução",
        description:
          "Desenvolvimento da representação técnica a partir das informações levantadas.",
      },
      {
        title: "Aprimoramento",
        description:
          "Avaliação dos resultados e identificação de possibilidades de melhoria no produto.",
      },
    ],
    closingTitle: "Transforme informação em aprimoramento.",
    closingDescription:
      "Dê novos caminhos ao seu produto. Analise sua estrutura e funcionamento para identificar oportunidades de evolução e aprimoramento.",
    image: "/images/services/eng-reversa.jpg",
  },
  {
    slug: "paineis-eletricos",
    title: "Painéis elétricos",
    heading: ["Painéis", "elétricos"],
    closingAccent: "mais resultados.",
    approachesLayout: "columns",
    stagesLayout: "grid",
    stagesTitle: "Etapas do projeto",
    imageAlt:
      "Composição ilustrativa de um painel elétrico aberto, com componentes e cabeamento organizados",
    heroLayout: "balanced",
    source: "https://innomaker.com.br/paineis-eletricos/",
    introduction:
      "Aplicando conhecimento de Engenharia Elétrica, desenvolvemos projetos de painéis elétricos para diferentes aplicações, do planejamento à montagem.",
    description:
      "Da definição dos componentes à instalação dos painéis, cada projeto é estruturado e executado para garantir clareza, segurança e eficiência.",
    approachesTitle: "Do projeto à execução",
    approaches: [
      {
        title: "Projeto elétrico",
        description:
          "Desenvolvimento do projeto do painel considerando os requisitos e características definidos para a aplicação.",
      },
      {
        title: "Montagem e instalação",
        description:
          "Montagem e instalação do painel elétrico a partir do projeto e dos componentes definidos para a aplicação.",
      },
      {
        title: "Integração de sistemas",
        description:
          "Integração dos componentes do painel, considerando as características e os requisitos definidos no projeto.",
      },
    ],
    stages: [
      {
        title: "Planejamento",
        description:
          "Levantamento dos requisitos e das características da aplicação para orientar o projeto do painel.",
      },
      {
        title: "Projeto elétrico",
        description:
          "Definição dos componentes e das informações técnicas que orientam a montagem do painel.",
      },
      {
        title: "Montagem",
        description:
          "Montagem dos componentes elétricos do painel de acordo com o projeto definido.",
      },
      {
        title: "Instalação",
        description:
          "Instalação do painel elétrico conforme os requisitos e as características da aplicação.",
      },
    ],
    closingTitle: "Um painel bem projetado gera mais resultados.",
    closingDescription:
      "Conte com a Innomaker para desenvolver, montar e instalar seu painel elétrico com precisão, organização e eficiência.",
    image: "/images/services/paineis-eletricos.jpg",
  },
  {
    slug: "automacao-industrial",
    title: "Automação industrial e sistemas de controle",
    heading: ["Automação industrial", "e sistemas de controle"],
    closingAccent: "mais inteligentes.",
    approachesLayout: "editorial",
    stagesLayout: "timeline",
    stagesTitle: "Da análise à integração",
    imageAlt: "Composição ilustrativa de uma estação industrial com esteira, sensor e controlador",
    heroLayout: "standard",
    source: "https://innomaker.com.br/automacao-industrial/",
    introduction: "Desenvolvimento de soluções para automação, controle e integração de sistemas.",
    description:
      "Aplicamos conhecimento técnico para desenvolver sistemas que automatizam processos, aprimoram o controle e conectam diferentes elementos, trazendo mais eficiência e precisão.",
    approachesTitle: "Controle, automação e integração",
    approaches: [
      {
        title: "Automação de processos",
        description:
          "Desenvolvimento de sistemas para automatizar operações e tornar sua execução mais eficiente.",
      },
      {
        title: "Monitoramento e controle",
        description:
          "Estruturação de sistemas para acompanhar e controlar variáveis e etapas do processo.",
      },
      {
        title: "Integração de sistemas",
        description:
          "Conexão entre diferentes elementos para permitir uma operação mais integrada e coordenada.",
      },
    ],
    stages: [
      {
        title: "Análise",
        description: "Levantamento do processo, equipamentos e requisitos envolvidos.",
      },
      {
        title: "Estruturação",
        description: "Definição da lógica de automação e dos elementos necessários ao sistema.",
      },
      {
        title: "Desenvolvimento",
        description: "Implementação das soluções de automação e controle previstas no projeto.",
      },
      {
        title: "Integração",
        description: "Conexão dos elementos para garantir o funcionamento conjunto do sistema.",
      },
    ],
    closingTitle: "Transforme processos em operações mais inteligentes.",
    closingDescription:
      "Identifique oportunidades de automação, controle e integração para evoluir sua operação.",
    image: "/images/services/automacao-industrial.jpg",
  },
  {
    slug: "mapeamento-de-processos",
    title: "Mapeamento de processos",
    heading: ["Mapeamento", "de processos"],
    closingAccent: "realmente funciona.",
    approachesLayout: "wide",
    stagesLayout: "split",
    stagesTitle: "Do levantamento à documentação",
    imageAlt:
      "Composição ilustrativa de documentação com um fluxo de etapas sem rótulos, régua e lapiseira em uma mesa técnica",
    heroLayout: "balanced",
    source: "https://innomaker.com.br/mapeamento-de-processos/",
    introduction:
      "Analisamos e estruturamos processos para tornar fluxos, responsabilidades e oportunidades de melhoria mais visíveis.",
    description:
      "Mapeamos as etapas que compõem cada processo, identificamos como as atividades se relacionam e organizamos essas informações para apoiar decisões e melhorias.",
    approachesTitle: "Visibilidade para aprimorar processos",
    approaches: [
      {
        title: "Fluxos e etapas",
        description:
          "Visualização das etapas do processo e de como cada uma impacta o resultado final.",
      },
      {
        title: "Padronização de processos",
        description:
          "Definição de uma referência clara para a execução das atividades e identificação de desvios.",
      },
      {
        title: "Oportunidades de melhoria",
        description:
          "Identificação de gargalos, retrabalhos e pontos de atenção que afetam o desempenho do processo.",
      },
    ],
    stages: [
      {
        title: "Levantamento",
        description: "Coleta de informações sobre atividades, responsáveis e fluxos existentes.",
      },
      {
        title: "Mapeamento",
        description: "Representação visual da sequência e das relações entre as atividades.",
      },
      {
        title: "Análise",
        description:
          "Avaliação do fluxo para identificar pontos críticos e oportunidades de melhoria.",
      },
      {
        title: "Documentação",
        description: "Organização e consolidação do processo mapeado para orientar sua evolução.",
      },
    ],
    closingTitle: "Entenda como seu processo realmente funciona.",
    closingDescription:
      "Mapeie seus fluxos, identifique oportunidades e tenha uma visão mais clara da sua operação.",
    image: "/images/services/mapeamento-de-processos.jpg",
  },
  {
    slug: "automacao-de-processos",
    title: "Automação de processos",
    heading: ["Automação", "de processos"],
    closingAccent: "fluxos automatizados.",
    approachesLayout: "columns",
    stagesLayout: "timeline",
    stagesTitle: "Etapas da automação",
    imageAlt:
      "Composição ilustrativa de um monitor exibindo um fluxo digital de atividades conectadas, sem dados de uma operação real",
    heroLayout: "standard",
    source: "https://innomaker.com.br/automacao-de-processos/",
    introduction:
      "Automatização de processos para reduzir atividades repetitivas, integrar informações e tornar a execução mais eficiente.",
    description:
      "Desenvolvemos soluções que automatizam etapas operacionais, conectam ferramentas e organizam fluxos de trabalho, reduzindo esforço manual e aumentando a agilidade da operação.",
    approachesTitle: "Processos mais ágeis e conectados",
    approaches: [
      {
        title: "Redução de tarefas manuais",
        description:
          "Automatização de atividades repetitivas para reduzir o tempo gasto com operações manuais.",
      },
      {
        title: "Integração de informações",
        description:
          "Conexão entre ferramentas e etapas para facilitar o fluxo de dados ao longo do processo.",
      },
      {
        title: "Controle sobre a execução",
        description:
          "Estruturação de fluxos mais organizados, com menos etapas manuais e maior previsibilidade.",
      },
    ],
    stages: [
      {
        title: "Levantamento",
        description:
          "Identificação das atividades, ferramentas e etapas que compõem o processo atual.",
      },
      {
        title: "Estruturação",
        description: "Definição do fluxo automatizado e das regras necessárias para sua execução.",
      },
      {
        title: "Implementação",
        description: "Implementação das automações e integrações previstas para o processo.",
      },
      {
        title: "Testes e ajustes",
        description:
          "Testagem do fluxo automatizado e ajustes para garantir seu funcionamento adequado.",
      },
    ],
    closingTitle: "Transforme tarefas em fluxos automatizados.",
    closingDescription:
      "Reduza atividades manuais e encontre novas possibilidades para tornar sua operação mais eficiente.",
    image: "/images/services/automacao-de-processos.jpg",
  },
  {
    slug: "des-de-software",
    title: "Desenvolvimento de software",
    heading: ["Desenvolvimento", "de software"],
    closingAccent: "do papel.",
    approachesLayout: "wide",
    stagesLayout: "grid",
    stagesTitle: "Etapas do desenvolvimento",
    imageAlt:
      "Composição ilustrativa de notebook e monitor com interfaces de software sem dados reais",
    heroLayout: "balanced",
    source: "https://innomaker.com.br/des-de-software/",
    introduction: "Tecnologia desenvolvida para as necessidades do seu projeto.",
    description:
      "Criamos aplicações e sistemas personalizados para transformar requisitos específicos em ferramentas funcionais, integradas e alinhadas aos objetivos de cada projeto.",
    approachesTitle: "Softwares para diferentes necessidades",
    approaches: [
      {
        title: "Sistemas sob medida",
        description:
          "Desenvolvimento de aplicações e sistemas personalizados para atender aos requisitos e objetivos de cada projeto.",
      },
      {
        title: "Integração de tecnologias",
        description:
          "Conexão entre sistemas, dados e ferramentas para centralizar informações e automatizar tarefas.",
      },
      {
        title: "Interfaces e dashboards",
        description:
          "Desenvolvimento de interfaces para visualizar informações e indicadores e facilitar a tomada de decisão.",
      },
    ],
    stages: [
      {
        title: "Levantamento",
        description: "Levantamento das necessidades, requisitos e objetivos do projeto.",
      },
      {
        title: "Estruturação",
        description: "Definição da estrutura, funcionalidades e caminhos para o desenvolvimento.",
      },
      {
        title: "Desenvolvimento",
        description: "Construção e implementação das funcionalidades previstas para o sistema.",
      },
      {
        title: "Validação e entrega",
        description: "Validação, ajustes finais e disponibilização do sistema ao cliente.",
      },
    ],
    closingTitle: "Vamos tirar o seu projeto do papel.",
    closingDescription:
      "Do planejamento ao desenvolvimento, colocamos a tecnologia para trabalhar a favor do seu projeto.",
    image: "/images/services/des-de-software.jpg",
  },
] satisfies ServiceLanding[];

export function getServiceLanding(slug: string): ServiceLanding {
  const service = serviceLandings.find((item) => item.slug === slug);
  if (!service) throw new Error(`Serviço não encontrado: ${slug}`);
  return service;
}
