import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/React-App",
    optimizeDeps: {
      include: ["@packages/types"],
    },
    build: {
      rollupOptions: {
        plugins: [commonjs()],
        output: {
          manualChunks(id) {
            if (id.includes("/packages/")) return "packages";
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        "@components": path.resolve(__dirname, "./src/components"),
      },
    },
    define: {
      "process.env.HTTP_URL": JSON.stringify(env.HTTP_URL),
      "process.env.WS_URL": JSON.stringify(env.WS_URL),
    },
  };
});
