# Ativar o formulário de contato

A página `/contato` usa o endpoint `/api/contato`, executado no servidor pelo TanStack Start/Nitro. Não há dependências novas. O envio usa a API HTTPS do Resend, não o navegador nem um link mailto.

## Variáveis e serviços

1. Crie uma chave de envio no Resend e verifique um domínio que você controla, seguindo https://resend.com/docs/dashboard/domains/introduction. Configure `CONTACT_FROM_EMAIL` com um endereço autorizado desse domínio. O código não presume que innomaker.com.br esteja verificado. O remetente de testes do Resend não permite enviar livremente aos dois destinatários.
2. Crie um widget Cloudflare Turnstile em https://dash.cloudflare.com/ (ação enviada pelo código: `contact`). Autorize o hostname público e, se necessário, localhost para desenvolvimento. Copie a chave pública para `TURNSTILE_SITE_KEY` e a secreta para `TURNSTILE_SECRET_KEY`.
3. Configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_ORIGIN`, `TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY`. `CONTACT_ORIGIN` é a origem exata, por exemplo o endereço público real com https, sem barra final. Em desenvolvimento deve coincidir com a URL usada no navegador, inclusive porta (localhost e 127.0.0.1 são diferentes).
4. Localmente, copie `.env.example` para `.env.local`, preencha e inicie com `node --env-file=.env.local node_modules/vite/bin/vite.js` (Node 20.6+). Esse comando carrega os segredos no processo do servidor; o `npm.cmd run dev` padrão pode ser usado quando as variáveis já estiverem definidas no terminal. O Vite não publica essas variáveis sem prefixo VITE_ no frontend. No Worker, configure os valores no painel Cloudflare, em Settings → Variables and Secrets, marcando as duas chaves como secrets. Não use prefixo VITE_ nas chaves. O endpoint GET publica somente a site key, que é pública; nenhuma chave secreta vai para o frontend.
5. Execute `npm.cmd run build` e publique o projeto completo com a infraestrutura de servidor já usada pelo site (preset cloudflare-module). Não publique apenas `.output/public`: o Worker em `.output/server` também precisa ser implantado. Preserve as variáveis em novas implantações. Verifique que o fluxo de publicação do Lovable realmente implanta esse servidor; hospedagem exclusivamente estática não executa este endpoint.

Sem credenciais, o formulário informa indisponibilidade e oferece WhatsApp. Não há fallback para sucesso simulado. `GET /api/contato` retorna `{ "siteKey": null }` enquanto faltarem configurações. Isso verifica presença, não validade das credenciais ou autorização do remetente.

## Destinatários e verificação

O servidor fixa os dois destinatários na mesma chamada: anapelosi.innomaker@gmail.com e wandersoncorrea@innomaker.com.br. `reply_to` recebe o e-mail validado do visitante. O conteúdo do e-mail é texto simples, sem HTML do usuário. A API aceita apenas um remetente definido no servidor.

Depois da implantação, abra `/contato`, conclua a verificação e envie uma mensagem identificada como teste. Confira o resultado no painel do Resend e a entrega nas DUAS caixas de entrada, inclusive spam. O estado de sucesso significa que o Resend aceitou o envio com um ID; não confirma a entrega final. As verificações automatizadas usam respostas de serviço simuladas apenas nos testes e não comprovam envio em produção.

## Proteção e limites

Há validação compartilhada no cliente e no servidor, limites de caracteres e de corpo (16 KiB), honeypot, checagem de origem e Turnstile obrigatório validado no servidor, incluindo hostname e ação. Tokens expirados/reutilizados não são aceitos pelo Turnstile. Há também limite de cinco tentativas por minuto por IP dentro de cada instância do Worker, com armazenamento limitado e descarte de entradas expiradas. Esse contador é complementar: reinicia em cold starts e não é um limite global entre instâncias. Para volume elevado, configure adicionalmente uma regra de rate limiting/WAF da Cloudflare para POST /api/contato, sem depender do contador em memória. Não é necessário adicionar banco de dados para ativar o fluxo básico.

Falhas do Resend, Turnstile, rede, timeout ou configuração não geram sucesso e não limpam os campos. O botão bloqueia envios simultâneos; a chave de idempotência é mantida nas tentativas com o mesmo conteúdo e renovada quando o formulário é editado. Se a conexão falhar depois de o serviço aceitar a mensagem, uma nova tentativa sem editar os dados reaproveita essa chave (retenção do Resend: 24 horas). O desafio é renovado após cada tentativa. O servidor não registra o texto das mensagens, as chaves ou as respostas privadas dos serviços.

Testes: `npm.cmd test`. Compilação: `npm.cmd run build`. Tipos: `npx.cmd tsc --noEmit`.
