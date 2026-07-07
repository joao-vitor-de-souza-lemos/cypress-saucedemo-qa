# Plano de Teste — SauceDemo E2E
**Versão:** 1.0
**Data:** 2026-07-06
**Autor:** João Vitor de Souza Lemos
**Projeto:** cypress-saucedemo-qa

---

## 1. Introdução

Este documento descreve o plano de teste para a aplicação **SauceDemo** (https://www.saucedemo.com), uma aplicação web de demonstração de e-commerce utilizada para fins de prática em automação de testes. O objetivo é garantir que os principais fluxos de negócio funcionem corretamente por meio de testes automatizados de ponta a ponta (E2E).

---

## 2. Escopo

### 2.1 Dentro do Escopo

| Módulo | Funcionalidades |
|--------|----------------|
| **Autenticação** | Login, logout, validação de campos, usuário bloqueado |
| **Produtos** | Listagem, ordenação (A-Z, Z-A, preço), exibição de detalhes |
| **Carrinho** | Adição, remoção, visualização, persistência de itens |
| **Checkout** | Preenchimento de dados, validação de campos, resumo do pedido, confirmação |

### 2.2 Fora do Escopo

- Testes de performance e carga
- Testes de segurança (penetration testing)
- Testes de acessibilidade (WCAG)
- Testes de API (backend não exposto)
- Testes mobile (apenas desktop/responsivo)

---

## 3. Objetivos

1. Verificar que os fluxos críticos de negócio (happy paths) funcionam corretamente.
2. Verificar que os campos obrigatórios possuem validação adequada (negative tests).
3. Garantir a integridade do cálculo de valores no checkout.
4. Detectar regressões em futuras alterações da aplicação.
5. Documentar o comportamento esperado da aplicação.

---

## 4. Estratégia de Teste

### 4.1 Tipo de Teste

**Teste End-to-End (E2E):** simulação de fluxos reais de usuário no navegador, do início ao fim, sem mocks ou stubs da interface.

### 4.2 Abordagem

- **Black-box testing:** os testes validam o comportamento visível ao usuário, sem acesso ao código-fonte da aplicação.
- **Data-driven:** dados de teste externalizados em fixtures (`.json`), desacoplados do código dos testes.
- **Page Object Model (POM):** separação entre lógica de interação (pages) e lógica de verificação (specs).

### 4.3 Ambiente

| Item | Detalhe |
|------|---------|
| **AUT (App Under Test)** | https://www.saucedemo.com |
| **Framework de automação** | Cypress 13.x |
| **Linguagem** | JavaScript (ES Modules) |
| **Browsers (CI)** | Google Chrome, Mozilla Firefox |
| **Browser (local)** | Google Chrome (padrão) |
| **Sistema operacional** | Windows 10+ / Ubuntu (CI) |
| **Node.js** | >= 18 (LTS) |

---

## 5. Critérios de Entrada e Saída

### 5.1 Critérios de Entrada (para iniciar os testes)

- [ ] Ambiente de teste acessível (https://www.saucedemo.com respondendo)
- [ ] Dependências instaladas (`npm ci` executado com sucesso)
- [ ] Todos os arquivos de spec presentes no repositório
- [ ] Credenciais de teste válidas documentadas nas fixtures

### 5.2 Critérios de Saída (para encerrar os testes)

- [ ] Todos os 34 casos de teste executados
- [ ] Taxa de aprovação >= 100% nos happy paths
- [ ] Bugs críticos (Severity 1) zerados
- [ ] Relatório de testes gerado e disponível

---

## 6. Casos de Teste — Resumo

| ID | Módulo | Cenário | Tipo |
|----|--------|---------|------|
| CT-001 | Auth | Login com credenciais válidas | Positivo |
| CT-002 | Auth | Login com usuário inválido | Negativo |
| CT-003 | Auth | Login com senha incorreta | Negativo |
| CT-004 | Auth | Login com campos vazios | Negativo |
| CT-005 | Auth | Login sem senha | Negativo |
| CT-006 | Auth | Login com usuário bloqueado | Negativo |
| CT-007 | Auth | Exibição dos elementos do formulário | Interface |
| CT-008 | Auth | Campo senha com máscara | Interface |
| CT-009 | Products | Exibir 6 produtos no inventário | Positivo |
| CT-010 | Products | Verificar elementos por produto | Interface |
| CT-011 | Products | Ordenar A → Z | Positivo |
| CT-012 | Products | Ordenar Z → A | Positivo |
| CT-013 | Products | Ordenar por preço (menor → maior) | Positivo |
| CT-014 | Products | Ordenar por preço (maior → menor) | Positivo |
| CT-015 | Products | Adicionar 1 produto ao carrinho | Positivo |
| CT-016 | Products | Adicionar múltiplos produtos | Positivo |
| CT-017 | Products | Botão muda para "Remove" após adição | Interface |
| CT-018 | Products | Remover produto da listagem | Positivo |
| CT-019 | Products | Logout pelo menu lateral | Positivo |
| CT-020 | Cart | Acessar carrinho vazio | Positivo |
| CT-021 | Cart | Exibir produto adicionado no carrinho | Positivo |
| CT-022 | Cart | Exibir múltiplos produtos no carrinho | Positivo |
| CT-023 | Cart | Remover produto do carrinho | Positivo |
| CT-024 | Cart | Manter outros produtos ao remover um | Positivo |
| CT-025 | Cart | Voltar à listagem via "Continue Shopping" | Positivo |
| CT-026 | Checkout | Avançar ao Step 2 com dados válidos | Positivo |
| CT-027 | Checkout | Erro ao omitir First Name | Negativo |
| CT-028 | Checkout | Erro ao omitir Last Name | Negativo |
| CT-029 | Checkout | Erro ao omitir Postal Code | Negativo |
| CT-030 | Checkout | Cancelar no Step 1 | Positivo |
| CT-031 | Checkout | Exibir resumo no Step 2 | Positivo |
| CT-032 | Checkout | Cálculo correto do total (subtotal + tax) | Positivo |
| CT-033 | Checkout | Finalizar pedido com sucesso | Positivo |
| CT-034 | Checkout | Voltar aos produtos após pedido finalizado | Positivo |

**Total: 34 casos de teste**

---

## 7. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Indisponibilidade do SauceDemo | Baixa | Alto | Retry automático no CI; monitoramento |
| Mudanças de seletores CSS/data-test | Baixa | Alto | Uso de `data-test` attributes (mais estáveis) |
| Flakiness por timing | Média | Médio | `defaultCommandTimeout: 10s` + `retries: 1` |
| Falhas no Chrome (browser-specific) | Baixa | Médio | Matriz de browsers no CI (Chrome + Firefox) |

---

## 8. Responsáveis

| Papel | Responsável |
|-------|------------|
| QA Engineer | João Vitor de Souza Lemos |
| Revisão do plano | João Vitor de Souza Lemos |

---

## 9. Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| 1.0 | 2026-07-06 | Versão inicial do plano de teste | João Vitor de Souza Lemos |
