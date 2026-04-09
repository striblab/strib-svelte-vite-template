import { render } from "svelte/server";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// @ts-ignore — dist-ssr is a directory built during the build chain and will not exist until 'vite build --ssr src/prerender.entry.js --outDir dist-ssr'
import { Hero, ArticleBody } from "../dist-ssr/prerender.entry.js";

mkdirSync("dist/fragments", { recursive: true });

const heroResult = render(/** @type {import('svelte').Component} */ (Hero), {
    props: {},
});
writeFileSync("dist/fragments/hero.html", heroResult.body);

const bodyResult = render(
    /** @type {import('svelte').Component} */ (ArticleBody),
    { props: {} },
);
writeFileSync("dist/fragments/body.html", bodyResult.body);

// inject prerendered fragments into dist/index.html for `npm run preview`
let indexHtml = readFileSync("dist/index.html", "utf-8");
indexHtml = indexHtml.replace(
    '<div id="proj-hero"></div>',
    `<div id="proj-hero">${heroResult.body}</div>`,
);
indexHtml = indexHtml.replace(
    '<div id="proj-body"></div>',
    `<div id="proj-body">${bodyResult.body}</div>`,
);
writeFileSync("dist/index.html", indexHtml);

console.log("Prerendered hero.html and body.html → dist/fragments/");
console.log("Injected fragments into dist/index.html");
