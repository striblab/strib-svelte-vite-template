# Star Tribune Svelte + Vite Template

This is a template for building Svelte apps at the Star Tribune. It includes some basic components and documentation for configuring and building pages, as well as Tailwind support for styling and a host of AWS scripts to assist with deployment.

The code in this template is intended as a starting point and guide for designers; you're encouraged to modify existing components and write your own!

To that end, please use the documentation included with this template's default components and [Svelte's interactive tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) to start building stateful, component-based pages.

## Starting a project

To start a new project based on this template, click the green `Use this template` button at the top of this page and from the dropdown select `Create a new repository`.

On the following page, make sure the new repository's owner is `striblab` and that the repository is `private`. Click `Create repository` to create your new project.

Now you've created a new repository from the template's code. Find your new template's repository, click the green `Code` button and select `Open with Github Desktop` from the dropdown to pull of your new repository's starter code down to your machine.

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

## Deploying

Deployment is currently handled by a shell script (`strib-deploy.sh`). You need to have
the [AWS CLI](https://aws.amazon.com/cli/) installed with credentials for the
static.startribune.com bucket using the 'default' profile.

To deploy to staging, run `npm run deploy-staging`. For production, run
`npm run deploy-production`. This will upload to a typical path using your
project's name, which is read from the root directory of your project
(where `package.json` is located).
