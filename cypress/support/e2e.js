// =============================================================================
// ARQUIVO DE SUPORTE GLOBAL — cypress/support/e2e.js
// =============================================================================
// Este arquivo é carregado automaticamente pelo Cypress antes de cada arquivo
// de spec. É o local ideal para:
//   - Importar comandos customizados
//   - Importar plugins de suporte (ex.: reporter)
//   - Configurar comportamentos globais dos testes
// =============================================================================

// Importa os comandos customizados definidos em commands.js
import './commands'

// Registra o reporter de HTML (Mochawesome) para geração de relatórios
import 'cypress-mochawesome-reporter/register'

// -----------------------------------------------------------------------------
// Tratamento global de exceções não capturadas
// -----------------------------------------------------------------------------
// Algumas aplicações lançam erros de JavaScript no console que não afetam
// o comportamento funcional sob teste. A função abaixo previne que o Cypress
// falhe o teste por causa desses erros externos à lógica testada.
// ATENÇÃO: Use com critério — erros relevantes à funcionalidade devem falhar.
// -----------------------------------------------------------------------------
Cypress.on('uncaught:exception', (err) => {
    // Lista de erros conhecidos da aplicação que podem ser ignorados com segurança
    const ignoredErrors = [
        'ResizeObserver loop limit exceeded',
        'Script error',
    ]

    const shouldIgnore = ignoredErrors.some((msg) => err.message.includes(msg))

    // Retornar false impede que o Cypress falhe o teste
    if (shouldIgnore) return false
})
