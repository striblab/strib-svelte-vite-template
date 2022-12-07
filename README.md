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

## Strib webfonts

The licenses for the webfonts used on the Star Tribune mean they can only be served from startribune.com
URLs, meaning they are blocked from localhost while you are developing. To get around this, the template
app serves the fonts from the `public/` directory. That means you need a `strib-webfonts/` folder with all
the relevant font files inside the `public/`, which you can get from someone who already has them.

## Deploying

Deployment is currently handled by a shell script (`strib-deploy.sh`) that has two dependencies:

[AWS CLI](https://aws.amazon.com/cli/) with properly configured credentials for the static.startribune.com bucket using the 'default' profile.

[jq](https://stedolan.github.io/jq/), which can be installed on a Mac via [Homebrew](https://brew.sh/):

```
brew install jq
```

To deploy to staging, run `npm run deploy-staging`. For production, run `npm run deploy-production`. This will upload to a typical path using your project's name, which is read from `package.json`. 