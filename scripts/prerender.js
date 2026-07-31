import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { select } from "@inquirer/prompts";

// @ts-ignore — dist-ssr is built during the build chain and will not exist until 'vite build --ssr src/prerender.entry.js --outDir dist-ssr'
import { Hero, ArticleBody, render } from "../dist-ssr/prerender.entry.js";

const DEFAULT_FILE = ".prerender-default";

async function resolveTarget() {
  const explicit = process.argv[2]; // 'hero' | 'body' | 'both' | undefined
  if (explicit) return explicit;

  if (existsSync(DEFAULT_FILE)) {
    return readFileSync(DEFAULT_FILE, "utf-8").trim();
  }

  // NON-INTERACTIVE FALLBACK — do not prompt where nobody can answer.
  // `.prerender-default` is gitignored, so a FRESH CLONE has no saved answer and
  // the prompt below is the first thing `npm run build` hits. In CI, a script, or
  // an agent session there is no TTY, so the build either throws or hangs forever
  // on a question no one will read — the worst kind of failure, because it looks
  // like a slow build.
  // Falls back to "both" deliberately: it is the SUPERSET, so it can only produce
  // an extra fragment, never silently omit one. A missing hero fragment is the
  // dangerous outcome — strib-deploy.sh would then emit no hero CMS block and say
  // nothing about it.
  // Chosen over committing a default `.prerender-default`, which would impose the
  // first project's answer on every clone born from this template.
  if (!process.stdin.isTTY) {
    console.warn(
      "⚠ prerender: no build target given, no .prerender-default, and no TTY to " +
      "ask — falling back to BOTH fragments.\n" +
      "  Pass an explicit target to silence this: " +
      "node scripts/prerender.js hero|body|both\n" +
      "  (or npm run build:hero / build:body / build:both)"
    );
    return "both";
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

const VALID_TARGETS = ["hero", "body", "both"];
const target = await resolveTarget();

// FAIL LOUD on a target nobody recognises. Without this, an unknown value (a typo
// in .prerender-default, a stale value from a project that changed shape, a
// mis-passed argument) matched NEITHER branch below: no fragment was written, no
// warning printed, exit code 0. strib-deploy.sh would then find no fragments, emit
// no CMS block, and also say nothing — two silent no-ops in a row, ending in a
// deploy that looks successful and publishes an empty hero slot. That is the exact
// class of failure the rest of this file was changed to prevent.
if (!VALID_TARGETS.includes(target)) {
  console.error(
    `\n❌ prerender: unknown build target ${JSON.stringify(target)}.\n` +
    `   Expected one of: ${VALID_TARGETS.join(" | ")}\n` +
    `   Source: ${process.argv[2] ? "the command-line argument" : `the ${DEFAULT_FILE} file`}\n` +
    `   Fix the value (or delete ${DEFAULT_FILE} to be asked again), then rebuild.\n`
  );
  process.exit(1);
}

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
