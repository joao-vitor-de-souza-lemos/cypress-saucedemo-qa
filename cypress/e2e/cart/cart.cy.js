// =============================================================================
// SUITE DE TESTES — Carrinho de Compras
// Aplicação: SauceDemo (https://www.saucedemo.com)
// Módulo: Cart
// Total de casos de teste: 6
// =============================================================================

import productsPage from '../../support/pages/ProductsPage'
import cartPage from '../../support/pages/CartPage'

describe('CART — Carrinho de Compras', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
        cy.visit('/inventory.html')
    })

    // ---------------------------------------------------------------------------
    // Contexto: Visualização do carrinho
    // ---------------------------------------------------------------------------
    context('Visualização e estado do carrinho', () => {
        it('CT-020 — Deve exibir o carrinho vazio ao acessar sem adicionar produtos', () => {
            productsPage.goToCart()

            cartPage.shouldBeOnCartPage()
            cartPage.shouldBeEmpty()
        })

        it('CT-021 — Deve exibir o produto corretamente ao acessar o carrinho após adicioná-lo', () => {
            productsPage.addProductToCart('Sauce Labs Backpack')
            productsPage.goToCart()

            cartPage.shouldBeOnCartPage()
            cartPage.shouldHaveItemCount(1)
            cartPage.shouldContainProduct('Sauce Labs Backpack')
        })

        it('CT-022 — Deve exibir todos os produtos adicionados ao acessar o carrinho', () => {
            productsPage.addProductToCart('Sauce Labs Backpack')
            productsPage.addProductToCart('Sauce Labs Bike Light')
            productsPage.goToCart()

            cartPage.shouldHaveItemCount(2)
            cartPage.shouldContainProduct('Sauce Labs Backpack')
            cartPage.shouldContainProduct('Sauce Labs Bike Light')
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Remoção de itens
    // ---------------------------------------------------------------------------
    context('Remoção de itens do carrinho', () => {
        it('CT-023 — Deve remover um produto e deixar o carrinho vazio', () => {
            productsPage.addProductToCart('Sauce Labs Backpack')
            productsPage.goToCart()

            cartPage.removeItem('Sauce Labs Backpack')

            cartPage.shouldNotContainProduct('Sauce Labs Backpack')
            cartPage.shouldBeEmpty()
        })

        it('CT-024 — Deve manter outros produtos ao remover apenas um item específico', () => {
            productsPage.addProductToCart('Sauce Labs Backpack')
            productsPage.addProductToCart('Sauce Labs Bike Light')
            productsPage.goToCart()

            cartPage.removeItem('Sauce Labs Backpack')

            cartPage.shouldHaveItemCount(1)
            cartPage.shouldContainProduct('Sauce Labs Bike Light')
            cartPage.shouldNotContainProduct('Sauce Labs Backpack')
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Navegação a partir do carrinho
    // ---------------------------------------------------------------------------
    context('Navegação', () => {
        it('CT-025 — Deve retornar à página de produtos ao clicar em "Continue Shopping"', () => {
            productsPage.goToCart()

            cartPage.clickContinueShopping()

            productsPage.shouldBeOnProductsPage()
        })
    })
})
