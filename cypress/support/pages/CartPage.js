/**
 * @class CartPage
 * @description Page Object que representa a página do Carrinho de Compras
 * da aplicação SauceDemo (/cart.html).
 * Centraliza todos os seletores e ações relacionados ao carrinho.
 */
class CartPage {
    // ─── Seletores (Getters) ────────────────────────────────────────────────────

    get pageTitle() {
        return cy.get('.title')
    }

    get cartItems() {
        return cy.get('.cart_item')
    }

    get cartItemNames() {
        return cy.get('.inventory_item_name')
    }

    get cartItemPrices() {
        return cy.get('.inventory_item_price')
    }

    get cartItemQuantities() {
        return cy.get('.cart_quantity')
    }

    get checkoutButton() {
        return cy.get('[data-test="checkout"]')
    }

    get continueShoppingButton() {
        return cy.get('[data-test="continue-shopping"]')
    }

    // ─── Ações ──────────────────────────────────────────────────────────────────

    /**
     * Clica no botão "Checkout" para iniciar o processo de compra.
     */
    clickCheckout() {
        this.checkoutButton.click()
    }

    /**
     * Clica no botão "Continue Shopping" para voltar ao catálogo.
     */
    clickContinueShopping() {
        this.continueShoppingButton.click()
    }

    /**
     * Remove um item específico do carrinho.
     * @param {string} productName - Nome exato do produto a ser removido
     */
    removeItem(productName) {
        cy.contains('.inventory_item_name', productName)
          .parents('.cart_item')
          .find('button')
          .click()
    }

    // ─── Asserções ──────────────────────────────────────────────────────────────

    /**
     * Verifica se o usuário está na página do carrinho.
     */
    shouldBeOnCartPage() {
        this.pageTitle.should('have.text', 'Your Cart')
        cy.url().should('include', '/cart')
    }

    /**
     * Verifica a quantidade exata de itens no carrinho.
     * @param {number} count - Número esperado de itens
     */
    shouldHaveItemCount(count) {
        this.cartItems.should('have.length', count)
    }

    /**
     * Verifica se um produto específico está no carrinho.
     * @param {string} productName - Nome do produto esperado
     */
    shouldContainProduct(productName) {
        this.cartItemNames.should('contain.text', productName)
    }

    /**
     * Verifica se um produto não está mais no carrinho.
     * @param {string} productName - Nome do produto que não deve existir
     */
    shouldNotContainProduct(productName) {
        this.cartItemNames.should('not.contain.text', productName)
    }

    /**
     * Verifica se o carrinho está completamente vazio.
     */
    shouldBeEmpty() {
        this.cartItems.should('not.exist')
    }
}

export default new CartPage()
