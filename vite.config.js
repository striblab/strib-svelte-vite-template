import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwind from "@tailwindcss/postcss";
import prefixer from "postcss-prefix-selector";

export default defineConfig({
    base: "",
    plugins: [svelte({ configFile: false })],
    build: {
        target: "es2020",
    },
    server: {
        open: true,
    },
    css: {
        postcss: {
            plugins: [
                tailwind(),
                /** @type {any} */ (prefixer({ prefix: "#proj-container" })),
            ],
        },
    },
});
