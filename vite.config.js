import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Vite 서버를 모든 IP에서 접근 가능하도록 설정
  },
  optimizeDeps: {
    include: ["datatables.net-select-dt"],
  },
});
