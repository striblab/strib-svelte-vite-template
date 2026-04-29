import "./styles/tailwind.css";

import { mount, unmount, hydrate } from "svelte";
import Hero from "./Hero.svelte";
import ArticleBody from "./ArticleBody.svelte";

let heroApp = null;
let bodyApp = null;

function instantiateComponent(Component, target) {
    if (!target) return null;
    try {
        const app = target.innerHTML.trim()
            ? hydrate(Component, { target })
            : mount(Component, { target });
        target.dataset.svelteMounted = "true";
        return app;
    } catch {
        return null;
    }
}

heroApp = instantiateComponent(Hero, document.getElementById("proj-hero"));
bodyApp = instantiateComponent(
    ArticleBody,
    document.getElementById("proj-body"),
);

setInterval(() => {
    const hero = document.getElementById("proj-hero");
    const body = document.getElementById("proj-body");

    if (hero && hero.dataset.svelteMounted !== "true") {
        console.log("remounting custom hero...");
        try {
            unmount(heroApp);
        } catch {
            /* node already gone */
        }
        heroApp = instantiateComponent(Hero, hero);
    }
    if (body && body.dataset.svelteMounted !== "true") {
        console.log("remounting custom body...");

        try {
            unmount(bodyApp);
        } catch {
            /* node already gone */
        }
        bodyApp = instantiateComponent(ArticleBody, body);
    }
}, 500);
