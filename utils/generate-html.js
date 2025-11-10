//node script to access server bundled App and write markup to index.html
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { render } from "svelte/server";

// @ts-ignore
import ServerComponent from "../dist/server/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientIndexHtmlPath = path.resolve(__dirname, "../dist/index.html");
const outputIndexHtmlPath = path.resolve(__dirname, "../dist/index.html");

async function renderAndInjectHtml() {
  try {
    //@ts-ignore
    const { body } = render(ServerComponent, { props: {} });

    let indexHtml = fs.readFileSync(clientIndexHtmlPath, "utf8");

    indexHtml = indexHtml.replace(
      "<!-- SSR_CONTENT_PLACEHOLDER -->",
      `${body}`
    );

    fs.writeFileSync(outputIndexHtmlPath, indexHtml);
    console.log(
      "✅ index.html has been successfully server-rendered and updated."
    );
  } catch (error) {
    console.error("❌ Error during SSR generation:", error);
  }
}

renderAndInjectHtml();
