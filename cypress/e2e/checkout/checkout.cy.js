// =============================================================================
// SUITE DE TESTES — Processo de Checkout (Compra)
// Aplicação: SauceDemo (https://www.saucedemo.com)
// Módulo: Checkout
// Total de casos de teste: 9
// =============================================================================

import productsPage from '../../support/pages/ProductsPage'
import cartPage from '../../support/pages/CartPage'
import checkoutPage from '../../support/pages/CheckoutPage'

describe('CHECKOUT — Processo de Finalização de Compra', () => {
    // Pré-condição global: login + adicionar produto + ir ao carrinho
    beforeEach(function () {
        cy.fixture('checkout').as('checkout')
        cy.login('standard_user', 'secret_sauce')
        cy.visit('/inventory.html')
        productsPage.addProductToCart('Sauce Labs Backpack')
        productsPage.goToCart()
    })

    // ---------------------------------------------------------------------------
    // Contexto: Etapa 1 — Formulário de dados pessoais/entrega
    // ---------------------------------------------------------------------------
    context('Step One — Dados de entrega', () => {
        it('CT-026 — Deve avançar para o Step Two com todos os dados preenchidos', function () {
            cartPage.clickCheckout()
            checkoutPage.shouldBeOnCheckoutStepOne()

            checkoutPage.fillShippingInfo(
                this.checkout.validCustomer.firstName,
                this.checkout.validCustomer.lastName,
                this.checkout.validCustomer.postalCode
            )
            checkoutPage.clickContinue()

            checkoutPage.shouldBeOnCheckoutStepTwo()
        })

        it('CT-027 — Deve exibir erro de validação ao omitir o campo "First Name"', () => {
            cartPage.clickCheckout()
            checkoutPage.clickContinue()

            checkoutPage.shouldShowErrorMessage('First Name is required')
        })

        it('CT-028 — Deve exibir erro de validação ao omitir o campo "Last Name"', function () {
            cartPage.clickCheckout()
            checkoutPage.fillFirstName(this.checkout.validCustomer.firstName)
            checkoutPage.clickContinue()

            checkoutPage.shouldShowErrorMessage('Last Name is required')
        })

        it('CT-029 — Deve exibir erro de validação ao omitir o campo "Postal Code"', function () {
            cartPage.clickCheckout()
            checkoutPage.fillFirstName(this.checkout.validCustomer.firstName)
            checkoutPage.fillLastName(this.checkout.validCustomer.lastName)
            checkoutPage.clickContinue()

            checkoutPage.shouldShowErrorMessage('Postal Code is required')
        })

        it('CT-030 — Deve cancelar o checkout e retornar ao carrinho', () => {
            cartPage.clickCheckout()
            checkoutPage.shouldBeOnCheckoutStepOne()

            checkoutPage.clickCancel()

            cartPage.shouldBeOnCartPage()
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Etapa 2 — Revisão e resumo do pedido
    // ---------------------------------------------------------------------------
    context('Step Two — Resumo do pedido', () => {
        // Pré-condição específica: preencher Step One para chegar ao Step Two
        beforeEach(function () {
            cartPage.clickCheckout()
            checkoutPage.fillShippingInfo(
                this.checkout.validCustomer.firstName,
                this.checkout.validCustomer.lastName,
                this.checkout.validCustomer.postalCode
            )
            checkoutPage.clickContinue()
        })

        it('CT-031 — Deve exibir o produto, subtotal, taxa e total no resumo do pedido', () => {
            cy.contains('Sauce Labs Backpack').should('be.visible')
            checkoutPage.itemTotal.should('be.visible')
            checkoutPage.taxAmount.should('be.visible')
            checkoutPage.totalAmount.should('be.visible')
        })

        it('CT-032 — O valor total deve corresponder à soma do subtotal com o imposto', () => {
            checkoutPage.itemTotal.invoke('text').then((subtotalText) => {
                checkoutPage.taxAmount.invoke('text').then((taxText) => {
                    checkoutPage.totalAmount.invoke('text').then((totalText) => {
                        const subtotal = parseFloat(subtotalText.replace('Item total: $', ''))
                        const tax = parseFloat(taxText.replace('Tax: $', ''))
                        const total = parseFloat(totalText.replace('Total: $', ''))

                        // Usa closeTo para comparação com ponto flutuante (tolerância de $0.01)
                        expect(total).to.be.closeTo(subtotal + tax, 0.01)
                    })
                })
            })
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Etapa 3 — Confirmação e conclusão do pedido
    // ---------------------------------------------------------------------------
    context('Confirmação do pedido', () => {
        it('CT-033 — Deve finalizar o pedido e exibir a tela de confirmação', function () {
            cartPage.clickCheckout()
            checkoutPage.fillShippingInfo(
                this.checkout.validCustomer.firstName,
                this.checkout.validCustomer.lastName,
                this.checkout.validCustomer.postalCode
            )
            checkoutPage.clickContinue()
            checkoutPage.clickFinish()

            checkoutPage.shouldShowOrderConfirmation()
        })

        it('CT-034 — Deve retornar à página de produtos ao clicar em "Back Home"', function () {
            cartPage.clickCheckout()
            checkoutPage.fillShippingInfo(
                this.checkout.validCustomer.firstName,
                this.checkout.validCustomer.lastName,
                this.checkout.validCustomer.postalCode
            )
            checkoutPage.clickContinue()
            checkoutPage.clickFinish()
            checkoutPage.shouldShowOrderConfirmation()

            checkoutPage.clickBackHome()

            productsPage.shouldBeOnProductsPage()
        })
    })
})
