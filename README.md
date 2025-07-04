# 🍳 Projeto CookBook (Full-Stack)

Bem-vindo ao CookBook! Este repositório contém o código-fonte completo do projeto, incluindo o **Frontend** (em Vue.js/npm) e o **Backend** (em Java/Spring Boot).

O projeto contempla uma interface de usuário para interagir com uma API RESTful que possui serviços CRUD para as principais entidades do site, com persistência de dados em um banco de dados PostgreSQL.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- *npm* (Node Package Manager)
- Frameworks/Bibliotecas (ex: Vue.js, React, etc.)
- **Vuex** para gerenciamento de estado




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

### 2. Configure as Variáveis de Ambiente
**IMPORTANTE:** Antes de executar o projeto, você deve configurar as variáveis de ambiente:

```bash
# Copie o arquivo de exemplo para criar seu arquivo de configuração local
cp .env.example .env

# Edite o arquivo .env com suas configurações específicas
# Use um editor de texto de sua preferência (ex: nano, vim, notepad, VS Code)
notepad .env  # Windows
# ou
nano .env     # Linux/Mac
```

O arquivo `.env` contém as seguintes variáveis que devem ser configuradas:
- `SPRING_DATASOURCE_URL`: URL de conexão com o banco de dados do Spring Boot
- `SPRING_DATASOURCE_USERNAME`: Usuário do banco de dados para Spring Boot
- `SPRING_DATASOURCE_PASSWORD`: Senha do banco de dados para Spring Boot
- `JPA_DATABASE_URL`: URL de conexão com o banco de dados para JPA/Persistence
- `JPA_DATABASE_USERNAME`: Usuário do banco de dados para JPA
- `JPA_DATABASE_PASSWORD`: Senha do banco de dados para JPA
- `SERVER_PORT`: Porta do servidor (padrão: 8080)
- `CORS_ALLOWED_ORIGINS`: Origens permitidas para CORS

> **⚠️ Atenção de Segurança:** O arquivo `.env` contém informações sensíveis e **NÃO deve ser versionado**. Ele já está incluído no `.gitignore` para evitar commits acidentais.

### 3. Configure e Execute o Backend
O backend é servido via Docker, o que simplifica muito o processo.

```bash
# Navegue até o diretório do backend
cd backend/  # ou o nome da pasta do seu backend

# Suba os containers do Spring Boot e do PostgreSQL
docker-compose up --build
```
Após executar o comando, o Docker fará o download das imagens, construirá os containers e iniciará a API e o banco de dados. O backend estará pronto para receber requisições.

### 4. Configure e Execute o Frontend
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

---

## 🔒 Configuração de Segurança

Este projeto implementa boas práticas de segurança para o gerenciamento de credenciais:

### Variáveis de Ambiente
- As credenciais de banco de dados e outras informações sensíveis são gerenciadas através de variáveis de ambiente
- O arquivo `.env` (que contém as credenciais reais) **nunca deve ser commitado** no repositório
- Use sempre o arquivo `.env.example` como modelo para criar seu `.env` local

### Primeiros Passos de Segurança
1. **Sempre** copie `.env.example` para `.env` antes de executar o projeto
2. **Nunca** commite o arquivo `.env` no Git
3. **Mantenha** suas credenciais seguras e não as compartilhe
4. **Use** credenciais diferentes para desenvolvimento, teste e produção

---