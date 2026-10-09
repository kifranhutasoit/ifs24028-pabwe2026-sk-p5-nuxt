import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import process from "process";

const API_TARGET = "https://open-api.delcom.org";

const apiProxy = {
  "/api": {
    target: API_TARGET,
    changeOrigin: true,
    // /api/cash-flows -> https://open-api.delcom.org/api/v1/cash-flows
    rewrite: (path: string) => path.replace(/^\/api/, "/api/v1"),
  },
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.APP_PORT || env.PORT) || 3000;

  return {
    plugins: [vue(), tailwindcss()],
    server: {
      port,
      proxy: apiProxy,
    },
    preview: {
      port,
      proxy: apiProxy,
    },
    define: {
      DELCOM_BASEURL: JSON.stringify(env.VITE_DELCOM_BASEURL || "/api"),
    },
    test: {
      // ... bagian test tetap seperti sebelumnya
    },
  };
});