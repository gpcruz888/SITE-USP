# Administração Gestcorp

A home original permanece em `/`. O painel fica em `/admin`, o login em `/admin/login`, e o formulário público de inscrição em `/inscricao`. Não há dados fictícios, senha padrão ou cadastro público de administradores.

## Executar localmente

Requer Node.js 22.16 ou superior.

```sh
npm ci
npm run admin:invite -- gabriel@feitojunto.com
npm run dev
```

O comando de convite mostra **no terminal** um link de ativação de uso único, válido por 30 minutos. Abra-o em particular, crie uma senha de pelo menos 12 caracteres e entre pelo `/admin/login`. O e-mail identifica o administrador; o comando não envia mensagens por e-mail. Para gerar outro convite, execute o comando novamente **com o servidor local parado**. Um administrador já ativado altera a própria senha pelo botão de configurações no cabeçalho. Para recuperação administrativa offline, use `npm run admin:recover -- e-mail` e confirme a revogação das sessões.

`npm run dev` inicia Vite em `http://127.0.0.1:5199` e API em `127.0.0.1:5200`. Apenas a porta do frontend deve ser aberta no navegador. O proxy mantém a API e os cookies na mesma origem. A porta do frontend pode ser alterada com `PORT`.

O PostgreSQL local usa PGlite, gravado em `data/gestcorp`. É um banco real em disco, somente do servidor, sem dependência do armazenamento do navegador. Nunca rode dois processos sobre a mesma pasta local. A pasta é ignorada pelo Git. Um banco vazio exibe indicadores zerados e estados vazios.

`npm run preview` compila a versão atual e serve **site + API** em `http://127.0.0.1:4173`. Pare o modo dev antes de usar preview com o mesmo banco. `npm run start` serve o build existente; configure `APP_URL` para a origem usada.

## Publicar na Vercel com Neon

1. Importe o repositório `gpcruz888/SITE-USP` na Vercel ou conecte o projeto com a CLI oficial.
2. Pelo Marketplace da Vercel, conecte um banco **Neon PostgreSQL**. A URL de conexão deve ficar na variável **servidor** `DATABASE_URL`, com TLS (`sslmode=require`). Use bancos ou branches separados para Preview e Production.
3. Defina `APP_URL=https://seu-dominio` para a URL pública exata. Para deploys de preview sem domínio fixo, omita `APP_URL`: a API usa `https://VERCEL_URL` do próprio deploy.
4. Mantenha o preset Vite. O `vercel.json` entrega `dist/` e encaminha `/api/*` à função Node `api/index.js`. Rotas administrativas e `/inscricao` usam o mesmo frontend.
5. Execute `npm test`, `npm run build` e `node scripts/check-deploy.mjs` antes de publicar. Publique com a integração Git ou `npx vercel --prod` após autenticar sua conta. Os arquivos devem estar no repositório antes de usar a integração Git.
6. Para ativar o primeiro administrador no banco publicado, use uma sessão local privada com `DATABASE_URL` e `APP_URL` de **produção** em `.env` e rode `npm run admin:invite -- gabriel@feitojunto.com`. Nunca envie `.env`, credenciais ou o link de ativação para o Git. Abra o link no domínio publicado e crie a senha.
7. Confira no domínio: login, formulário público, cadastro visível no painel, alteração de status, exportação CSV e logout. Validação local não substitui essa conferência após configurar o banco remoto.

O esquema é inicializado transacionalmente no primeiro acesso ao banco. No Neon, um advisory lock protege inicializações concorrentes. **Em produção e na Vercel, a aplicação recusa iniciar o banco local:** não há fallback temporário em memória ou no disco de uma função serverless. Se o banco não estiver configurado, as operações exibem erro de serviço e não simulam envios.

Nenhuma chave privada é compilada no frontend. Não use variáveis `VITE_*` para segredos. As consultas ao banco são feitas exclusivamente pela API autenticada, exceto os endpoints públicos de captação e consulta de processos abertos.

## Operação

- **Interessados:** busca por nome, e-mail, telefone ou turma; status; filtros de período e processo; paginação; edição; notas internas; consentimento e histórico; cadastro manual com confirmação de autorização; conversão em inscrição.
- **Processos:** nome, descrição, datas, status e contagem de inscritos. Somente processos ativos e dentro do período recebem inscrições públicas. A janela de inscrição usa a data de São Paulo, incluindo o último dia.
- **Inscrições:** candidato, processo, status, anotações, histórico e exportação. O painel permite vincular interessados a processos ativos ou em preparação; processos encerrados não recebem novas inscrições.
- **Atualização:** listas e indicadores consultam o servidor a cada 30 segundos enquanto a aba estiver visível. Filtros são preservados.
- **Exclusão:** confirmação no painel. Excluir um interessado remove seus dados, inscrições e histórico. Processos com inscrições não podem ser excluídos; encerre o processo para preservar os registros.
- **Exportação:** CSV UTF-8 com BOM, compatível com Excel, delimitado por ponto e vírgula. Usa os filtros atuais e limita a exportação a 10 mil registros. Fórmulas de planilha são neutralizadas. Exportações contêm dados pessoais e precisam ser guardadas em local autorizado.

## Segurança e manutenção

Senhas são armazenadas com scrypt e salt aleatório. Tokens de sessão e ativação são armazenados como hashes; cookies usam `HttpOnly`, `SameSite=Strict` e `Secure` com prefixo `__Host-` em produção HTTPS. Operações privadas de escrita exigem token CSRF e origem autorizada. Há limitação persistente de tentativas de login/ativação/envio público, limite de payload, consultas parametrizadas e respostas sem dados internos do servidor. Reenvios públicos de um e-mail já conhecido não sobrescrevem os dados pessoais nem revelam se ele existe.

A sessão dura até 8 horas de inatividade, com limite absoluto de 24 horas. O painel mantém a sessão enquanto estiver sendo usado; logout e mudança de senha revogam sessões no servidor. Nenhuma senha ou sessão é armazenada em localStorage. Mudanças relevantes ficam no histórico, com operador e data. Mensagens de erro e logs não devem conter payloads ou strings de conexão.

Faça backup do banco conforme a política da instituição. No Neon, configure retenção e recuperação no provedor; localmente, pare o servidor antes de copiar a pasta `data/gestcorp`. Revise periodicamente administradores, retenção de dados e consentimentos. O projeto não adiciona envio de e-mail, documentos de candidatos, decisões automáticas de seleção ou integração com sistemas acadêmicos.

## Testes

```sh
npm test
npm run build
node scripts/check-deploy.mjs
```

Os testes usam banco PostgreSQL em pasta temporária isolada e removem apenas seus próprios dados. Cobrem proteção de rotas, login, CSRF, validação, cadastro público, duplicatas, relacionamento, busca, filtros, paginação, histórico, exportação, ativação, logout, expiração e persistência depois de reabrir o banco. O teste HTTP precisa de permissão para abrir uma porta em loopback. Os testes não acessam o banco real configurado no projeto.
