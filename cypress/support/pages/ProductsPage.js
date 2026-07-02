/**
 * @class ProductsPage
 * @description Page Object que representa a página de listagem de produtos
 * da aplicação SauceDemo (/inventory.html).
 * Centraliza todos os seletores e ações relacionados ao catálogo de produtos.
 */
class ProductsPage {
    // ─── Seletores (Getters) ────────────────────────────────────────────────────

    get pageTitle() {
        return cy.get('.title')
    }

    get productItems() {
        return cy.get('.inventory_item')
    }

    get productNames() {
        return cy.get('.inventory_item_name')
    }

    get productPrices() {
        return cy.get('.inventory_item_price')
    }

    get sortDropdown() {
        return cy.get('[data-test="product_sort_container"]')
    }

    get cartIcon() {
        return cy.get('.shopping_cart_link')
    }

    get cartBadge() {
        return cy.get('.shopping_cart_badge')
    }

    get burgerMenuButton() {
        return cy.get('#react-burger-menu-btn')
    }

    get logoutLink() {
        return cy.get('#logout_sidebar_link')
    }

    get resetAppStateLink() {
        return cy.get('#reset_sidebar_link')
    }

    // ─── Ações ──────────────────────────────────────────────────────────────────

    /**
     * Adiciona um produto ao carrinho a partir da página de listagem.
     * @param {string} productName - Nome exato do produto
     */
    addProductToCart(productName) {
        cy.contains('.inventory_item_name', productName)
          .parents('.inventory_item')
          .find('button')
          .click()
    }

    /**
     * Remove um produto do carrinho a partir da página de listagem.
     * @param {string} productName - Nome exato do produto
     */
    removeProductFromCart(productName) {
        cy.contains('.inventory_item_name', productName)
          .parents('.inventory_item')
          .find('button')
          .click()
    }

    /**
     * Seleciona uma opção de ordenação no dropdown.
     * @param {'az'|'za'|'lohi'|'hilo'} option - Opção de ordenação
     */
    sortBy(option) {
        this.sortDropdown.select(option)
    }

    /**
     * Navega para o carrinho clicando no ícone.
     */
    goToCart() {
        this.cartIcon.click()
    }

    /**
     * Realiza logout pelo menu lateral (burger menu).
     */
    logout() {
        this.burgerMenuButton.click()
        this.logoutLink.click()
    }

    /**
     * Retorna o elemento de preço de um produto específico.
     * @param {string} productName - Nome exato do produto
     * @returns {Cypress.Chainable} - Elemento do preço
     */
    getProductPrice(productName) {
        return cy.contains('.inventory_item_name', productName)
          .parents('.inventory_item')
          .find('.inventory_item_price')
    }

    /**
     * Retorna o botão de ação de um produto específico.
     * @param {string} productName - Nome exato do produto
     * @returns {Cypress.Chainable} - Botão do produto
     */
    getProductButton(productName) {
        return cy.contains('.inventory_item_name', productName)
          .parents('.inventory_item')
          .find('button')
    }

    // ─── Asserções ──────────────────────────────────────────────────────────────

    /**
     * Verifica se a página de produtos está visível.
     */
    shouldBeOnProductsPage() {
        this.pageTitle.should('have.text', 'Products')
        cy.url().should('include', '/inventory')
    }

    /**
     * Verifica se o badge do carrinho exibe o número correto de itens.
     * @param {number} count - Número esperado de itens
     */
    shouldShowCartBadge(count) {
        this.cartBadge.should('be.visible').and('have.text', String(count))
    }

    /**
     * Verifica que o badge do carrinho não está visível (carrinho vazio).
     */
    shouldNotShowCartBadge() {
        this.cartBadge.should('not.exist')
    }
}

export default new ProductsPage()
