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

Manually place your font folders in the directory `public/fonts/` to render 
them on the page. These local fonts will be included in the build and deploy 
processes until a CORS policy issue can be resolved on static.startribune.com.

## Deploying

Deployment is currently handled by a shell script (`strib-deploy.sh`). You need to have 
the [AWS CLI](https://aws.amazon.com/cli/) installed with credentials for the 
static.startribune.com bucket using the 'default' profile.

To deploy to staging, run `npm run deploy-staging`. For production, run 
`npm run deploy-production`. This will upload to a typical path using your 
project's name, which is read from the root directory of your project 
(where `package.json` is located).