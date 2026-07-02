# Minnesota Star Tribune Svelte + Vite Template

A starter template for building Svelte apps at the Minnesota Star Tribune. Includes reusable components, Tailwind for styling and AWS deploy scripts.

You're encouraged to modify the included components and write your own. The documentation bundled with each component and [Svelte's interactive tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) are good places to start.

## Starting a project

To start a new project based on this template, click the green `Use this template` button at the top of this page and from the dropdown select `Create a new repository`.

On the following page, make sure the new repository's owner is `striblab` and that the repository is `private`. Click `Create repository` to create your new project.

Now you've created a new repository from the template's code. From the new repository's main Github page, click the green `Code` button and select `Open with Github Desktop` from the dropdown to pull the starter code down to your machine. Or, if you prefer the command line, copy the SSH URL and run `git clone <ssh url>` in your terminal.

This project requires the latest versions of [Node.js](https://nodejs.org) **20** or **22**. Node 22 is preferred. [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) is recommended for installing and managing multiple versions.

After cloning the project to your machine, use the terminal to navigate into the project directory:

```bash
cd path/to/project-directory
```

If you're using nvm, run `nvm use` to automatically switch to the correct Node version. The `.nvmrc` file in the project root tells nvm which version to use, so you don't need to remember it. If you don't have that version installed yet, run `nvm install` first.

Then run:

```bash
npm install
```

## Developing

To start the dev server, run `npm run dev`.

### Using static assets

Static assets (images, SVGs, etc.) can go in the `public` directory and be referenced with root-relative paths, e.g. `<img src="/your_image.jpg"/>`.

However, root-relative paths won't work once the app is embedded on a `startribune.com` article page — the browser will resolve `/your_image.jpg` against `startribune.com`, not `static.startribune.com`.

To fix this, upload your assets to `static.startribune.com` (via the deploy scripts, Yarkon, or manually) and use absolute URLs, e.g. `https://static.startribune.com/news/projects/all/yourRepoName/assets/your_image.jpg`

### Star Tribune webfonts

Newsroom webfonts are served from `https://static.startribune.com/fonts/`.
Many common fonts are already implemented in this template. To implement additional fonts, host them on
`https://static.startribune.com/fonts/`, add the corresponding font face rule to `src/styles/fonts.css` and add a new
font theme variable to `src/styles/tailwind.css`.

## Building and deploying

To build for deployment, run `npm run build`. This produces preprendered HTML along with JS and CSS bundles by running the following three steps in sequence:

1. **Client build** — Vite compiles your Svelte components and CSS into optimized, browser-ready JavaScript and CSS files, placing them in `dist/`. The JavaScript built in this step adds functionality to prerendered HTML. The next two steps will generate that HTML.

2. **Server build** — Vite compiles the components a second time, this time targeting Node.js instead of a browser. The result goes into `dist-ssr/` and is never served to readers — it exists only so the next step can run Svelte components in a terminal environment, where there is no browser or DOM.

3. **Pre-render** — A small Node.js script (`scripts/prerender.js`) imports the SSR bundle and uses Svelte's `render()` function to generate the initial HTML. That HTML is written to fragment files in the `dist/fragments` directory for use during deployment (see [Deploying](#deploying) below), and is also injected into `dist/index.html` so that `npm run preview` reflects the final embedded state.

### Why we prerender

In short, prerendering HTML is probably better for SEO and presents fewer layout shifts when loading.

Without prerendering, the CMS code block contains an empty `<div>`. When a reader loads the page, the browser has to download the JavaScript bundle, parse it and run it before any content appears. This results in a brief blank space above the fold that flashes until the broader article page's rerendering cycle settles down. With prerendering, the code block already contains the fully-formed HTML, so the content is visible the moment the browser renders the page, with no waiting for JavaScript.

Once the JavaScript bundle does load, `main.js` calls Svelte's `hydrate()` function on each container. Hydration reads the existing HTML and attaches Svelte's event listeners and reactive state to it without wiping and re-drawing anything. As a safeguard, `main.js` also runs a check every 500 ms. If a container is found rerendered and without JS functionality, the interval will rehydrate that markup.

### Choosing your build target

Upon first building your app, a terminal prompt will ask for your project's build target and save your preference to the file `.prerender-default`. You can choose from the following options:

1. **Hero** - Appropriate if you want to replace the default hero of an immersive template article with a custom Svelte component. Upon deployment, prints links to JS and CSS bundles as well as prerendered hero markup to copy/paste into a code block with the custom hero powerup.

2. **Body** - Appropriate if you want to replace the default body of an immersive template article with a custom Svelte component. Upon deployment, prints links to JS and CSS bundles as well as prerendered body markup to copy/paste into a regular code block.

3. **Both** - Appropriate if you want to replace both the default hero and default body of an immersive template with custom Svelte components. Upon deployment, prints markup for custom hero code block and body-level code block.

To change your project's build target, delete `.prerender-default`. The CLI will prompt you again the next time you build your app.

### Deployment

Deployment is handled by a shell script (`strib-deploy.sh`). You need:

1. The [AWS CLI](https://aws.amazon.com/cli/) installed.
2. A valid SSO session — tokens expire daily, so you may need to re-authenticate before deploying. See the [Access AWS via SSO](https://minneapolisstartribune.atlassian.net/wiki/spaces/PD/pages/3205562375/Access+AWS+via+SSO) guide for setup instructions.
3. Name your CLI profile `default` for seamless compatibility with `strib-deploy.sh`.

To deploy to staging, run `npm run deploy-staging`. For production, run
`npm run deploy-production`. This will upload to a typical path using your
project's name, which is read from the root directory of your project
(where `package.json` is located).

After uploading, the script will print code appropriate to your build target to the terminal window to copy/paste into Arc.

Note that `dist/fragments/` is intentionally excluded from the S3 sync — the fragment HTML is embedded directly in the CMS code blocks at deploy time and does not need to be hosted separately.
