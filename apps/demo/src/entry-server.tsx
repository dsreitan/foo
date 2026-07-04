import { renderToString } from "react-dom/server";
import { StatiskPage } from "./StatiskPage";

/** Called by scripts/prerender.mjs at build time. */
export function render() {
  return renderToString(<StatiskPage />);
}
