// Usage:
//   REPO_NAME=<name> REPO_DESCRIPTION=<description> node scripts/template-init.js
//
// One-shot README/package.json customization run by
// .github/workflows/template-init.yml immediately after a new repo is
// created from this template. Rewrites the placeholder title and
// description at the top of README.md using the new repo's name/description
// (both are fields on GitHub's "create a new repository from template"
// page, so they're already set by the time this runs), removes the
// "Starting a project" section (meta-instruction about creating a repo from
// the template — irrelevant once a repo already exists), and updates
// package.json's name field to match.
//
// Safety guard: each rewrite only happens if the target still contains its
// known placeholder value. If it's already been changed — by this script on
// a prior run, or by a human — that part is left alone. That protects
// against double-runs and against clobbering a manual edit.

import { readFileSync, writeFileSync } from "node:fs";

const README_PATH = "README.md";
const PACKAGE_JSON_PATH = "package.json";

const PLACEHOLDER_TITLE = "# Minnesota Star Tribune Svelte + Vite Template";
const PLACEHOLDER_DESCRIPTION =
  "A starter template for building Svelte apps at the Minnesota Star Tribune. Includes reusable components, Tailwind for styling and AWS deploy scripts.";
const DEFAULT_DESCRIPTION =
  "A project built at the Minnesota Star Tribune with Svelte, Vite and Tailwind.";
const PLACEHOLDER_PKG_NAME = "strib-svelte-vite-template";

// Matches the "## Starting a project" section, from the blank line before
// its header through (but not including) the blank line before the "This
// project requires..." paragraph that follows it.
const STARTING_SECTION_RE =
  /\n## Starting a project\n[\s\S]*?(?=\nThis project requires the latest versions)/;

// Template-only encouragement to poke around the included components —
// doesn't apply once a project has its own real content. Removed and
// replaced with a "## Setup" heading directly above the Node version
// requirements paragraph that follows it.
const ENCOURAGEMENT_PARAGRAPH =
  "You're encouraged to modify the included components and write your own. The documentation bundled with each component and [Svelte's interactive tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) are good places to start.";

/**
 * Humanize a kebab/snake-case repo slug into a title, e.g.
 * "mn-election-2026" -> "Mn Election 2026". Best-effort — it doesn't know
 * about acronyms or proper nouns, so the result may need a human touch-up.
 * @param {string} slug
 * @returns {string}
 */
function titleCaseFromSlug(slug) {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const repoName = (process.env.REPO_NAME || "").trim();
if (!repoName) {
  console.error(
    "template-init: REPO_NAME env var is required but was empty — aborting.",
  );
  process.exit(1);
}

const description =
  (process.env.REPO_DESCRIPTION || "").trim() || DEFAULT_DESCRIPTION;
const title = titleCaseFromSlug(repoName);

const readme = readFileSync(README_PATH, "utf-8");

if (readme.includes(PLACEHOLDER_TITLE)) {
  let nextReadme = readme.replace(PLACEHOLDER_TITLE, `# ${title}`);
  nextReadme = nextReadme.replace(PLACEHOLDER_DESCRIPTION, description);
  nextReadme = nextReadme.replace(STARTING_SECTION_RE, "");
  nextReadme = nextReadme.replace(
    `${ENCOURAGEMENT_PARAGRAPH}\n\nThis project requires the latest versions`,
    "## Setup\n\nThis project requires the latest versions",
  );
  writeFileSync(README_PATH, nextReadme);
  console.log(`template-init: README.md customized for "${repoName}".`);
} else {
  console.log(
    "template-init: README.md no longer contains the placeholder title — already customized, skipping.",
  );
}

const pkg = JSON.parse(readFileSync(PACKAGE_JSON_PATH, "utf-8"));
if (pkg.name === PLACEHOLDER_PKG_NAME) {
  pkg.name = repoName;
  writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`template-init: package.json name set to "${repoName}".`);
} else {
  console.log(
    "template-init: package.json name is no longer the placeholder — already customized, skipping.",
  );
}
