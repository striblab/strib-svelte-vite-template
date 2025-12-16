import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const ssrDevMiddlewarePlugin = () => ({
  name: "custom-ssr-dev-middleware",
  configureServer(server) {
    server.middlewares.use("/", async (req, res, next) => {
      if (req.originalUrl !== "/") return next();

      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await server.transformIndexHtml(req.originalUrl, template);
        const serverEntry = await server.ssrLoadModule("/src/server.js");

        const html = template.replace(
          `<!-- SSR_CONTENT_PLACEHOLDER -->`,
          serverEntry.render().body
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(html);
      } catch (e) {
        console.error("SSR Error in Vite Config:", e);
        server.ssrFixStacktrace(e);
        next(e);
      }
    });
  },
});

export default defineConfig({
  base: "",
  plugins: [svelte(), ssrDevMiddlewarePlugin()],
  server: {
    open: true,
  },
});
