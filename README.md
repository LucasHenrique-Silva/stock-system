# 📦 Stock System

API REST para controle de estoque, desenvolvida com **Node.js**, **Express** e **TypeScript**. Utiliza **Prisma ORM** com **PostgreSQL**, autenticação via **JWT** e validação de dados com **Zod**. O sistema trabalha com perfis de acesso (administrador e funcionário).

## 🚀 Tecnologias

| Categoria | Tecnologia |
|---|---|
| Linguagem | TypeScript 5 |
| Runtime | Node.js |
| Framework | Express 5 |
| ORM | Prisma 7 (com `@prisma/adapter-pg`) |
| Banco de dados | PostgreSQL |
| Autenticação | JSON Web Token (`jsonwebtoken`) |
| Criptografia de senhas | bcryptjs |
| Validação | Zod |
| Segurança | Helmet + CORS |
| Variáveis de ambiente | dotenv |
| Desenvolvimento | Nodemon + ts-node |

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/download/) (ou Docker)
- Yarn ou npm
- Git

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/LucasHenrique-Silva/stock-system.git
cd stock-system
```

2. Instale as dependências:

```bash
yarn install
# ou
npm install
```

3. Crie um arquivo `.env` na raiz do projeto:

```env
# Conexão com o PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/estoque"

# Chave secreta usada para assinar os tokens JWT
JWT_SECRET="troque-por-uma-chave-secreta"

# Porta da aplicação
PORT=3000
```

> ⚠️ Confira no código (`src/`) os nomes exatos das variáveis de ambiente utilizadas e ajuste o exemplo acima, se necessário. Nunca versione o arquivo `.env`.

Para subir um PostgreSQL rapidamente com Docker:

```bash
docker run --name estoque-db \
  -e POSTGRES_DB=estoque \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 -d postgres
```

4. Gere o client do Prisma e aplique as migrations:

```bash
yarn prisma:generate
yarn prisma:migrate
```

5. (Opcional) Popule o banco com dados iniciais:

```bash
yarn prisma:seed
```

## ▶️ Executando

**Modo desenvolvimento** (com recarregamento automático):

```bash
yarn dev
```

**Modo produção:**

```bash
yarn build
yarn start
```

## 📜 Scripts disponíveis

| Script | Descrição |
|---|---|
| `dev` | Inicia o servidor em modo desenvolvimento com Nodemon |
| `build` | Compila o TypeScript para a pasta `dist/` |
| `start` | Executa a versão compilada (`dist/server.js`) |
| `prisma:generate` | Gera o Prisma Client |
| `prisma:migrate` | Cria e aplica migrations (`prisma migrate dev`) |
| `prisma:push` | Sincroniza o schema com o banco sem criar migration |
| `prisma:status` | Mostra o status das migrations |
| `prisma:studio` | Abre o Prisma Studio para visualizar os dados |
| `prisma:seed` | Executa o seed do banco de dados |

## 🔐 Autenticação e permissões

A API utiliza tokens JWT. Após o login, envie o token no header das requisições protegidas:

```
Authorization: Bearer <seu_token>
```

Perfis de acesso:

- **ADM (administrador):** pode adicionar usuários e visualizar a lista de funcionários.
- **Funcionário:** acesso restrito às operações de estoque, sem visualizar a lista de funcionários.

## 📁 Estrutura do projeto

```
stock-system
├── prisma/              # Schema, migrations e seed do banco
├── src/                 # Código-fonte da aplicação
├── prisma.config.ts     # Configuração do Prisma
├── nodemon.json         # Configuração do Nodemon
├── tsconfig.json        # Configuração do TypeScript
├── LIST.TODO            # Lista de tarefas pendentes
└── package.json
```

## 📝 Próximos passos

- [ ] Criar um tratamento de erro genérico
- [ ] Permitir que somente ADM adicione usuários
- [ ] Impedir que funcionários visualizem a lista de funcionários

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas alterações: `git commit -m "feat: minha feature"`
4. Envie para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

## 👤 Autor

**Lucas Henrique Silva**
GitHub: [@LucasHenrique-Silva](https://github.com/LucasHenrique-Silva)

## 📄 Licença

Distribuído sob a licença **MIT**, conforme definido no `package.json`. Considere adicionar um arquivo `LICENSE` ao repositório.
