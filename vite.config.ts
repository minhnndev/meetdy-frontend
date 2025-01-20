import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        port: 9000,
    },
    build: {
        outDir: path.resolve(__dirname, "dist"),
        emptyOutDir: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
});
