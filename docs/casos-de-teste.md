# Casos de Teste — SauceDemo E2E

**Projeto:** cypress-saucedemo-qa
**Aplicação:** https://www.saucedemo.com
**Autor:** João Vitor de Souza Lemos
**Total de casos:** 34

---

## Módulo: AUTH — Autenticação

---

### CT-001 — Login com credenciais válidas

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-001 |
| **Módulo** | Auth |
| **Tipo** | Positivo (Happy Path) |
| **Prioridade** | Alta |
| **Arquivo** | `cypress/e2e/auth/login.cy.js` |

**Pré-condições:**
- Usuário `standard_user` existe e não está bloqueado
- Aplicação acessível

**Passos:**
1. Acessar https://www.saucedemo.com
2. Preencher o campo "Username" com `standard_user`
3. Preencher o campo "Password" com `secret_sauce`
4. Clicar no botão "Login"

**Resultado Esperado:**
- Usuário é redirecionado para `/inventory.html`
- Título da página exibe "Products"

---

### CT-002 — Login com usuário inexistente

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-002 |
| **Módulo** | Auth |
| **Tipo** | Negativo |
| **Prioridade** | Alta |

**Passos:**
1. Acessar a página de login
2. Preencher "Username" com `usuario_invalido`
3. Preencher "Password" com `senha_errada`
4. Clicar em "Login"

**Resultado Esperado:**
- Mensagem de erro visível: "Username and password do not match"
- URL permanece na raiz (não redireciona)

---

### CT-003 — Login com senha incorreta

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-003 |
| **Módulo** | Auth |
| **Tipo** | Negativo |
| **Prioridade** | Alta |

**Passos:**
1. Acessar a página de login
2. Preencher "Username" com `standard_user`
3. Preencher "Password" com `senha_errada_123`
4. Clicar em "Login"

**Resultado Esperado:**
- Mensagem de erro: "Username and password do not match"

---

### CT-004 — Login com campos vazios

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-004 |
| **Módulo** | Auth |
| **Tipo** | Negativo |
| **Prioridade** | Média |

**Passos:**
1. Acessar a página de login
2. Não preencher nenhum campo
3. Clicar em "Login"

**Resultado Esperado:**
- Mensagem de erro: "Username is required"

---

### CT-005 — Login sem senha

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-005 |
| **Módulo** | Auth |
| **Tipo** | Negativo |
| **Prioridade** | Média |

**Passos:**
1. Acessar a página de login
2. Preencher "Username" com `standard_user`
3. Deixar "Password" em branco
4. Clicar em "Login"

**Resultado Esperado:**
- Mensagem de erro: "Password is required"

---

### CT-006 — Login com usuário bloqueado

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-006 |
| **Módulo** | Auth |
| **Tipo** | Negativo |
| **Prioridade** | Alta |

**Passos:**
1. Preencher "Username" com `locked_out_user`
2. Preencher "Password" com `secret_sauce`
3. Clicar em "Login"

**Resultado Esperado:**
- Mensagem de erro: "Sorry, this user has been locked out"

---

### CT-007 — Exibição dos elementos do formulário

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-007 |
| **Módulo** | Auth |
| **Tipo** | Interface |
| **Prioridade** | Baixa |

**Passos:**
1. Acessar a página de login

**Resultado Esperado:**
- Campo "Username" visível
- Campo "Password" visível
- Botão "Login" visível com valor "Login"

---

### CT-008 — Campo senha com máscara

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-008 |
| **Módulo** | Auth |
| **Tipo** | Interface / Segurança |
| **Prioridade** | Média |

**Passos:**
1. Acessar a página de login
2. Inspecionar o campo "Password"

**Resultado Esperado:**
- O atributo `type` do campo senha é `"password"` (texto mascarado)

---

## Módulo: PRODUCTS — Produtos

---

### CT-009 — Exibir 6 produtos no inventário

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-009 |
| **Módulo** | Products |
| **Tipo** | Positivo |
| **Prioridade** | Alta |

**Pré-condições:** Usuário autenticado

**Passos:**
1. Acessar `/inventory.html`

**Resultado Esperado:**
- Título "Products" visível
- Exatamente 6 produtos exibidos

---

