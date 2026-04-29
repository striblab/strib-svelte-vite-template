import { render } from "svelte/server";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { select } from "@inquirer/prompts";

// @ts-ignore — dist-ssr is built during the build chain and will not exist until 'vite build --ssr src/prerender.entry.js --outDir dist-ssr'
import { Hero, ArticleBody } from "../dist-ssr/prerender.entry.js";

const DEFAULT_FILE = ".prerender-default";

async function resolveTarget() {
    const explicit = process.argv[2]; // 'hero' | 'body' | 'both' | undefined
    if (explicit) return explicit;

    if (existsSync(DEFAULT_FILE)) {
        return readFileSync(DEFAULT_FILE, "utf-8").trim();
    }

    // First run — prompt and persist
    const target = await select({
        message:
            "Build target (saved as default, delete .prerender-default to re-prompt):",
        choices: [
            { name: "Hero", value: "hero" },
            { name: "Body", value: "body" },
            { name: "Both", value: "both" },
        ],
    });
    writeFileSync(DEFAULT_FILE, target);
    return target;
}

const target = await resolveTarget();

mkdirSync("dist/fragments", { recursive: true });

let heroBody = "";
let articleBody = "";

if (target === "hero" || target === "both") {
    const result = render(/** @type {import('svelte').Component} */ (Hero), {
        props: {},
    });
    heroBody = result.body;
    writeFileSync("dist/fragments/hero.html", heroBody);
}

if (target === "body" || target === "both") {
    const result = render(
        /** @type {import('svelte').Component} */ (ArticleBody),
        { props: {} },
    );
    articleBody = result.body;
    writeFileSync("dist/fragments/body.html", articleBody);
}

// inject prerendered fragments into dist/index.html for `npm run preview`
let indexHtml = readFileSync("dist/index.html", "utf-8");
indexHtml = indexHtml.replace(
    '<div id="proj-hero"></div>',
    heroBody ? `<div id="proj-hero">${heroBody}</div>` : "",
);
indexHtml = indexHtml.replace(
    '<div id="proj-body"></div>',
    articleBody ? `<div id="proj-body">${articleBody}</div>` : "",
);
writeFileSync("dist/index.html", indexHtml);

if (heroBody)
    console.log(
        "Prerendered hero.html → dist/fragments/ and injected #proj-hero",
    );
if (articleBody)
    console.log(
        "Prerendered body.html → dist/fragments/ and injected #proj-body",
    );
