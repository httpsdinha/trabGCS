# 🍳 Projeto CookBook (Full-Stack)

Bem-vindo ao CookBook! Este repositório contém o código-fonte completo do projeto, incluindo o **Frontend** (em Vue.js/npm) e o **Backend** (em Java/Spring Boot).

O projeto contempla uma interface de usuário para interagir com uma API RESTful que possui serviços CRUD para as principais entidades do site, com persistência de dados em um banco de dados PostgreSQL.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **npm** (Node Package Manager)
- Frameworks/Bibliotecas (ex: Vue.js, React, etc.)

### Backend
- **Java 21** com **Spring Boot**
- **PostgreSQL** como banco de dados
- **Docker** para containerização

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (que inclui o `npm`)
- [Docker](https://www.docker.com/products/docker-desktop/)

> **Atenção:** Certifique-se também de que a porta `5432` da sua máquina esteja livre, pois ela será utilizada pelo container do banco de dados PostgreSQL.

---

## 📦 Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto localmente.

### 1. Clone este Repositório
```bash
# Clone o repositório principal na sua máquina
git clone https://github.com/httpsdinha/trabGCS.git

# Entre na pasta do projeto
cd trabGCS/
```

### 2. Configure e Execute o Backend
O backend é servido via Docker, o que simplifica muito o processo.

```bash
# Navegue até o diretório do backend
cd backend/  # ou o nome da pasta do seu backend

# Suba os containers do Spring Boot e do PostgreSQL
docker-compose up --build
```
Após executar o comando, o Docker fará o download das imagens, construirá os containers e iniciará a API e o banco de dados. O backend estará pronto para receber requisições.

### 3. Configure e Execute o Frontend
Em um **novo terminal**, navegue até a pasta do frontend para instalar as dependências e iniciar o servidor de desenvolvimento.

```bash
# Navegue até o diretório do frontend (a partir da raiz do projeto)
cd frontend/  # ou o nome da pasta do seu frontend

# Instale todas as dependências do projeto
npm install

# Inicie o servidor de desenvolvimento com hot-reload
npm run serve
```

Pronto! Agora a aplicação frontend estará rodando e se comunicando com o backend. Você poderá acessar a interface no endereço fornecido pelo `npm run serve` (geralmente `http://localhost:3000` ou similar).

