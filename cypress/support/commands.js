// =============================================================================
// CUSTOM COMMANDS — cypress/support/commands.js
// =============================================================================
// Este arquivo define comandos customizados que estendem o Cypress.
// Comandos customizados evitam repetição de código (DRY - Don't Repeat Yourself)
// e tornam os testes mais legíveis e fáceis de manter.
//
// Para usar nos testes: cy.nomeDoComando(args)
// =============================================================================

// -----------------------------------------------------------------------------
// cy.login(username, password)
// -----------------------------------------------------------------------------
// Realiza autenticação utilizando cy.session() para cache de sessão.
// cy.session() é uma best practice do Cypress: após o primeiro login bem-
// sucedido, a sessão (cookies e localStorage) é salva em cache e reutilizada
// nos testes seguintes, tornando a suíte significativamente mais rápida.
// -----------------------------------------------------------------------------
Cypress.Commands.add('login', (username, password) => {
    cy.session(
        [username, password], // Chave única da sessão: combina usuário + senha
        () => {
            // Corpo da sessão: executado apenas na primeira vez (ou após invalidação)
            cy.visit('/')
            cy.get('[data-test="username"]').type(username)
            cy.get('[data-test="password"]').type(password)
            cy.get('[data-test="login-button"]').click()
            // Valida que o login foi bem-sucedido antes de salvar a sessão
            cy.url().should('include', '/inventory')
        },
        {
            validate() {
                // Revalida a sessão verificando se o cookie de sessão ainda existe
                cy.getCookie('session-username').should('exist')
            },
        }
    )
})

// -----------------------------------------------------------------------------
// cy.addToCart(productName)
// -----------------------------------------------------------------------------
// Adiciona um produto ao carrinho pela página de listagem.
// Navega pelo contexto do produto via .parents() para encontrar o botão correto,
// garantindo que apenas o produto com o nome exato seja clicado.
// -----------------------------------------------------------------------------
Cypress.Commands.add('addToCart', (productName) => {
    cy.contains('.inventory_item_name', productName)
      .parents('.inventory_item')
      .find('button')
      .should('have.text', 'Add to cart')
      .click()
})

// -----------------------------------------------------------------------------
// cy.completeCheckout(firstName, lastName, postalCode)
// -----------------------------------------------------------------------------
// Executa todo o fluxo de checkout do carrinho até a confirmação do pedido.
// Útil para testes que precisam de um pedido finalizado como pré-condição,
// sem que esse processo seja o foco do cenário de teste.
// -----------------------------------------------------------------------------
Cypress.Commands.add('completeCheckout', (firstName, lastName, postalCode) => {
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', '/checkout-complete')
})
