# Star Tribune Svelte + Vite Template

This is a template for building Svelte apps at the Star Tribune. It includes some basic components and documentation for configuring and building pages, as well as Tailwind support for styling and a host of AWS scripts to assist with deployment.

The code in this template is intended as a starting point and guide for designers; you're encouraged to modify existing components and write your own!

To that end, please use the documentation included with this template's default components and [Svelte's interactive tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) to start building stateful, component-based pages.

## Starting a project

To start a new project based on this template, click the green `Use this template` button at the top of this page and from the dropdown select `Create a new repository`.

On the following page, make sure the new repository's owner is `striblab` and that the repository is `private`. Click `Create repository` to create your new project.

Now you've created a new repository from the template's code. Find your new template's repository, click the green `Code` button and select `Open with Github Desktop` from the dropdown to pull of your new repository's starter code down to your machine. Or, if you prefer to
use git on the command line, copy the SSH url and run `git clone <ssh url>` in your terminal.

The code in this repository requires [node.js](https://nodejs.org) to be installed on your machine. It is recommended that you use [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) to install node to allow for multiple versions.

After cloning the project to your machine, use the terminal to navigate into the project directory:

```bash
cd path/to/project-directory
```

and run

```bash
npm install
```

## Development

To run the dev server run `npm run dev`.

To build for deployment, run `npm run build`.

## Using static assets

You can place static assets you wish to exclude from your JS bundle (images, svgs, pngs, etc.) in the `public` directory of your Svelte project and reference them with root-relative paths. For example: `<img src="/your_image.jpg"/>`.

However, this kind of relative pathing won't be suitable when you eventually build and upload your app to `static.startribune.com` for inclusion on a `startribune.com` article page. That's because the browser requests relative paths from a page's root domain, so an image tag `<img src="/your_image.jpg"/>` included on a `startribune.com` article page is actually pointing to `https://startribune.com/your_image.jpg` instead of its actual location on `static.startribune.com`.

You will need to use absolute paths to correct this. An absolute path is a full URL that starts from a domain's root. Upload your static assets to `static.startribune.com`, either through this project's included deploy scripts, Yarkon or manually, and revise your relative URLs to the absolute URLs on the static server. A recommended absolute path might look like `https://static.startribune.com/news/projects/all/yourRepoName/assets/your_image.jpg`

## Strib webfonts

Newsroom webfonts are served from `https://static.startribune.com/fonts/`.
Many common fonts are already implemented in this template. To implement additional fonts, host them on
`https://static.startribune.com/fonts/`, define them in `src/styles/tailwind/typography.css` and include them
in the `fontFamily` object exported from `src/styles/tailwind-constants/font-family.ts`.

## A 'gotcha' with line height

You may discover that text elements receive a mysterious `line-height: 1.5` style when deployed to an article page. This behavior occurs when line heights are not explicitly set on type elements.

If you use the design tokens defined in this template’s `editorial.css` and `utility.css` files, those will include line height utility classes and you don’t need to add any additional ones. But if you’re styling type without design tokens, you’ll want to specify a preferred line height along with your type face, font size, etc. The Tailwind utility class for line height is called [leading](https://tailwindcss.com/docs/line-height).

## Deploying

Deployment is currently handled by a shell script (`strib-deploy.sh`). You need to have
the [AWS CLI](https://aws.amazon.com/cli/) installed with credentials for the
static.startribune.com bucket using the 'default' profile.

To deploy to staging, run `npm run deploy-staging`. For production, run
`npm run deploy-production`. This will upload to a typical path using your
project's name, which is read from the root directory of your project
(where `package.json` is located).

Alternatively, you can use Yarkon to upload bundled assets in the dist folder to the
static.startribune.com foder.
