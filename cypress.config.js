import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: ('https://example.cypress.io/'),
    viewportWidth: 1366,
    viewportHeight: 768,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
});
