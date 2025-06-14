<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<h1 align="center"Boilerplate NestJS - API de Gerenciamento de Usuários</h1>

<p align="center">
 API para autenticação de usuários utilizando NestJs. 
</p>

---

## 📚 Sobre o projeto

Trata-se de uma API RESTful desenvolvida com NestJS para autenticação de usuários, utilizando Prisma ORM para acesso ao banco de dados PostgreSQL. A aplicação implementa autenticação com JSON Web Tokens (JWT) e segue boas práticas de organização modular e segurança.

Foram implementadas as seguintes funcionalidades:
- Cadastro de usuários
- Autenticação de usuários com JWT
- Hash de senhas com Bcrypt
- Geração de tokens JWT
- Organização modular usando boas práticas do NestJS

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL instalado e configurado
- Yarn ou NPM

### Clonando o repositório

```bash
git clone https://github.com/pettmedeiros/boilerplate_nestjs
cd ProjetoNestJs

## Instalando as dependências

```bash
$ npm install
```
## Configurando ambiente:
Crie um arquivo .env 
DATABASE_URL="postgresql://usuario:suasenha@localhost:5432/boilerplate_nestjs?schema=public"
JWT_SECRET=seu_jwt_secreto_aqui_2025
PORT=3000

## Compilar e executar o projeto

```bash
# desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# modo de produção
$ npm run start:prod



```


 # Autor
   Peterson Lisboa Medeiros

   https://www.linkedin.com/in/peterson-medeiros-b54307318/

