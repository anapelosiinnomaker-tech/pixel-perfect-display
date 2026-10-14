# Revisão editorial das landing pages

## Correções aplicadas

Após a conferência das referências, o usuário autorizou expressamente corrigir também as inconsistências existentes no site publicado. As mudanças abaixo foram aplicadas em `src/content/service-landings.ts`, mantendo o escopo dos serviços e sem atribuir novas capacidades, tecnologias, especificações ou resultados à Innomaker.

| Página | Correção aplicada |
| --- | --- |
| Prototipagem | “Detalhamento do produto” passou a “Limitações e ajustes”, mantendo a descrição sobre identificação de limitações e possíveis ajustes. |
| Engenharia Reversa | A descrição de representação técnica foi associada a “Reconstrução”; a avaliação de resultados e oportunidades de melhoria, a “Aprimoramento”. A sequência Análise → Mapeamento → Reconstrução → Aprimoramento foi mantida. |
| Painéis Elétricos | As descrições de “Montagem e instalação” e “Integração de sistemas” passaram a tratar do painel e de seus componentes. As etapas copiadas de Engenharia Reversa foram substituídas por Planejamento → Projeto elétrico → Montagem → Instalação, com descrições correspondentes às atividades já apresentadas na introdução e no encerramento da própria referência. |
| Automação de Processos | “Análise” passou a “Implementação”; “Documentação” passou a “Testes e ajustes”. As descrições foram preservadas. |
| Desenvolvimento de Software | “Análise” passou a “Desenvolvimento”; “Documentação” passou a “Validação e entrega”. “Sistemas sob medida” recebeu descrição sobre aplicações e sistemas personalizados, coerente com a introdução do serviço. |

### Painéis Elétricos: etapas revisadas

1. **Planejamento:** Levantamento dos requisitos e das características da aplicação para orientar o projeto do painel.
2. **Projeto elétrico:** Definição dos componentes e das informações técnicas que orientam a montagem do painel.
3. **Montagem:** Montagem dos componentes elétricos do painel de acordo com o projeto definido.
4. **Instalação:** Instalação do painel elétrico conforme os requisitos e as características da aplicação.

As correções são editoriais, não transcrições de uma atualização das fontes. O código não acrescenta certificações, normas, ensaios, garantias, equipamentos ou atividades além do escopo já descrito.

A quantidade de etapas e todos os dados de layout, imagens, rotas, introduções e CTAs foram preservados. Automação Industrial, Mapeamento de Processos e as demais páginas não foram modificados. A conferência anterior abaixo é mantida apenas como histórico das associações que motivaram as correções; suas afirmações de correspondência com o código referem-se ao estado anterior.

## Registro histórico da conferência anterior
Consulta realizada em 14/10/2026, 14:36:32 (America/Sao_Paulo).

Foram consultadas novamente as cinco páginas individuais e a página geral de serviços. Todas responderam com HTTP 200. A conferência usou conteúdo recém-obtido das URLs publicadas, e não os registros da implementação anterior. O leitor web não conseguiu abrir as páginas; a consulta foi concluída por HTTP diretamente.

Foram comparados, posição por posição, os títulos e descrições dos três blocos de conteúdo e das quatro etapas de cada serviço: 35 associações ao todo, incluindo 20 etapas numeradas. Não foi encontrada divergência entre a implementação em src/content/service-landings.ts e as fontes individuais. Na comparação foram desconsideradas apenas diferenças de capitalização, espaços e a separação de “Documentação técnica”, já normalizada anteriormente.

Nenhum texto, título, associação ou ordem foi alterado na aplicação nesta revisão. Design, imagens, componentes, rotas, outras páginas e integrações foram preservados. Não foram executados novamente build ou testes de interface, pois houve somente registro documental da conferência, sem mudanças no código.

## Resultado por página

