import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Assignment-3/",
  build: {
    // Build output into a 'docs' folder in the repository root
    outDir: "../docs",
    emptyOutDir: true,
  },
});
