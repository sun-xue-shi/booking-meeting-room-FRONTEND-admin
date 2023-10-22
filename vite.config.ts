import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ["@vue/babel-plugin-jsx"],
  },
  esbuild: {
    // 告诉 esbuild 在 JSX 文件中添加自定义转换规则，以便使用 Vue JSX
    jsxFactory: "_c",
    jsxFragment: "_Fragment",
  },
});
