const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // ─── Configuração do Reporter ──────────────────────────────────────────────
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report — SauceDemo QA',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  // ─── Configuração E2E ─────────────────────────────────────────────────────
  e2e: {
    // URL base da aplicação sob teste
    baseUrl: 'https://www.saucedemo.com',

    // Resolução padrão do viewport (Full HD equivalente para desktop)
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeouts globais (em milissegundos)
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,

    // Configurações de vídeo e screenshot
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Estratégia de retry: 1 tentativa extra no CI, 0 no modo interativo
    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      // Registra o plugin do reporter de HTML
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
  },
})
