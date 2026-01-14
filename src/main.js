import "./styles/tailwind/utility.css";
import "./styles/tailwind/typography.css";
import "./styles/tailwind/tailwind.css";

import { mount, unmount } from "svelte";
import App from "./App.svelte";

let app;
let tgt = document.getElementById("proj-container");
tgt.innerHTML = "";
try {
  app = mount(App, {
    target: tgt,
  });
} catch {
  app = undefined;
}

setInterval(() => {
  // Need to refind target because a rerender would break the previous link
  let tgt = document.getElementById("proj-container");
  if (tgt.innerHTML === "") {
    if (app) unmount(app);
    try {
      app = mount(App, {
        target: tgt,
      });
    } catch {
      app = undefined;
    }
  }
}, 500);

export default app;
