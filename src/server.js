import { render as svelteRender } from "svelte/server";
import App from "./App.svelte";

export function render() {
  const { body } = svelteRender(App);

  return { body };
}

export default App;
