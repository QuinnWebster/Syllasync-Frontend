import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/syllasync_frontend/",
  server: {
    proxy: {
      "/aiResponse": {
        target: "https://test-ejxy.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    outDir: "dist", // Ensures the build output goes into the 'dist' directory
    rollupOptions: {
      input: "index.html", // Ensure the entry point is your 'index.html'
      onwarn(warning, warn) {
        // Ignore certain Rollup warnings to prevent build from failing
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        if (warning.code === "CIRCULAR_DEPENDENCY") return; // Ignore circular dependencies
        warn(warning); // Otherwise, log the warning
      },
    },
  },
});
