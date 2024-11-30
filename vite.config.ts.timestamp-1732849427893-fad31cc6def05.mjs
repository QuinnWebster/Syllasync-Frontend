// vite.config.ts
import { defineConfig } from "file:///C:/Users/qwebs/Desktop/syllasync-email/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/qwebs/Desktop/syllasync-email/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  // Base path for deployed assets, required for GitHub Pages
  base: "/",
  // Local dev server settings
  server: {
    proxy: {
      // Proxy API calls to your Render backend during development
      "/aiResponse": {
        target: "https://test-ejxy.onrender.com",
        changeOrigin: true,
        secure: false
        // Use this only if your target server uses self-signed certificates
      }
    }
  },
  // Vite plugins
  plugins: [react()],
  // Build configuration
  build: {
    // Specify output directory (default is already 'dist', so this is optional)
    outDir: "dist"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxxd2Vic1xcXFxEZXNrdG9wXFxcXHN5bGxhc3luYy1lbWFpbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccXdlYnNcXFxcRGVza3RvcFxcXFxzeWxsYXN5bmMtZW1haWxcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3F3ZWJzL0Rlc2t0b3Avc3lsbGFzeW5jLWVtYWlsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAvLyBCYXNlIHBhdGggZm9yIGRlcGxveWVkIGFzc2V0cywgcmVxdWlyZWQgZm9yIEdpdEh1YiBQYWdlc1xyXG4gIGJhc2U6IFwiL1wiLFxyXG5cclxuICAvLyBMb2NhbCBkZXYgc2VydmVyIHNldHRpbmdzXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICAvLyBQcm94eSBBUEkgY2FsbHMgdG8geW91ciBSZW5kZXIgYmFja2VuZCBkdXJpbmcgZGV2ZWxvcG1lbnRcclxuICAgICAgXCIvYWlSZXNwb25zZVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vdGVzdC1lanh5Lm9ucmVuZGVyLmNvbVwiLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLCAvLyBVc2UgdGhpcyBvbmx5IGlmIHlvdXIgdGFyZ2V0IHNlcnZlciB1c2VzIHNlbGYtc2lnbmVkIGNlcnRpZmljYXRlc1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAvLyBWaXRlIHBsdWdpbnNcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcblxyXG4gIC8vIEJ1aWxkIGNvbmZpZ3VyYXRpb25cclxuICBidWlsZDoge1xyXG4gICAgLy8gU3BlY2lmeSBvdXRwdXQgZGlyZWN0b3J5IChkZWZhdWx0IGlzIGFscmVhZHkgJ2Rpc3QnLCBzbyB0aGlzIGlzIG9wdGlvbmFsKVxyXG4gICAgb3V0RGlyOiBcImRpc3RcIixcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UyxTQUFTLG9CQUFvQjtBQUMzVSxPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixNQUFNO0FBQUE7QUFBQSxFQUdOLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBLE1BRUwsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUdBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQTtBQUFBLEVBR2pCLE9BQU87QUFBQTtBQUFBLElBRUwsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
