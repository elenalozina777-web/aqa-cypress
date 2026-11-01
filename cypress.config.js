import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: ('https://qauto.forstudy.space/'),
    viewportWidth: 1366,
    viewportHeight: 768,
    watchForFileChanges: false,
  },
  
});
