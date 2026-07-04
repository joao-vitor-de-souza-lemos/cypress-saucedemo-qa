// =============================================================================
// SUITE DE TESTES — Produtos (Listagem, Ordenação e Carrinho)
// Aplicação: SauceDemo (https://www.saucedemo.com)
// Módulo: Products
// Total de casos de teste: 11
// =============================================================================

import productsPage from '../../support/pages/ProductsPage'
import loginPage from '../../support/pages/LoginPage'

describe('PRODUCTS — Listagem, Ordenação e Gestão do Carrinho', () => {
    // Utiliza cy.login() com cy.session() para cachear a autenticação.
    // O login só será executado de fato UMA VEZ (ou ao expirar a sessão),
    // tornando a suíte significativamente mais rápida.
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
        cy.visit('/inventory.html')
    })

    // ---------------------------------------------------------------------------
    // Contexto: Listagem de produtos
    // ---------------------------------------------------------------------------
    context('Listagem de produtos', () => {
        it('CT-009 — Deve exibir exatamente 6 produtos na página de inventário', () => {
            productsPage.shouldBeOnProductsPage()
            productsPage.productItems.should('have.length', 6)
        })

        it('CT-010 — Cada produto deve exibir nome, preço e botão "Add to cart"', () => {
            productsPage.productItems.each(($item) => {
                cy.wrap($item).find('.inventory_item_name').should('be.visible')
                cy.wrap($item).find('.inventory_item_price').should('be.visible')
                cy.wrap($item)
                  .find('button')
                  .should('be.visible')
                  .and('have.text', 'Add to cart')
            })
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Ordenação de produtos
    // ---------------------------------------------------------------------------
    context('Ordenação de produtos', () => {
        it('CT-011 — Deve ordenar os produtos por nome de A → Z', () => {
            productsPage.sortBy('az')

            productsPage.productNames.then(($els) => {
                const names = [...$els].map((el) => el.innerText)
                const sortedNames = [...names].sort()
                expect(names).to.deep.equal(sortedNames)
            })
        })

        it('CT-012 — Deve ordenar os produtos por nome de Z → A', () => {
            productsPage.sortBy('za')

            productsPage.productNames.then(($els) => {
                const names = [...$els].map((el) => el.innerText)
                const sortedNames = [...names].sort().reverse()
                expect(names).to.deep.equal(sortedNames)
            })
        })

        it('CT-013 — Deve ordenar os produtos por preço do menor para o maior', () => {
            productsPage.sortBy('lohi')

            productsPage.productPrices.then(($els) => {
                const prices = [...$els].map((el) =>
                    parseFloat(el.innerText.replace('$', ''))
                )
                const sortedPrices = [...prices].sort((a, b) => a - b)
                expect(prices).to.deep.equal(sortedPrices)
            })
        })

        it('CT-014 — Deve ordenar os produtos por preço do maior para o menor', () => {
            productsPage.sortBy('hilo')

            productsPage.productPrices.then(($els) => {
                const prices = [...$els].map((el) =>
                    parseFloat(el.innerText.replace('$', ''))
                )
                const sortedPrices = [...prices].sort((a, b) => b - a)
                expect(prices).to.deep.equal(sortedPrices)
            })
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Adição e remoção de produtos pelo carrinho
    // ---------------------------------------------------------------------------
    context('Gestão de itens no carrinho (via página de produtos)', () => {
        it('CT-015 — Deve adicionar um produto e exibir badge "1" no carrinho', () => {
            productsPage.addProductToCart('Sauce Labs Backpack')

            productsPage.shouldShowCartBadge(1)
        })

        it('CT-016 — Deve adicionar múltiplos produtos e atualizar o badge corretamente', () => {
            productsPage.addProductToCart('Sauce Labs Backpack')
            productsPage.addProductToCart('Sauce Labs Bike Light')
            productsPage.addProductToCart('Sauce Labs Bolt T-Shirt')

            productsPage.shouldShowCartBadge(3)
        })

        it('CT-017 — O botão deve mudar de "Add to cart" para "Remove" ao adicionar o produto', () => {
            productsPage.getProductButton('Sauce Labs Backpack')
              .should('have.text', 'Add to cart')
              .click()
              .should('have.text', 'Remove')
        })

        it('CT-018 — Deve remover produto do carrinho diretamente na listagem', () => {
            productsPage.addProductToCart('Sauce Labs Backpack')
            productsPage.shouldShowCartBadge(1)

            productsPage.removeProductFromCart('Sauce Labs Backpack')

            productsPage.shouldNotShowCartBadge()
            productsPage.getProductButton('Sauce Labs Backpack')
              .should('have.text', 'Add to cart')
        })
    })

    // ---------------------------------------------------------------------------
    // Contexto: Logout
    // ---------------------------------------------------------------------------
    context('Logout', () => {
        it('CT-019 — Deve realizar logout e redirecionar para a tela de login', () => {
            productsPage.logout()

            cy.url().should('eq', 'https://www.saucedemo.com/')
            loginPage.loginButton.should('be.visible')
        })
    })
})
