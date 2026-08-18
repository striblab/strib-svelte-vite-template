import "./styles/tailwind.css";

import { mount, hydrate } from "svelte";
import Hero from "./Hero.svelte";
import ArticleBody from "./ArticleBody.svelte";

function instantiateComponent(Component, target) {
    if (!target) return null;
    try {
        return target.innerHTML.trim()
            ? hydrate(Component, { target })
            : mount(Component, { target });
    } catch {
        return null;
    }
}

instantiateComponent(Hero, document.getElementById("proj-hero"));
instantiateComponent(ArticleBody, document.getElementById("proj-body"));
