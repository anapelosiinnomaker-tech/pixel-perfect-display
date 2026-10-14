# Landing pages dos serviços

As sete páginas usam `src/components/services/ServiceLandingPage.tsx`, com dados próprios em `src/content/service-landings.ts`. A estrutura acompanha a landing de Desenvolvimento de Produtos, que foi preservada. Os componentes Container, CtaLink, ProductReveal, SiteHeader e SiteFooter são reutilizados sem alteração. As variações de composição são escolhidas nos dados: três formatos para as informações técnicas e três para as etapas. Não há novas dependências nem mudanças no envio de e-mails.

## Fontes consultadas com sucesso em 14/10/2026

| Serviço / rota local | Conteúdo publicado |
| --- | --- |
| `/prototipagem` | https://innomaker.com.br/prototipagem/ |
| `/eng-reversa` | https://innomaker.com.br/eng-reversa/ |
| `/paineis-eletricos` | https://innomaker.com.br/paineis-eletricos/ |
| `/automacao-industrial` | https://innomaker.com.br/automacao-industrial/ |
| `/mapeamento-de-processos` | https://innomaker.com.br/mapeamento-de-processos/ |
| `/automacao-de-processos` | https://innomaker.com.br/automacao-de-processos/ |
| `/des-de-software` | https://innomaker.com.br/des-de-software/ |

Os títulos e parágrafos foram recuperados das páginas completas, via HTTP, após o leitor web não conseguir abri-las. Não ficou conteúdo inacessível. Foram normalizados capitalização, espaços e a grafia “Documentação técnica”, que aparece concatenada na referência. Os títulos editoriais das seções de etapas apenas identificam a sequência já publicada. Não foram acrescentados serviços, especificações, tecnologias, clientes, métricas ou resultados.

## Revisão editorial aplicada

Após a recuperação das fontes, o usuário solicitou corrigir os problemas de coerência também presentes no site publicado. Foram aplicadas estas correções, preservando o escopo dos serviços:

- Prototipagem: título “Limitações e ajustes” para a descrição sobre limitações e possíveis ajustes.
- Engenharia Reversa: representação técnica em “Reconstrução”; avaliação de resultados e melhorias em “Aprimoramento”.
- Painéis Elétricos: descrições próprias para montagem/instalação e integração dos componentes; sequência Planejamento → Projeto elétrico → Montagem → Instalação.
- Automação de Processos: títulos “Implementação” e “Testes e ajustes” para as respectivas descrições.
- Desenvolvimento de Software: títulos “Desenvolvimento” e “Validação e entrega”; descrição de “Sistemas sob medida” alinhada a aplicações e sistemas personalizados.

O detalhamento e o histórico da conferência das fontes estão em [revisao-editorial-servicos.md](revisao-editorial-servicos.md). Essas mudanças corrigem o conteúdo editorial; não representam uma nova versão do site publicado de referência.
## Imagens

Foram geradas sete ilustrações específicas, sem pessoas, rostos, corpos ou mãos, em `public/images/services/`. A direção de arte usa grafite, metal, cinzas neutros e verde discreto. Os arquivos foram codificados como JPEG para reduzir o peso, preservando as dimensões originais de 1536 × 1024. Cada imagem é usada pela hero de seu serviço. São cenas ilustrativas, sem identificação de instalações, equipes ou cases reais da Innomaker.

## Integração

As sete rotas usam os mesmos slugs publicados. A única mudança de navegação é substituir os sete links externos no catálogo de `src/content/site.ts` por essas rotas internas. Os arquivos das páginas Home, Sobre, Serviços, Contato e Desenvolvimento de Produtos, os estilos globais, header, footer e infraestrutura de e-mail não foram modificados.

A árvore de rotas é gerada automaticamente pelo build/dev do TanStack. Testes de roteamento verificam cada destino do catálogo. Os CTAs usam o WhatsApp já configurado no site; a âncora “Conheça as etapas” aponta para o conteúdo da própria página.

## Verificações realizadas

- Build de produção e TypeScript concluídos sem erros; 41 testes passaram, incluindo as sete rotas a partir do catálogo.
- As sete páginas foram abertas diretamente no Chrome em 1440, 768, 390 e 320 px (28 verificações). Não houve transbordamento horizontal, títulos cortados, imagens quebradas ou erros de execução/console.
- Foi verificada a presença de todos os parágrafos específicos de cada fonte: introdução, descrição, três frentes, quatro etapas e encerramento.
- Os três CTAs de cada página apontam ao WhatsApp existente, com abertura segura; a âncora de etapas possui destino válido. Os sete links internos foram encontrados na página Serviços.
- Movimento reduzido foi verificado nas sete páginas, sem animações de entrada ativas e com conteúdo visível. O foco de teclado em CTA foi verificado no template compartilhado.
- As sete capturas desktop/celular foram geradas e a revisão visual cobriu todas as páginas. Home, Sobre, Serviços, Contato e Desenvolvimento de Produtos também responderam com HTTP 200. Seus arquivos e componentes globais permaneceram intactos.

Revisão editorial concluída conforme solicitação do usuário. Não há pendência de acesso às fontes ou de implementação das sete páginas.
