import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwind from "@tailwindcss/postcss";
import prefixer from "postcss-prefix-selector";

/** @type {import('postcss').Plugin} */
const unwrapLayers = {
    postcssPlugin: "postcss-unwrap-layers",
    OnceExit(root) {
        root.walkAtRules("layer", (rule) => {
            if (rule.nodes) rule.replaceWith(rule.nodes);
            else rule.remove();
        });
    },
};

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
                /** @type {any} */ (
                    prefixer({ prefix: ":is(#proj-hero, #proj-body)" })
                ),
                unwrapLayers,
            ],
        },
    },
});
