import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://qauto2.forstudy.space/",
    viewportWidth: 1366,
    viewportHeight: 768,
    watchForFileChanges: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results/env2",
      overwrite: false,
      html: true,
      json: true,
    },
  },
  env: {
    login: "galinaGomes@gmail.com",
    password: "Mypassword12345",
  },
});
