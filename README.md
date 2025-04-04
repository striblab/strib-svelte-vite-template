# Star Tribune Svelte + Vite Template

This is a template for building Svelte apps at the Star Tribune. It uses
Svelte 5; See the
[migration guide](https://svelte.dev/docs/svelte/v5-migration-guide).

Runes mode is not turned on by default in the template;
to enable it, add a `svelte.config.js` file to the root with
the following:

```
export default {
    compilerOptions: {
        runes: true
    }
};
```

## Starting a project

To start a new project based on this template, run

```
npx degit striblab/strib-svelte-vite-template#main name-of-your-new-project
cd name-of-your-new-project
npm install
```

## Development

To run the dev server run `npm run dev`.

To build for deployment, run `npm run build`.

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
