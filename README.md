<div align="center">

# 🧪 Cypress SauceDemo QA

**Projeto completo de Quality Assurance com automação de testes E2E**

[![Cypress](https://img.shields.io/badge/Cypress-13.x-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2021-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Sobre o Projeto](#-sobre-o-projeto) •
[Tecnologias](#-tecnologias) •
[Estrutura](#-estrutura-do-projeto) •
[Como Executar](#-como-executar) •
[Documentação QA](#-documentação-qa) •
[Autor](#-autor)

</div>

---

## 📋 Sobre o Projeto

Este repositório contém um projeto completo de **Quality Assurance (QA)** com foco em automação de testes **End-to-End (E2E)** para a aplicação [SauceDemo](https://www.saucedemo.com) — um e-commerce de demonstração amplamente utilizado para prática de automação.

### O que torna este projeto completo em QA?

Além da automação dos testes, o projeto contempla os principais artefatos de uma equipe de QA profissional:

- ✅ **34 casos de teste automatizados** cobrindo os 4 módulos principais
- ✅ **Page Object Model (POM)** para código limpo e manutenível
- ✅ **Fixtures** para gestão de dados de teste desacoplados do código
- ✅ **Custom Commands** com `cy.session()` para cache de autenticação
- ✅ **CI/CD com GitHub Actions** executando em Chrome e Firefox em paralelo
- ✅ **Relatório HTML** gerado automaticamente com Mochawesome
- ✅ **Plano de Teste** documentado com escopo, estratégia e análise de risco
- ✅ **Catálogo de Casos de Teste** com os 34 cenários descritos

---

## 🛠 Tecnologias

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| [Cypress](https://www.cypress.io/) | 13.x | Framework de testes E2E |
| JavaScript (ES Modules) | ES2021 | Linguagem de programação |
| [cypress-mochawesome-reporter](https://github.com/LasKKit/cypress-mochawesome-reporter) | 3.x | Relatório HTML interativo |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD (Chrome + Firefox em paralelo) |
| Node.js | >= 18 | Runtime JavaScript |

---

## 📁 Estrutura do Projeto

```
cypress-saucedemo-qa/
├── .github/
│   └── workflows/
│       └── cypress-tests.yml       # Pipeline CI/CD (GitHub Actions)
│
├── cypress/
│   ├── e2e/                        # Arquivos de spec (suítes de teste)
│   │   ├── auth/
│   │   │   └── login.cy.js         # 8 casos — Autenticação
│   │   ├── products/
│   │   │   └── products.cy.js      # 11 casos — Listagem e ordenação
│   │   ├── cart/
│   │   │   └── cart.cy.js          # 6 casos — Carrinho de compras
│   │   └── checkout/
│   │       └── checkout.cy.js      # 9 casos — Processo de checkout
│   │
│   ├── fixtures/                   # Dados de teste (JSON)
│   │   ├── users.json              # Credenciais dos usuários de teste
│   │   └── checkout.json           # Dados do formulário de entrega
│   │
│   └── support/
│       ├── commands.js             # Custom Commands (cy.login, cy.addToCart...)
│       ├── e2e.js                  # Configuração global dos testes
│       └── pages/                  # Page Objects (padrão POM)
│           ├── LoginPage.js
│           ├── ProductsPage.js
│           ├── CartPage.js
│           └── CheckoutPage.js
│
├── docs/                           # Documentação QA
│   ├── plano-de-teste.md           # Test Plan completo
│   └── casos-de-teste.md           # Catálogo dos 34 casos de teste
│
├── .gitignore
├── cypress.config.js               # Configuração global do Cypress
├── package.json                    # Dependências e scripts npm
└── README.md
```

---

## 🧩 Módulos e Cenários Testados

| Módulo | Arquivo | Casos | Cobertura |
|--------|---------|-------|-----------|
| 🔐 Autenticação | `auth/login.cy.js` | 8 | Login válido, inválido, bloqueado, campos vazios, UI |
| 📦 Produtos | `products/products.cy.js` | 11 | Listagem, ordenação (4 opções), carrinho, logout |
| 🛒 Carrinho | `cart/cart.cy.js` | 6 | Visualização, remoção, navegação |
| 💳 Checkout | `checkout/checkout.cy.js` | 9 | Formulário, validações, resumo, cálculo, confirmação |
| **Total** | — | **34** | — |

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18 (LTS)
- [Git](https://git-scm.com/)
- Google Chrome ou Firefox instalados

### 1. Clonar o repositório

```bash
git clone https://github.com/joao-vitor-de-souza-lemos/cypress-saucedemo-qa.git
cd cypress-saucedemo-qa
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Executar os testes

| Comando | Descrição |
|---------|-----------|
| `npm run cy:open` | Abre o Cypress em modo interativo (GUI) |
| `npm run cy:run` | Executa todos os testes em modo headless |
| `npm run cy:run:chrome` | Executa no Chrome |
| `npm run cy:run:firefox` | Executa no Firefox |
| `npm run cy:run:auth` | Executa apenas o módulo de autenticação |
| `npm run cy:run:products` | Executa apenas o módulo de produtos |
| `npm run cy:run:cart` | Executa apenas o módulo de carrinho |
| `npm run cy:run:checkout` | Executa apenas o módulo de checkout |

### 4. Verificar o relatório

Após a execução em modo headless, o relatório HTML é gerado em:

```
cypress/reports/index.html
```

---

## 🏗 Padrões e Boas Práticas Aplicados

### Page Object Model (POM)
Cada página da aplicação tem sua própria classe em `cypress/support/pages/`. Os Page Objects encapsulam seletores e ações — uma mudança na UI precisa ser atualizada em apenas um arquivo.

```javascript
// Exemplo: usar o Page Object no teste é limpo e legível
loginPage.login(this.users.validUser.username, this.users.validUser.password)
productsPage.shouldBeOnProductsPage()
```

### Seletores Estáveis com `data-test`
Todos os seletores usam atributos `data-test`, que são mais estáveis do que classes CSS e IDs gerados dinamicamente.

### Cache de Sessão com `cy.session()`
O comando customizado `cy.login()` usa `cy.session()` para armazenar em cache a sessão de autenticação, evitando login repetido e acelerando a suíte completa.

### Fixtures para Dados de Teste
Credenciais e dados de formulário ficam em arquivos JSON na pasta `fixtures/`, separando os dados do código dos testes.

### Retries no CI
Configurado com `retries: { runMode: 1 }` para re-executar testes instáveis automaticamente no CI, aumentando a confiabilidade do pipeline.

---

## ⚙️ CI/CD — GitHub Actions

O pipeline executa automaticamente em cada `push` nas branches `main` e `develop`, e em Pull Requests para `main`.

**Matriz de execução paralela:**
- ✅ Google Chrome
- ✅ Mozilla Firefox

**Artefatos gerados automaticamente:**
- Screenshots (apenas em caso de falha)
- Vídeos dos testes
- Relatório HTML (Mochawesome)

---

## 📄 Documentação QA

| Documento | Descrição |
|-----------|-----------|
| [Plano de Teste](docs/plano-de-teste.md) | Escopo, estratégia, critérios de entrada/saída e análise de risco |
| [Casos de Teste](docs/casos-de-teste.md) | Descrição detalhada dos 34 casos de teste |

---

## 👤 Autor

**João Vitor de Souza Lemos**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-joaolemos2004-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joaolemos2004)
[![GitHub](https://img.shields.io/badge/GitHub-joao--vitor--de--souza--lemos-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/joao-vitor-de-souza-lemos)

QA Engineer em Formação • Estudante de Ciência da Computação (UNICID) • Pós-graduando em Qualidade e Engenharia de Teste de Software (PUC Minas)

---

<div align="center">

Feito com 💙 e muito Cypress

</div>
