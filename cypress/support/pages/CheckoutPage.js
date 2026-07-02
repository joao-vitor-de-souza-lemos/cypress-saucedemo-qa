/**
 * @class CheckoutPage
 * @description Page Object que representa todo o fluxo de checkout da aplicação SauceDemo.
 * Abrange três etapas:
 *   - Step One (/checkout-step-one.html): formulário de dados de entrega
 *   - Step Two (/checkout-step-two.html): resumo e revisão do pedido
 *   - Complete (/checkout-complete.html): confirmação de pedido finalizado
 */
class CheckoutPage {
    // ─── Step One — Seletores ────────────────────────────────────────────────────

    get firstNameInput() {
        return cy.get('[data-test="firstName"]')
    }

    get lastNameInput() {
        return cy.get('[data-test="lastName"]')
    }

    get postalCodeInput() {
        return cy.get('[data-test="postalCode"]')
    }

    get continueButton() {
        return cy.get('[data-test="continue"]')
    }

    get cancelButton() {
        return cy.get('[data-test="cancel"]')
    }

    get stepOneErrorMessage() {
        return cy.get('[data-test="error"]')
    }

    // ─── Step Two — Seletores ────────────────────────────────────────────────────

    get overviewTitle() {
        return cy.get('.title')
    }

    get summaryItems() {
        return cy.get('.cart_item')
    }

    get itemTotal() {
        return cy.get('.summary_subtotal_label')
    }

    get taxAmount() {
        return cy.get('.summary_tax_label')
    }

    get totalAmount() {
        return cy.get('.summary_total_label')
    }

    get finishButton() {
        return cy.get('[data-test="finish"]')
    }

    // ─── Complete — Seletores ────────────────────────────────────────────────────

    get confirmationHeader() {
        return cy.get('.complete-header')
    }

    get confirmationText() {
        return cy.get('.complete-text')
    }

    get backHomeButton() {
        return cy.get('[data-test="back-to-products"]')
    }

    // ─── Step One — Ações ───────────────────────────────────────────────────────

    /**
     * Preenche o campo "First Name".
     * @param {string} name - Primeiro nome
     */
    fillFirstName(name) {
        this.firstNameInput.clear().type(name)
    }

    /**
     * Preenche o campo "Last Name".
     * @param {string} name - Sobrenome
     */
    fillLastName(name) {
        this.lastNameInput.clear().type(name)
    }

    /**
     * Preenche o campo "Postal Code".
     * @param {string} code - CEP / código postal
     */
    fillPostalCode(code) {
        this.postalCodeInput.clear().type(code)
    }

    /**
     * Preenche todos os campos do formulário de entrega de uma só vez.
     * @param {string} firstName - Primeiro nome
     * @param {string} lastName  - Sobrenome
     * @param {string} postalCode - CEP / código postal
     */
    fillShippingInfo(firstName, lastName, postalCode) {
        if (firstName) this.fillFirstName(firstName)
        if (lastName) this.fillLastName(lastName)
        if (postalCode) this.fillPostalCode(postalCode)
    }

    /**
     * Clica no botão "Continue" do Step One.
     */
    clickContinue() {
        this.continueButton.click()
    }

    /**
     * Clica no botão "Cancel" do Step One.
     */
    clickCancel() {
        this.cancelButton.click()
    }

    // ─── Step Two — Ações ───────────────────────────────────────────────────────

    /**
     * Clica no botão "Finish" para finalizar o pedido.
     */
    clickFinish() {
        this.finishButton.click()
    }

    // ─── Complete — Ações ───────────────────────────────────────────────────────

    /**
     * Clica no botão "Back Home" para retornar à página de produtos.
     */
    clickBackHome() {
        this.backHomeButton.click()
    }

    // ─── Asserções ──────────────────────────────────────────────────────────────

    /**
     * Verifica se o usuário está no Step One do checkout.
     */
    shouldBeOnCheckoutStepOne() {
        cy.url().should('include', '/checkout-step-one')
    }

    /**
     * Verifica se o usuário está no Step Two (overview) do checkout.
     */
    shouldBeOnCheckoutStepTwo() {
        cy.url().should('include', '/checkout-step-two')
        this.overviewTitle.should('have.text', 'Checkout: Overview')
    }

    /**
     * Verifica se uma mensagem de erro está visível no Step One.
     * @param {string} message - Texto parcial ou completo da mensagem de erro
     */
    shouldShowErrorMessage(message) {
        this.stepOneErrorMessage
          .should('be.visible')
          .and('contain.text', message)
    }

    /**
     * Verifica se o pedido foi finalizado com sucesso (tela de confirmação).
     */
    shouldShowOrderConfirmation() {
        cy.url().should('include', '/checkout-complete')
        this.confirmationHeader.should('have.text', 'Thank you for your order!')
    }
}

export default new CheckoutPage()
