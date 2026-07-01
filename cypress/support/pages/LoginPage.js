/**
 * @class LoginPage
 * @description Page Object que representa a página de Login da aplicação SauceDemo.
 * Centraliza todos os seletores e ações relacionados à autenticação,
 * garantindo que alterações na UI afetem apenas este arquivo.
 */
class LoginPage {
    // ─── Seletores (Getters) ────────────────────────────────────────────────────
    // Os atributos data-test são os seletores mais estáveis para testes E2E,
    // pois não dependem de classes CSS ou estrutura do DOM.

    get usernameInput() {
        return cy.get('[data-test="username"]')
    }

    get passwordInput() {
        return cy.get('[data-test="password"]')
    }

    get loginButton() {
        return cy.get('[data-test="login-button"]')
    }

    get errorMessage() {
        return cy.get('[data-test="error"]')
    }

    get errorCloseButton() {
        return cy.get('[data-test="error"] button')
    }

    // ─── Ações ──────────────────────────────────────────────────────────────────

    /**
     * Navega para a página de login (rota raiz da baseUrl).
     */
    visit() {
        cy.visit('/')
    }

    /**
     * Preenche o campo de usuário.
     * @param {string} username - Nome do usuário
     */
    fillUsername(username) {
        this.usernameInput.clear().type(username)
    }

    /**
     * Preenche o campo de senha.
     * @param {string} password - Senha do usuário
     */
    fillPassword(password) {
        this.passwordInput.clear().type(password)
    }

    /**
     * Clica no botão de login.
     */
    clickLogin() {
        this.loginButton.click()
    }

    /**
     * Executa o fluxo completo de login (preencher + submeter).
     * @param {string} username - Nome do usuário
     * @param {string} password - Senha do usuário
     */
    login(username, password) {
        this.fillUsername(username)
        this.fillPassword(password)
        this.clickLogin()
    }

    // ─── Asserções ──────────────────────────────────────────────────────────────

    /**
     * Verifica se a mensagem de erro está visível e contém o texto esperado.
     * @param {string} message - Texto parcial ou completo da mensagem de erro
     */
    shouldShowErrorMessage(message) {
        this.errorMessage
          .should('be.visible')
          .and('contain.text', message)
    }
}

export default new LoginPage()
