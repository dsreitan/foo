import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works on GitHub Pages project sites
  base: "./",
  plugins: [react(), vanillaExtractPlugin()],
  build: {
    rollupOptions: {
      // Two pages: the SPA and the prerendered components page
      input: {
        main: "index.html",
        statisk: "statisk.html",
      },
    },
  },
  ssr: {
    // Process the workspace packages (and their .css.ts files) in the
    // prerender bundle instead of treating them as node externals
    noExternal: ["kobber", "kobber-lab"],
  },
});
