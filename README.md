# Star Tribune Svelte + Vite Template

This is a template for building Svelte apps at the Star Tribune. It's intended to replace the old svelte+webpack template.

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

To preview a built app locally, run `npm run preview`.

## Strib webfonts

Manually place your font folders in the directory `public/fonts/` to render them on the page.
These local fonts will be included in the build and deploy processes until a CORS policy issue can be resolved on static.startribune.com.

## Deploying

Deployment is currently handled by a shell script (`strib-deploy.sh`). You need to have the [AWS CLI](https://aws.amazon.com/cli/) installed
with credentials for the static.startribune.com bucket using the 'default' profile.

To deploy to staging, run `npm run deploy-staging`. For production, run `npm run deploy-production`. This will upload to a typical path using your project's name, which is read from the root directory of your project (where `package.json` is located).

The this template by default does not include article headers, footers, meta tags or tracking logic. This is best for in-article deployment via pym.js, where the parent page will already include these components.

If you wish instead to publish the article entirely on the static server, this template includes the four components mentioned above. Header and footer components need no configuration — simply import them to the App.svelte component. Meta.svelte and GATracking.svelte components should also be included in the App.svelte component, and will require the complete data from `/src/config/seo.json` filled out and passed in to each component as a prop for proper tracking.