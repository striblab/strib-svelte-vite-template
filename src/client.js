import { hydrate } from "svelte";
import App from "./App.svelte";

let app;
const target = document.getElementById("proj-container");
const appMarkup = target.innerHTML;

function hydrateApp() {
  const target = document.getElementById("proj-container");
  app = hydrate(App, { target });
  if (target) target.setAttribute("data-svelte-hydrated", "true");
}

hydrateApp();

//this replicates React's DOM removal
// setTimeout(() => {
//   if (target) {
//     target.innerHTML = "";
//     target.innerHTML = appMarkup;
//     target.setAttribute("data-svelte-hydrated", "false");
//   }
//   console.log("dom nuked");
// }, 2000);

const rehydrateId = setInterval(() => {
  const isHydrated =
    document
      .getElementById("proj-container")
      .getAttribute("data-svelte-hydrated") === "true";

  if (!isHydrated) hydrateApp();
});

setTimeout(() => {
  clearInterval(rehydrateId);
}, 10000);

export default app;
