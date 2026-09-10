// vite.config.ts
import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    // tanstackRouter({
    //   target: "react",
    //   autoCodeSplitting: true,
    // }),
    viteReact(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 커스텀 도메인을 떼고 프로젝트 페이지(dldnsgkr.github.io/portfolio)로 돌아왔다.
  // 프로젝트 페이지는 루트가 아니라 /portfolio/ 아래에서 서빙되므로 base 가 맞아야
  // 에셋이 전부 404 난다.
  base: "/portfolio/",
});
