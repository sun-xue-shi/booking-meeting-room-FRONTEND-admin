import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
    ViteImageOptimizer({
      // JPEG格式优化配置
      jpg: {
        quality: 80, // 质量设置为80%
      },
      // PNG格式优化配置
      png: {
        quality: 80, // 质量设置为80%
      },
      // WebP格式优化配置
      webp: {
        quality: 80, // 质量设置为80%
      },
      // 其他配置
      cache: true, // 启用缓存以提高重复构建速度
      exclude: [], // 不排除任何文件，优化所有图片
    })
  ],
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
