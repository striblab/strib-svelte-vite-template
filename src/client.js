import { hydrate } from "svelte";
import App from "./App.svelte";

const app = hydrate(App, { target: document.getElementById("proj-container") });

export default app;
