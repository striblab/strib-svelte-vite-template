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

To build for deployment, run `npm run build`.

## Using static assets

Static assets (images, SVGs, etc.) can go in the `public` directory and be referenced with root-relative paths, e.g. `<img src="/your_image.jpg"/>`.

However, root-relative paths won't work once the app is embedded on a `startribune.com` article page — the browser will resolve `/your_image.jpg` against `startribune.com`, not `static.startribune.com`.

To fix this, upload your assets to `static.startribune.com` (via the deploy scripts, Yarkon, or manually) and use absolute URLs, e.g. `https://static.startribune.com/news/projects/all/yourRepoName/assets/your_image.jpg`

## Strib webfonts

Newsroom webfonts are served from `https://static.startribune.com/fonts/`.
Many common fonts are already implemented in this template. To implement additional fonts, host them on
`https://static.startribune.com/fonts/`, define them in `src/styles/tailwind/typography.css` and include them
in the `fontFamily` object exported from `src/styles/tailwind-constants/font-family.ts`.

## A 'gotcha' with line height

You may discover that text elements receive a mysterious `line-height: 1.5` style when deployed to an article page. This behavior occurs when line heights are not explicitly set on type elements.

If you use the design tokens defined in this template’s `editorial.css` and `utility.css` files, those will include line height utility classes and you don’t need to add any additional ones. But if you’re styling type without design tokens, you’ll want to specify a preferred line height along with your type face, font size, etc. The Tailwind utility class for line height is called [leading](https://tailwindcss.com/docs/line-height).

## Deploying

Deployment is handled by a shell script (`strib-deploy.sh`). You need:

1. The [AWS CLI](https://aws.amazon.com/cli/) installed.
2. A valid SSO session — tokens expire daily, so you may need to re-authenticate before deploying. See the [Access AWS via SSO](https://minneapolisstartribune.atlassian.net/wiki/spaces/PD/pages/3205562375/Access+AWS+via+SSO) guide for setup instructions.
3. Name your CLI profile `default` for seamless compatibility with `strib-deploy.sh`.

To deploy to staging, run `npm run deploy-staging`. For production, run
`npm run deploy-production`. This will upload to a typical path using your
project's name, which is read from the root directory of your project
(where `package.json` is located).

Alternatively, you can use Yarkon to upload bundled assets in the dist folder to the
static.startribune.com folder.
