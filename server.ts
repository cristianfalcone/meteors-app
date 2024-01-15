import fs from "node:fs/promises";
import polka from "polka";
import api from "./api";

const { PORT = 5173, NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";

const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

const app = polka();

app.use("/api", api);

let vite: Awaited<ReturnType<typeof import("vite").createServer>>;

if (isProduction) {
  const { default: sirv } = await import("sirv");
  app.use(sirv("./dist/client", { extensions: [] }));
} else {
  const { createServer } = await import("vite");

  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);
}

app.use("*", async (req, res) => {
  try {
    const { originalUrl: url } = req;

    let template, render;

    if (isProduction) {
      template = templateHtml;
      ({ render } = await import("./dist/server/server.js"!));
    } else {
      template = await fs.readFile("./web/index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      ({ render } = await vite.ssrLoadModule("server.tsx"));
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--ssr-head-->`, rendered.head ?? "")
      .replace(`<!--ssr-html-->`, rendered.html ?? "");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html").end(html);
  } catch (e) {
    res.statusCode = 500;
    if (e instanceof Error) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack ?? e);
      res.end(e.stack ?? e);
    } else {
      console.log(e);
      res.end("Server error");
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Meteors server started at port ${PORT}`);
});
