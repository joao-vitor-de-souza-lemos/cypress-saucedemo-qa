// =============================================================================
// SUITE DE TESTES — Autenticação (Login)
// Aplicação: SauceDemo (https://www.saucedemo.com)
// Módulo: Auth
// Total de casos de teste: 8
// =============================================================================

import loginPage from '../../support/pages/LoginPage'
import productsPage from '../../support/pages/ProductsPage'

describe('AUTH — Autenticação e Login', () => {
    // Carrega os dados de teste a partir do fixture antes de cada teste
    // IMPORTANTE: usar function() em vez de arrow function para acessar this.users
    beforeEach(function () {
        cy.fixture('users').as('users')
        loginPage.visit()
    })

    // ---------------------------------------------------------------------------
    // Contexto: Login bem-sucedido
    // ---------------------------------------------------------------------------
    context('Login bem-sucedido', () => {
        it('CT-001 — Deve redirecionar para a página de produtos após login válido', function () {
            loginPage.login(this.users.validUser.username, this.users.validUser.password)

            productsPage.shouldBeOnProductsPage()
            cy.url().should('include', '/inventory')
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Login malsucedido (credenciais inválidas)
    // ---------------------------------------------------------------------------
    context('Login com credenciais inválidas', () => {
        it('CT-002 — Deve exibir erro ao usar nome de usuário inexistente', function () {
            loginPage.login(this.users.invalidUser.username, this.users.invalidUser.password)

            loginPage.shouldShowErrorMessage('Username and password do not match')
            cy.url().should('not.include', '/inventory')
        })

        it('CT-003 — Deve exibir erro ao usar senha incorreta para usuário válido', function () {
            loginPage.login(this.users.validUser.username, 'senha_errada_123')

            loginPage.shouldShowErrorMessage('Username and password do not match')
        })

        it('CT-004 — Deve exibir erro ao submeter formulário com ambos os campos vazios', () => {
            loginPage.clickLogin()

            loginPage.shouldShowErrorMessage('Username is required')
        })

        it('CT-005 — Deve exibir erro ao submeter formulário sem a senha', function () {
            loginPage.fillUsername(this.users.validUser.username)
            loginPage.clickLogin()

            loginPage.shouldShowErrorMessage('Password is required')
        })

        it('CT-006 — Deve exibir mensagem específica para usuário bloqueado (locked_out_user)', function () {
            loginPage.login(this.users.lockedUser.username, this.users.lockedUser.password)

            loginPage.shouldShowErrorMessage('Sorry, this user has been locked out')
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Interface e acessibilidade do formulário
    // ---------------------------------------------------------------------------
    context('Interface do formulário de login', () => {
        it('CT-007 — Deve exibir todos os elementos do formulário de login', () => {
            loginPage.usernameInput.should('be.visible')
            loginPage.passwordInput.should('be.visible')
            loginPage.loginButton.should('be.visible').and('have.value', 'Login')
        })

        it('CT-008 — O campo de senha deve ter máscara (type=password)', () => {
            loginPage.passwordInput.should('have.attr', 'type', 'password')
        })
    })
})
