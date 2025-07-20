import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    /* 别名配置 */
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@tsTypes": path.resolve(__dirname, "./tsTypes/index.d.ts"),
        },
    },
    /* 服务器配置 */
    server: {
        port: 25527, // 设置服务器端口号
        open: true, // 启动时自动打开浏览器
        host: "0.0.0.0", // 允许外部访问
    },
    /* 打包配置 */
    build: {
        lib: {
            entry: "./src/index.ts",
            name: "CrossStore",
            fileName: "CrossStore",
        },
    },
})
