import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { select } from "@inquirer/prompts";

// @ts-ignore — dist-ssr is built during the build chain and will not exist until 'vite build --ssr src/prerender.entry.js --outDir dist-ssr'
import { Hero, ArticleBody, render } from "../dist-ssr/prerender.entry.js";

const DEFAULT_FILE = ".prerender-default";

/** Curly quotes and primes, mapped to their numeric HTML entities. */
const SMART_QUOTES = new Map([
  ["\u2018", "&#8216;"],
  ["\u2019", "&#8217;"],
  ["\u201A", "&#8218;"],
  ["\u201B", "&#8219;"],
  ["\u201C", "&#8220;"],
  ["\u201D", "&#8221;"],
  ["\u201E", "&#8222;"],
  ["\u201F", "&#8223;"],
  ["\u2032", "&#8242;"],
  ["\u2033", "&#8243;"],
]);

//join keys listed above in a regular expression
const SMART_QUOTE_RE = new RegExp(
  `[${[...SMART_QUOTES.keys()].join("")}]`,
  "g",
);

//regex with capture group for script and style tags
const RAW_TEXT_RE = /(<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)>)/gi;

/**
 * Encodes curly quotes in rendered markup as numeric HTML entities.
 *
 * Split raw html text by script/style tag capture group
 * Since splitting on regex capture group, delimiter is maintained and will always be at an odd index
 * So we can safely replace unicode with html entities at even indices
 *
 * @param {string} html Rendered fragment markup.
 * @returns {string} The same markup with curly quotes entity-encoded.
 */
function encodeSmartQuotes(html) {
  return html
    .split(RAW_TEXT_RE)
    .map((chunk, i) =>
      i % 2
        ? chunk
        : chunk.replace(SMART_QUOTE_RE, (c) => SMART_QUOTES.get(c) ?? c),
    )
    .join("");
}

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
  heroBody = encodeSmartQuotes(result.body);
  writeFileSync("dist/fragments/hero.html", heroBody);
}

if (target === "body" || target === "both") {
  const result = render(
    /** @type {import('svelte').Component} */ (ArticleBody),
    { props: {} },
  );
  articleBody = encodeSmartQuotes(result.body);
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
