# Minnesota Star Tribune Svelte + Vite Template

A starter template for building Svelte apps at the Minnesota Star Tribune. Includes reusable components, Tailwind for styling and AWS deploy scripts.

You're encouraged to modify the included components and write your own. The documentation bundled with each component and [Svelte's interactive tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) are good places to start.

## Starting a project

To start a new project based on this template, click the green `Use this template` button at the top of this page and from the dropdown select `Create a new repository`.

On the following page, make sure the new repository's owner is `striblab` and that the repository is `private`. Click `Create repository` to create your new project.

Now you've created a new repository from the template's code. Find your new template's repository, click the green `Code` button and select `Open with Github Desktop` from the dropdown to pull the starter code down to your machine. Or, if you prefer the command line, copy the SSH URL and run `git clone <ssh url>` in your terminal.

This project requires the latest versions of [Node.js](https://nodejs.org) **20** or **22**. Node 22 is preferred. [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) is recommended for installing and managing multiple versions.

After cloning the project to your machine, use the terminal to navigate into the project directory:

```bash
cd path/to/project-directory
```

If you're using nvm, run `nvm use` to automatically switch to the correct Node version. The `.nvmrc` file in the project root tells nvm which version to use, so you don't need to remember it. If you don't have that version installed yet, run `nvm install` first.

Then run

```bash
npm install
```

## Development

To run the dev server run `npm run dev`.

To build for deployment, run `npm run build`. This runs three steps in sequence:

1. **Client build** — Vite compiles your Svelte components and CSS into optimized, browser-ready JavaScript and CSS files, placing them in `dist/`. The JavaScript built in this step adds functionality to prerendered HTML. The next two steps will generate that HTML.

2. **Server build** — Vite compiles the components a second time, this time targeting Node.js instead of a browser. The result goes into `dist-ssr/` and is never served to readers — it exists only so the next step can run Svelte components in a terminal environment, where there is no browser or DOM.

3. **Pre-render** — A small Node.js script (`scripts/prerender.js`) imports the SSR bundle and uses Svelte's `render()` function to generate the initial HTML for `Hero` and `ArticleBody`. That HTML is written to `dist/fragments/hero.html` and `dist/fragments/body.html` for use during deployment (see [Deploying](#deploying) below), and is also injected into `dist/index.html` so that `npm run preview` reflects the final embedded state.

### Pre-rendering overview

Without pre-rendering, the CMS code block contains an empty `<div>`. When a reader loads the page, the browser has to download the JavaScript bundle, parse it, and run it before any content appears — resulting in a brief blank space above the fold. With pre-rendering, the code block already contains the fully-formed HTML for the hero (and body), so the content is visible the moment the browser renders the page, with no waiting for JavaScript.

Once the JavaScript bundle does load, `main.js` calls Svelte's `hydrate()` function on each container. Hydration reads the existing HTML and attaches Svelte's event listeners and reactive state to it without wiping and re-drawing anything. This minimizes page flashing.

Because the CMS (Arc) or third-party scripts like Piano can sometimes replace a page section's DOM node entirely — clearing the pre-rendered HTML — `main.js` also runs a check every 500 ms. If a container is found to be empty, it falls back to a full `mount()`, rebuilding the component from scratch.

## Using static assets

Static assets (images, SVGs, etc.) can go in the `public` directory and be referenced with root-relative paths, e.g. `<img src="/your_image.jpg"/>`.

However, root-relative paths won't work once the app is embedded on a `startribune.com` article page — the browser will resolve `/your_image.jpg` against `startribune.com`, not `static.startribune.com`.

To fix this, upload your assets to `static.startribune.com` (via the deploy scripts, Yarkon, or manually) and use absolute URLs, e.g. `https://static.startribune.com/news/projects/all/yourRepoName/assets/your_image.jpg`

## Strib webfonts

Newsroom webfonts are served from `https://static.startribune.com/fonts/`.
Many common fonts are already implemented in this template. To implement additional fonts, host them on
`https://static.startribune.com/fonts/`, define them in `src/styles/tailwind/typography.css` and include them
in the `fontFamily` object exported from `src/styles/tailwind-constants/font-family.ts`.

## Deploying

Deployment is handled by a shell script (`strib-deploy.sh`). You need:

1. The [AWS CLI](https://aws.amazon.com/cli/) installed.
2. A valid SSO session — tokens expire daily, so you may need to re-authenticate before deploying. See the [Access AWS via SSO](https://minneapolisstartribune.atlassian.net/wiki/spaces/PD/pages/3205562375/Access+AWS+via+SSO) guide for setup instructions.
3. Name your CLI profile `default` for seamless compatibility with `strib-deploy.sh`.

To deploy to staging, run `npm run deploy-staging`. For production, run
`npm run deploy-production`. This will upload to a typical path using your
project's name, which is read from the root directory of your project
(where `package.json` is located).

After uploading, the script prints two code blocks to the terminal — one for the CMS hero area and one for the body-level code block. Each block includes:

- The pre-rendered HTML for that section (inlined from `dist/fragments/`), so content is visible immediately without waiting for JavaScript.
- The shared CSS `<link>` and JS `<script>` tags (hero block only — both sections share one JS bundle).

Paste the **hero code block** into the article's custom hero area and the **body code block** into the body-level code block in Arc. The deployed JS will hydrate both sections on load.

Note that `dist/fragments/` is intentionally excluded from the S3 sync — the fragment HTML is embedded directly in the CMS code blocks at deploy time and does not need to be hosted separately.
