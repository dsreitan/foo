// Bakes the prerendered page into the built statisk.html.
// Runs after `vite build` (client) + `vite build --ssr` (server bundle).
import { readFileSync, rmSync, writeFileSync } from "node:fs";

const { render } = await import("../dist-ssr/entry-server.js");

const file = new URL("../dist/statisk.html", import.meta.url);
const template = readFileSync(file, "utf8");
if (!template.includes("<!--ssr-outlet-->")) {
  throw new Error("statisk.html is missing the <!--ssr-outlet--> marker");
}
writeFileSync(file, template.replace("<!--ssr-outlet-->", render()));
rmSync(new URL("../dist-ssr/", import.meta.url), { recursive: true, force: true });
console.log("statisk.html prerendered");
