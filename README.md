# 🏷️ Clube de Benefícios API

API REST desenvolvida para o desafio técnico de um sistema de Clube de Benefícios. A aplicação permite o cadastro e gerenciamento de clientes, produtos, compras, e relatórios, utilizando boas práticas de arquitetura (SOLID, Service/Repository Pattern) com Node.js, Express, TypeORM e MySQL.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- MySQL
- TypeORM
- JWT (para autenticação)
- Bcrypt.js (para hash de senhas)
- Dotenv
- Helmet & CORS (para segurança)
- ts-node-dev (para hot reload no desenvolvimento)

---

## ⚙️ Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

### 2. Instale as Depências
npm install


### 3. Configure o ambiente
Crie um arquivo .env baseado no .env.example

### 4. Crie o banco de dados
Em qualquer SGBD ou terminal, crie o banco:
CREATE DATABASE clube_beneficios;

### 5. Inicie a aplicação
npm run dev
api disponivel em : http://localhost:3000/api

### 6. Testes no Postman
Autenticação: (após criar o usuario)
POST /api/login
{
    "email": "admin@email.com"
    "senha": "123456"
}

Clientes:
POST /api/clientes
para criar um cliente:
{
    "nome": "Usuario",
    "email": "usermail@email.com",
    "senha": "user123456",
    "tipoUsuario": "admin"
}
GET /api/clientes(admin + JWT)

Produtos
POST /api/produtos
GET /api/produtos?page=1&limit=5&categoria=Eletrônicos&precoMin=100&precoMax=1000

Compras
testar endpoint de compra postman: 
Em Header: Authorization: Bearer SEU_TOKEN_JWT e Content-Type: application/json
POST /api/compras (JWT)
{
  "produtosIds": [1, 3]
}
GET /api/compras(JWT)

Pagamentos
POST /api/pagamentos (JWT)
{
  "compraId": 1
}

Relatório de Vendas (admin)
GET /api/relatorios/vendas (JWT de admin)


#### Segurança:
Senhas: armazenadas com hash (bcrypt)

Rotas: protegidas com JWT

Verificação de permissão admin para rotas sensíveis


### Testado com:
Postman

MySQL Workbench
