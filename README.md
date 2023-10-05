# Sneakers Stock

## O Sneakers Stock é uma aplicação para o gerenciamento de Sneakers

### Features

- [x] Cadastro de usuário
- [x] Autenticação de usuário
- [x] Cadastro de produto
- [x] Edição de produto
- [x] Exclusão de produto
- [x] Listagem de produtos

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Docker](https://www.docker.com/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (Servidor)

```bash
# Clone este repositório
$ git clone https://github.com/jvdsantos3/sneakers-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd sneakers-api

# Instale as dependências
$ npm install

# Crie o container do banco de dados
$ docker compose up -d

# Aplique as migrations no banco de dados
$ npx prisma migrate dev

# Execute a aplicação
$ npm run start:dev
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node](https://nodejs.org/pt-br/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Fastify](https://fastify.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)

### Autor

---

<a href="https://www.linkedin.com/in/jvdsantosalcantara/">
 <img style="border-radius: 50%;" src="https://github.com/jvdsantos3.png" width="100px;" alt=""/>
 <br />
 <sub><b>João Vitor</b></sub></a> <a href="https://www.linkedin.com/in/jvdsantosalcantara/" title="Linkedin">🚀</a>

Feito por João Vitor
