import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const isProduction = mode === "production";

  return {
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      svgr(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        src: "./src",
      },
    },
    server: {
      // Proxy 설정
      proxy: {
        // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
        "/api": {
          // 요청 전달 대상 서버 주소 설정
          target: "https://api.sleact.sukwoo.kr/api",
          // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
          changeOrigin: true,
          // 요청 경로에서 '/api' 제거
          rewrite: (path) => path.replace(/^\/api/, ""),
          // SSL 인증서 검증 무시
          secure: false,
          // WebSocket 프로토콜 사용
          ws: true,
        },
      },
    },
  };
});
