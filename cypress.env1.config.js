import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    viewportWidth: 1366,
    viewportHeight: 768,
    watchForFileChanges: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results/env1",
      overwrite: false,
      html: true,
      json: true,
    },
    
  },
  env: {
      login: "rodrigasGomes@gmail.com",
      password: "Mypassword1234",
    },
});
