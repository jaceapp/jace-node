import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "Jace",
        },
        rollupOptions: {
            // Externalize peer dependencies
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
    resolve: {
        alias: {
            "@Dist": path.resolve(__dirname, "./dist"),
            "@Components": path.resolve(__dirname, "./src/React/Components"),
            "@Global": path.resolve(__dirname, "./src/React/Global"),
            "@Layouts": path.resolve(__dirname, "./src/React/Layouts"),
            "@Enums": path.resolve(__dirname, "./src/React/Enums"),
            "@Stores": path.resolve(__dirname, "./src/React/Stores"),
            "@Socket": path.resolve(__dirname, "./src/React/Socket"),
            "@Hooks": path.resolve(__dirname, "./src/React/Hooks"),
            "@Helpers": path.resolve(__dirname, "./src/React/Helpers"),
        },
    },
});
