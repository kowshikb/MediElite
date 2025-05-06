import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  css: {
    postcss: "./postcss.config.js",
    modules: {
      scopeBehaviour: "local",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3001,
    strictPort: true,
    host: "0.0.0.0",
    open: true,
    proxy: {
      // Proxy /api requests to the backend server
      "/api": {
        target: "http://localhost:5001", // Your backend server address
        changeOrigin: true,
        // secure: false, // Uncomment if backend is not using HTTPS
        // rewrite: (path) => path.replace(/^\/api/, '') // Uncomment if backend routes don't have /api prefix
      },
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
