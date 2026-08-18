import "./styles/tailwind.css";

import { hydrate } from "svelte";
import Hero from "./Hero.svelte";
import ArticleBody from "./ArticleBody.svelte";

function hydrateComponent(Component, target) {
    if (!target) return null;
    return hydrate(Component, { target });
}

hydrateComponent(Hero, document.getElementById("proj-hero"));
hydrateComponent(ArticleBody, document.getElementById("proj-body"));
