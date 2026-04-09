import "./styles/tailwind.css";

import { mount, unmount, hydrate } from "svelte";
import Hero from "./Hero.svelte";
import ArticleBody from "./ArticleBody.svelte";

// --- Hero: hydrate if prerendered, otherwise mount. No polling needed (stable CMS zone). ---
const heroTarget = document.getElementById("proj-hero");
if (heroTarget) {
    if (heroTarget.innerHTML.trim()) {
        hydrate(Hero, { target: heroTarget });
    } else {
        mount(Hero, { target: heroTarget });
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