### CT-010 — Verificar elementos individuais de cada produto

| Campo | Detalhe |
|-------|---------|
| **ID** | CT-010 |
| **Tipo** | Interface |
| **Prioridade** | Média |

**Resultado Esperado:**
- Cada produto exibe: nome, preço e botão "Add to cart"

---

### CT-011 a CT-014 — Ordenação de produtos

| ID | Ordenação | Resultado Esperado |
|----|-----------|-------------------|
| CT-011 | A → Z | Nomes em ordem alfabética crescente |
| CT-012 | Z → A | Nomes em ordem alfabética decrescente |
| CT-013 | Preço ↑ | Preços em ordem crescente ($7.99 → $49.99) |
| CT-014 | Preço ↓ | Preços em ordem decrescente ($49.99 → $7.99) |

---

### CT-015 — Adicionar 1 produto ao carrinho

**Passos:**
1. Clicar em "Add to cart" no produto "Sauce Labs Backpack"

**Resultado Esperado:**
- Badge do carrinho exibe "1"

---

### CT-016 — Adicionar múltiplos produtos

**Passos:**
1. Adicionar "Sauce Labs Backpack", "Sauce Labs Bike Light" e "Sauce Labs Bolt T-Shirt"

**Resultado Esperado:**
- Badge do carrinho exibe "3"

---

### CT-017 — Botão muda para "Remove" após adição

**Resultado Esperado:**
- Botão exibe "Add to cart" antes do clique
- Botão exibe "Remove" após o clique

---

### CT-018 — Remover produto da listagem

**Resultado Esperado:**
- Badge some do carrinho após remoção
- Botão volta a exibir "Add to cart"

---

### CT-019 — Logout pelo menu lateral

**Passos:**
1. Clicar no ícone de menu (☰)
2. Clicar em "Logout"

**Resultado Esperado:**
- Redirecionado para `https://www.saucedemo.com/`
- Botão "Login" visível

---

## Módulo: CART — Carrinho

---

### CT-020 a CT-025 — Carrinho de Compras

| ID | Cenário | Resultado Esperado |
|----|---------|-------------------|
| CT-020 | Carrinho vazio | Nenhum item listado |
| CT-021 | 1 produto adicionado | 1 item, nome correto |
| CT-022 | 2 produtos adicionados | 2 itens, ambos presentes |
| CT-023 | Remover 1 produto (único) | Carrinho vazio |
| CT-024 | Remover 1 de 2 produtos | 1 item restante (o não removido) |
| CT-025 | "Continue Shopping" | Retorna à página de produtos |

---

## Módulo: CHECKOUT — Finalização de Compra

---

### CT-026 — Avançar ao Step 2 com dados válidos

**Pré-condições:** 1 produto no carrinho; usuário na tela do carrinho

**Passos:**
1. Clicar em "Checkout"
2. Preencher: First Name = "João", Last Name = "Lemos", Postal Code = "08230030"
3. Clicar em "Continue"

**Resultado Esperado:**
- URL contém `/checkout-step-two`
- Título exibe "Checkout: Overview"

---

### CT-027 a CT-029 — Validação de campos obrigatórios no Step 1

| ID | Campo omitido | Mensagem de erro esperada |
|----|--------------|--------------------------|
| CT-027 | First Name | "First Name is required" |
| CT-028 | Last Name | "Last Name is required" |
| CT-029 | Postal Code | "Postal Code is required" |

---

### CT-030 — Cancelar no Step 1

**Resultado Esperado:**
- Retorna à página do carrinho (`/cart.html`)

---

### CT-031 — Exibir resumo no Step 2

**Resultado Esperado:**
- Nome do produto visível
- Subtotal, Tax e Total exibidos

---

### CT-032 — Cálculo do total (subtotal + tax)

**Resultado Esperado:**
- Total = Subtotal + Tax (tolerância de $0.01)

---

### CT-033 — Finalizar pedido com sucesso

**Resultado Esperado:**
- URL contém `/checkout-complete`
- Exibe "Thank you for your order!"

---

### CT-034 — Retornar aos produtos após pedido

**Resultado Esperado:**
- Clique em "Back Home" redireciona para `/inventory.html`
- Título "Products" visível
