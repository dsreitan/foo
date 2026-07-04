// Accessibility sweep: axe-core against every demo route + statisk.html,
// at desktop and mobile (hamburger menus open). See docs/a11y-audit.md.
//
// axe-core is not a project dependency (kept out of the tree on purpose);
// fetch it once and point the script at it:
//   npm pack axe-core && tar xzf axe-core-*.tgz package/axe.min.js
//   vite preview --port 4173 &
//   node scripts/axe-audit.mjs package/axe.min.js
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const axePath = process.argv[2];
if (!axePath) {
  console.error("Usage: node scripts/axe-audit.mjs <path-to-axe.min.js> [baseUrl]");
  process.exit(1);
}
const axeSource = readFileSync(axePath, "utf8");
const base = process.argv[3] ?? "http://localhost:4173";

const routes = [
  "#/",
  "#/komponenter",
  "#/sok",
  "#/butikk",
  "#/dashbord",
  "#/presentasjon",
  "#/elever",
  "#/lekser",
  "#/innhold",
  "#/video",
  "#/arbeidsflate",
  "#/lab",
];

const browser = await chromium.launch();
let failed = false;

async function audit(page, name) {
  await page.addScriptTag({ content: axeSource });
  const res = await page.evaluate(async () => await window.axe.run(document));
  const violations = res.violations.map(
    (v) => `${v.id} (${v.impact}, ${v.nodes.length} nodes): ${v.help}`,
  );
  console.log(name, "→", violations.length ? "" : "OK");
  for (const v of violations) console.log("  ", v);
  if (violations.length) failed = true;
}

const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const hash of routes) {
  await desktop.goto(`${base}/${hash}`, { waitUntil: "networkidle" });
  await desktop.waitForTimeout(250);
  await audit(desktop, hash);
}
await desktop.goto(`${base}/statisk.html`, { waitUntil: "networkidle" });
await audit(desktop, "statisk.html");

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`${base}/#/`, { waitUntil: "networkidle" });
for (const btn of await mobile.getByRole("button", { name: "Meny" }).all()) {
  await btn.click().catch(() => {});
}
await audit(mobile, "#/ (mobile, menus open)");

await browser.close();
process.exit(failed ? 1 : 0);
