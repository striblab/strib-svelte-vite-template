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

setInterval(() => {
    const tgt = document.getElementById("proj-hero");
    if (!tgt) return;

    // Re-mount if the element lost Svelte's marker (DOM was blown away by Piano/CMS)
    if (!tgt.dataset.svelteMounted) {
        if (heroApp) {
            try { unmount(heroApp); } catch { /* old node already gone */ }
            heroApp = undefined;
        }
        mountHero(tgt);
    }
}, 500);

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
        } catch {
            mountBody(bodyTarget);
        }
    } else {
        mountBody(bodyTarget);
    }
}

setInterval(() => {
    const tgt = document.getElementById("proj-body");
    if (!tgt) return;

    // Re-mount if the element lost Svelte's marker (DOM was blown away by Piano/CMS)
    if (!tgt.dataset.svelteMounted) {
        if (bodyApp) {
            try { unmount(bodyApp); } catch { /* old node already gone */ }
            bodyApp = undefined;
        }
        mountBody(tgt);
    }
}, 500);
