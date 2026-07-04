import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./global.css";
import { StatiskPage } from "./StatiskPage";

const root = document.getElementById("root")!;
const page = (
  <StrictMode>
    <StatiskPage />
  </StrictMode>
);

// Production build ships prerendered HTML to hydrate; the dev server
// serves the template empty, so fall back to a normal client render.
if (root.hasChildNodes()) {
  hydrateRoot(root, page);
} else {
  createRoot(root).render(page);
}