| Página | Problema encontrado na referência | Correção realizada | Fonte consultada |
| --- | --- | --- | --- |
| Prototipagem | “Detalhamento do produto” está associado a limitações e ajustes também na fonte publicada. | Nenhuma: conteúdo e ordem locais correspondem à fonte. | [Página individual](https://innomaker.com.br/prototipagem/) |
| Engenharia reversa | A fonte mantém 03. Reconstrução com avaliação de resultados/melhorias e 04. Aprimoramento com representação técnica. | Nenhuma: conteúdo e ordem locais correspondem à fonte. | [Página individual](https://innomaker.com.br/eng-reversa/) |
| Painéis elétricos | A própria fonte de Painéis contém os textos genéricos de Montagem e instalação/Integração de sistemas e as quatro etapas Análise, Mapeamento, Reconstrução, Aprimoramento. | Nenhuma: conteúdo e ordem locais correspondem à fonte. | [Página individual](https://innomaker.com.br/paineis-eletricos/) |
| Automação de processos | A fonte mantém 03. Análise para implementação e 04. Documentação para testes e ajustes. | Nenhuma: conteúdo e ordem locais correspondem à fonte. | [Página individual](https://innomaker.com.br/automacao-de-processos/) |
| Desenvolvimento de software | A fonte mantém 03. Análise para construção/implementação e 04. Documentação para validação, ajustes e disponibilização. | Nenhuma: conteúdo e ordem locais correspondem à fonte. | [Página individual](https://innomaker.com.br/des-de-software/) |

## Nomenclatura e organização

A [página geral de serviços](https://innomaker.com.br/servicos-2026/) foi consultada somente para organização e nomes. Engenharia Reversa aparece nela como “ENGENHARIAREVERSA”, sem espaço no texto extraído; a página individual confirma o nome Engenharia Reversa. Isso não justifica alterar o nome local. As etapas detalhadas foram conferidas exclusivamente nas páginas individuais.

## Prototipagem

Fonte: [https://innomaker.com.br/prototipagem/](https://innomaker.com.br/prototipagem/) — HTTP 200.

### Blocos descritivos

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 1 | PROVA DE CONCEITO | Materialização de uma ideia para avaliar sua viabilidade antes de avançar no desenvolvimento. | Corresponde à implementação. |
| 2 | simulação de funcionamento | Representação prática das características esperadas para observar seu comportamento em uso. | Corresponde à implementação. |
| 3 | DETALHAMENTO DO PRODUTO | Identificação de limitações e possíveis ajustes, apoiando decisões nas próximas etapas. | Corresponde à implementação. |

### Etapas na ordem publicada

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 01. | CONCEITO | Compreensão da ideia e do que precisa ser demonstrado ou testado. | Corresponde à implementação. |
| 02. | DESENVOLVIMENTO | Construção do protótipo a partir das características definidas para o projeto. | Corresponde à implementação. |
| 03. | TESTES | Avaliação do funcionamento do protótipo em relação ao que foi proposto. | Corresponde à implementação. |
| 04. | VALIDAÇÃO | Análise dos resultados e dos próximos passos para evolução do projeto. | Corresponde à implementação. |

## Engenharia reversa

Fonte: [https://innomaker.com.br/eng-reversa/](https://innomaker.com.br/eng-reversa/) — HTTP 200.

### Blocos descritivos

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 1 | análise do produto | Investigação da estrutura e componentes do produto para compreender seu funcionamento. | Corresponde à implementação. |
| 2 | reconstrução do produto | Levantamento e representação das características técnicas e detalhamento do produto. | Corresponde à implementação. |
| 3 | documentaçãotécnica | Organização das informações levantadas para criar uma documentação técnica detalhada do produto. | Corresponde à implementação. |

### Etapas na ordem publicada

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 01. | ANÁLISE | Levantamento dos componentes e funcionamento do produto. | Corresponde à implementação. |
| 02. | MAPEAMENTO | Organização das informações e relações entre os elementos que compõem o produto. | Corresponde à implementação. |
| 03. | RECONSTRUÇÃO | Avaliação dos resultados e identificação de possibilidades de melhoria no produto. | Corresponde à implementação. |
| 04. | APRIMORAMENTO | Desenvolvimento da representação técnica a partir das informações levantadas. | Corresponde à implementação. |

## Painéis elétricos

Fonte: [https://innomaker.com.br/paineis-eletricos/](https://innomaker.com.br/paineis-eletricos/) — HTTP 200.

### Blocos descritivos

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 1 | PROJETO ELÉTRICO | Desenvolvimento do projeto do painel considerando os requisitos e características definidos para a aplicação. | Corresponde à implementação. |
| 2 | MONTAGEM E INSTALAÇÃO | Levantamento e representação das características técnicas do produto. | Corresponde à implementação. |
| 3 | integração de sistemas | Organização das informações levantadas para criar uma documentação técnica detalhada do produto. | Corresponde à implementação. |

### Etapas na ordem publicada

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 01. | ANÁLISE | Levantamento dos componentes e funcionamento do produto. | Corresponde à implementação. |
| 02. | MAPEAMENTO | Organização das informações e relações entre os elementos que compõem o produto. | Corresponde à implementação. |
| 03. | RECONSTRUÇÃO | Avaliação dos resultados e identificação de possibilidades de melhoria no produto. | Corresponde à implementação. |
| 04. | APRIMORAMENTO | Desenvolvimento da representação técnica a partir das informações levantadas. | Corresponde à implementação. |

## Automação de processos

Fonte: [https://innomaker.com.br/automacao-de-processos/](https://innomaker.com.br/automacao-de-processos/) — HTTP 200.

### Blocos descritivos

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 1 | redução de tarefas manuais | Automatização de atividades repetitivas para reduzir o tempo gasto com operações manuais. | Corresponde à implementação. |
| 2 | integração de informações | Conexão entre ferramentas e etapas para facilitar o fluxo de dados ao longo do processo. | Corresponde à implementação. |
| 3 | controle sobre a execução | Estruturação de fluxos mais organizados, com menos etapas manuais e maior previsibilidade. | Corresponde à implementação. |

### Etapas na ordem publicada

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 01. | LEVANTAMENTO | Identificação das atividades, ferramentas e etapas que compõem o processo atual. | Corresponde à implementação. |
| 02. | ESTRUTURAÇÃO | Definição do fluxo automatizado e das regras necessárias para sua execução. | Corresponde à implementação. |
| 03. | ANÁLISE | Implementação das automações e integrações previstas para o processo. | Corresponde à implementação. |
| 04. | DOCUMENTAÇÃO | Testagem do fluxo automatizado e ajustes para garantir seu funcionamento adequado. | Corresponde à implementação. |

## Desenvolvimento de software

Fonte: [https://innomaker.com.br/des-de-software/](https://innomaker.com.br/des-de-software/) — HTTP 200.

### Blocos descritivos

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 1 | sistemas sob medida | Automatização de atividades repetitivas para reduzir o tempo gasto com operações manuais. | Corresponde à implementação. |
| 2 | Integração de tecnologias | Conexão entre sistemas, dados e ferramentas para centralizar informações e automatizar tarefas. | Corresponde à implementação. |
| 3 | INTERFACES E DASHBOARDS | Desenvolvimento de interfaces para visualizar informações e indicadores e facilitar a tomada de decisão. | Corresponde à implementação. |

### Etapas na ordem publicada

| Ordem | Título publicado | Descrição publicada | Conferência |
| --- | --- | --- | --- |
| 01. | LEVANTAMENTO | Levantamento das necessidades, requisitos e objetivos do projeto. | Corresponde à implementação. |
| 02. | ESTRUTURAÇÃO | Definição da estrutura, funcionalidades e caminhos para o desenvolvimento. | Corresponde à implementação. |
| 03. | ANÁLISE | Construção e implementação das funcionalidades previstas para o sistema. | Corresponde à implementação. |
| 04. | DOCUMENTAÇÃO | Validação, ajustes finais e disponibilização do sistema ao cliente. | Corresponde à implementação. |

## Pendências

Nenhuma página ficou sem verificação e nenhuma informação detalhada ficou inacessível. Não há correção de implementação pendente diante das fontes atuais.

Permanecem sujeitos à decisão editorial da Innomaker os cinco pontos resumidos na tabela inicial: título de limitações/ajustes em Prototipagem; associações de Reconstrução/Aprimoramento em Engenharia Reversa; textos genéricos e repetidos de Painéis Elétricos; rótulos Análise/Documentação em Automação de Processos e Desenvolvimento de Software. A publicação confirma as associações atuais, mas não fornece títulos/descrições alternativos que autorizem substituições. Nenhum substituto foi presumido.
