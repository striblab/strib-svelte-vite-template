/**
 * ### Client entry
 * Hydrates the prerendered fragments that `scripts/prerender.js` bakes into the
 * Arc codeblocks — `#proj-hero` and `#proj-body`. Either container may be absent:
 * the build target (Hero / Body / Both, persisted in `.prerender-default`) decides
 * which fragments exist, and a story usually embeds only one of the two codeblocks.
 *
 * There is deliberately no re-hydration loop here. Next used to re-render
 * codeblocks after our scripts had already run, which orphaned the mounted
 * components; a site-side fix now defers codeblock script execution until the
 * page's re-render cycle has finished, so a single pass on load is enough.
 */

import "./styles/tailwind.css";

import { hydrate } from "svelte";
import Hero from "./Hero.svelte";
import ArticleBody from "./ArticleBody.svelte";

/**
 * Hydrates one component into its codeblock container, no-op if absent.
 *
 * Hydration is unconditional. `hydrate()` looks for Svelte's server-render
 * markers and, finding none, clears the container and mounts from scratch
 * instead — so this one call covers the prerendered production markup and the
 * empty `<div>`s served by `npm run dev` alike, with no branch of our own.
 *
 * @param {import("svelte").Component<any, any, any>} Component Hero or ArticleBody.
 * @param {HTMLElement | null} target Container element, or `null` when this
 *   story does not embed the matching codeblock.
 * @returns {Record<string, any> | null} The component's exports, or `null` when
 *   there was no container to hydrate into.
 */
function hydrateComponent(Component, target) {
    if (!target) return null;
    return hydrate(Component, { target });
}

hydrateComponent(Hero, document.getElementById("proj-hero"));
hydrateComponent(ArticleBody, document.getElementById("proj-body"));
