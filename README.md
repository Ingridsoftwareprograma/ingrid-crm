# 💼 Ingrid CRM

Sistema Full Stack de gerenciamento de clientes e leads, desenvolvido como projeto de portfólio para aplicar conceitos de desenvolvimento web, criação de APIs e integração com banco de dados.

O **Ingrid CRM** permite cadastrar, visualizar, editar e excluir clientes, mantendo os dados armazenados em um banco PostgreSQL.

---

## 🚀 Funcionalidades

Atualmente o sistema possui:

- 👥 Cadastro de clientes e leads
- 📋 Listagem de clientes
- ✏️ Edição de clientes
- 🗑️ Exclusão de clientes com confirmação
- 📌 Controle de status dos leads
- 📊 Dashboard com indicadores
- 📞 Cadastro de telefone
- 📧 Cadastro de e-mail
- 🪪 Cadastro de CPF
- 🏢 Cadastro de empresa
- 📝 Observações sobre o cliente
- 💾 Persistência dos dados no PostgreSQL
- 🔄 Integração Front-end e Back-end através de API REST
- ⚠️ Tratamento de erros da API

---

## 🛠️ Tecnologias

### Front-end

- React
- JavaScript
- Vite
- HTML5
- CSS3
- Fetch API

### Back-end

- Node.js
- Express
- API REST
- CORS
- dotenv
- Nodemon

### Banco de Dados

- PostgreSQL
- node-postgres (`pg`)

### Ferramentas

- Git
- GitHub
- Visual Studio Code
- npm

---

## 🏗️ Estrutura do Projeto

```text
IngridCRM/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── clienteController.js
│   │   └── routes/
│   │       └── clienteRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── database/
├── docs/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔗 API

A aplicação utiliza uma API REST para realizar as operações CRUD dos clientes.

| Método | Endpoint | Função |
|---|---|---|
| GET | `/api/clientes` | Listar clientes |
| POST | `/api/clientes` | Cadastrar cliente |
| PUT | `/api/clientes/:id` | Editar cliente |
| DELETE | `/api/clientes/:id` | Excluir cliente |

---

## ⚙️ Como executar o projeto

### Pré-requisitos

Para executar o projeto localmente é necessário ter:

- Node.js
- npm
- PostgreSQL
- Git

### 1. Clone o projeto

```bash
git clone https://github.com/Ingridsoftwareprograma/ingrid-crm.git
```

Depois entre na pasta:

```bash
cd ingrid-crm
```

### 2. Back-end

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=ingrid_crm
PORT=3001
```

> Nunca publique seu arquivo `.env` ou credenciais reais.

Inicie o servidor:

```bash
npm run dev
```

A API será executada localmente na porta `3001`.

### 3. Front-end

Em outro terminal, acesse:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

O Vite mostrará no terminal o endereço local para acessar a aplicação.

---

## 🗄️ Banco de Dados

O sistema utiliza PostgreSQL para persistência dos dados.

A tabela de clientes armazena informações como:

- Nome
- E-mail
- Telefone
- CPF
- Empresa
- Status
- Observações
- Data de criação
- Data de atualização

---

## 📚 Conceitos aplicados

Durante o desenvolvimento foram aplicados conceitos de:

- Desenvolvimento Full Stack
- Componentes React
- Hooks `useState` e `useEffect`
- Consumo de API com Fetch
- API REST
- CRUD
- Rotas com Express
- Controllers
- SQL
- PostgreSQL
- Variáveis de ambiente
- Tratamento de erros
- Git e GitHub

---

## 🔮 Próximas melhorias

- 🔐 Login e autenticação
- 🔎 Pesquisa e filtros
- 💼 Funil de vendas
- 📅 Agenda de atendimentos e visitas
- 🏢 Cadastro de empreendimentos
- 📈 Relatórios
- 📱 Melhorias de responsividade
- 🌐 Deploy da aplicação

---

## 👩‍💻 Desenvolvedora

**Ingrid de Souza**

Projeto desenvolvido para estudo e portfólio na área de desenvolvimento de software.