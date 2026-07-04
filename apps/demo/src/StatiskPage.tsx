import { AlertLabel, Logo, NavigationBar, TextLink } from "kobber";
import { Gallery } from "./pages/Gallery";
import * as styles from "./pages/pages.css";

/**
 * The components page as served prerendered: this tree is rendered to
 * static HTML at build time (scripts/prerender.mjs) and hydrated in the
 * browser — the same components also run purely client-side in the SPA.
 */
export function StatiskPage() {
  return (
    <>
      <NavigationBar logo={<Logo />} />
      <div className={styles.main}>
        <AlertLabel severity="informative">
          Denne siden er prerendret statisk HTML som hydreres i nettleseren. Samme komponentside
          finnes klientrendret i <TextLink href="./#/komponenter">SPA-versjonen</TextLink>.
        </AlertLabel>
      </div>
      <Gallery />
    </>
  );
}
