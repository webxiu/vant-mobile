import type { ConfigEnv, UserConfigExport } from "vite";
import { defineConfig, loadEnv } from "vite";

import path from "path";
import vue from "@vitejs/plugin-vue";

interface ImportMetaEnv {
  readonly VITE_PORT: number;
  readonly VITE_BASE_API: string;
  readonly VITE_ROUTER_HISTORY: "hash" | "html5";
  readonly VITE_PUBLIC_PATH: string;
  readonly [key: string]: any;
}

function resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  const { VITE_PORT, VITE_BASE_URL, VITE_BASE_API, VITE_PUBLIC_PATH } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve("src"),
        "~": resolve(""),
      },
      extensions: [".js", ".ts", ".tsx", ".jsx"],
    },
    build: {
      emptyOutDir: true,
      outDir: "./dist",
      chunkSizeWarningLimit: 1000, // 消除打包超过500kb警告
      rollupOptions: {
        input: {
          index: resolve("index.html"),
        },
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    server: {
      port: VITE_PORT,
      proxy: {
        // string shorthand
        "/foo": "http://localhost:4567/foo",
        // with options
        "/test": {
          target: "http://api.github.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        [VITE_BASE_API]: {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(VITE_BASE_API, ""),
        },
      },
    },
  };
};
