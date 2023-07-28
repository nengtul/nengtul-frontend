import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VitePluginHtmlEnv from "vite-plugin-html-env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginHtmlEnv(), VitePluginHtmlEnv({ compiler: true })],
  server: {
    proxy: {
      "/api": {
        // 요청 주소가 /api로 시작하면 프록시 적용
        target: "http://43.200.162.72:8080", // 백엔드 서버 주소
        changeOrigin: true, // 요청 헤더의 Origin 값을 변경합니다.
        rewrite: (path) => path.replace(/^\/api/, ""), // 요청 경로에서 /api를 제거합니다.
        secure: false, // https 프록시의 보안 검사를 비활성화합니다.
        ws: true, // WebSocket도 프록시합니다.
      },
    },
  },
});
