import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Base path for deployed assets, required for GitHub Pages
  base: "/",

  // Local dev server settings
  server: {
    proxy: {
      // Proxy API calls to your Render backend during development
      "/aiResponse": {
        target: "https://test-ejxy.onrender.com",
        changeOrigin: true,
        secure: false, // Use this only if your target server uses self-signed certificates
      },
    },
  },

  // Vite plugins
  plugins: [react()],

  // Build configuration
  build: {
    // Specify output directory (default is already 'dist', so this is optional)
    outDir: "dist",
  },
});
