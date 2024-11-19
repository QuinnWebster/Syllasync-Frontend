import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore unused external import warnings
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        // Print other warnings
        warn(warning);
      },
    },
  },
});
