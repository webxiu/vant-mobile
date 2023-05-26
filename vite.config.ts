import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

function resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
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
    outDir: "D:\\nginx-1.22.1\\deogra-h5",
    rollupOptions: {
      // output: {
      //   manualChunks(id, meta) {
      //     // if (id.includes("vant")) {
      //     //   return "vant";
      //     // }
      //     if (id.includes("node_modules")) {
      //       const names = id.toString().split("node_modules")[1].split("/")[0].toString();
      //       console.log("========names", id.toString());
      //       console.log( "========98", id.toString().split("node_modules")[1].split("/") );
      //       return names;
      //     }
      //   },
      // },
      input: {
        index: resolve("index.html"),
      },
      // 静态资源分类打包
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
