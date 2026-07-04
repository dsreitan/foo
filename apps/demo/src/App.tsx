import { useEffect, useState } from "react";
import { Gallery } from "./pages/Gallery";
import { Example } from "./pages/Example";
import * as styles from "./App.css";

const routes = [
  { hash: "#/", title: "Komponenter" },
  { hash: "#/eksempel", title: "Eksempelside" },
];

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function App() {
  const hash = useHashRoute();

  if (hash === "#/eksempel") {
    return (
      <>
        <nav className={styles.nav} style={{ padding: "8px 16px" }}>
          {routes.map((route) => (
            <a
              key={route.hash}
              href={route.hash}
              className={styles.navLink}
              aria-current={hash === route.hash}
            >
              {route.title}
            </a>
          ))}
        </nav>
        <Example />
      </>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          {routes.map((route) => (
            <a
              key={route.hash}
              href={route.hash}
              className={styles.navLink}
              aria-current={hash === route.hash}
            >
              {route.title}
            </a>
          ))}
        </nav>
        <h1 className={styles.title}>Kobber komponenter</h1>
        <p className={styles.subtitle}>
          React-komponentbibliotek basert på Kobber-designsystemet i Figma. Bygget med Vite og
          vanilla-extract.
        </p>
      </header>

      <Gallery hash={hash} />
    </main>
  );
}

export default App;
