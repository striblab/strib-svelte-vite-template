import "./styles/tailwind.css";

import { mount, unmount, hydrate } from "svelte";
import Hero from "./Hero.svelte";
import ArticleBody from "./ArticleBody.svelte";

// --- Hero: hydrate if prerendered, then poll for CMS re-renders. ---
let heroApp;

function mountHero(target) {
    target.innerHTML = "";
    target.dataset.svelteMounted = "true";
    try {
        heroApp = mount(Hero, { target });
    } catch {
        heroApp = undefined;
    }
}

const heroTarget = document.getElementById("proj-hero");
if (heroTarget) {
    if (heroTarget.innerHTML.trim()) {
        try {
            heroApp = hydrate(Hero, { target: heroTarget });
            heroTarget.dataset.svelteMounted = "true";
        } catch {
            mountHero(heroTarget);
        }
    } else {
        mountHero(heroTarget);
    }
}

// --- Body: hydrate initially if prerendered, then poll for Piano re-renders. ---
let bodyApp;

function mountBody(target) {
    target.innerHTML = "";
    target.dataset.svelteMounted = "true";
    try {
        bodyApp = mount(ArticleBody, { target });
    } catch {
        bodyApp = undefined;
    }
}

const bodyTarget = document.getElementById("proj-body");
if (bodyTarget) {
    if (bodyTarget.innerHTML.trim()) {
        try {
            bodyApp = hydrate(ArticleBody, { target: bodyTarget });
            bodyTarget.dataset.svelteMounted = "true";
        } catch {
            mountBody(bodyTarget);
        }
    } else {
        mountBody(bodyTarget);
    }
}

// --- Shared interval: re-hydrate either hero or body if the CMS re-renders the code block. ---
setInterval(() => {
    const heroTgt = document.getElementById("proj-hero");
    if (heroTgt && !heroTgt.dataset.svelteMounted) {
        if (heroApp) {
            try {
                unmount(heroApp);
            } catch {
                /* old node already gone */
            }
            heroApp = undefined;
        }
        try {
            console.log("rehydrating hero");
            heroApp = hydrate(Hero, { target: heroTgt });
            heroTgt.dataset.svelteMounted = "true";
        } catch {
            console.log("remounting hero from scratch");
            mountHero(heroTgt);
        }
    }

    const bodyTgt = document.getElementById("proj-body");
    if (bodyTgt && !bodyTgt.dataset.svelteMounted) {
        if (bodyApp) {
            try {
                unmount(bodyApp);
            } catch {
                /* old node already gone */
            }
            bodyApp = undefined;
        }
        try {
            console.log("rehydrating body");

            bodyApp = hydrate(ArticleBody, { target: bodyTgt });
            bodyTgt.dataset.svelteMounted = "true";
        } catch {
            console.log("remounting body from scratch");
            mountBody(bodyTgt);
        }
    }
}, 500);
