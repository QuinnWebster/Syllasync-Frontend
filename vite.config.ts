import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Base path for deployed assets, required for GitHub Pages
  base: "/syllasync_frontend/",

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
    rollupOptions: {
      // Define the entry point for the build process
      input: "index.html",
      // Optional: Suppress specific warnings
      onwarn(warning, warn) {
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        if (warning.code === "CIRCULAR_DEPENDENCY") return;
        warn(warning); // Log other warnings normally
      },
    },
  },
});
