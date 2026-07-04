import { useState } from "react";
import { Button, ButtonGroup, MenuItem, Switch, Text, TextModule } from "kobber";
import * as styles from "./pages.css";

const slides = [
  {
    title: "Kobber i praksis",
    body: "Ett designsystem, alle produkter.",
    color: "brand-a" as const,
  },
  {
    title: "Tokens",
    body: "All stil kommer fra tokens — komponentene har ingen rå verdier.",
    color: "brand-b" as const,
  },
  {
    title: "Universell utforming",
    body: "APG-mønstre, norske standardtekster, alt-krav dokumentert.",
    color: "neutral-b" as const,
  },
  {
    title: "Veien videre",
    body: "Ikoner, fonter og logo fra DAM. Tema via CSS-variabler.",
    color: "neutral-a" as const,
  },
];

export function SlideshowPage() {
  const [index, setIndex] = useState(0);
  const [panelOpen, setPanelOpen] = useState(true);
  const slide = slides[index];

  return (
    <main className={styles.main}>
      <div className={styles.spread}>
        <Text variant="heading" size="medium" as="h1">
          Presentasjon
        </Text>
        <Switch
          label="Vis lysbildepanel"
          checked={panelOpen}
          onChange={(event) => setPanelOpen(event.target.checked)}
        />
      </div>
      <div className={styles.slideshow}>
        {panelOpen && (
          <nav aria-label="Lysbilder" className={styles.slidePanel}>
            {slides.map((s, i) => (
              <MenuItem key={s.title} active={i === index} onClick={() => setIndex(i)}>
                {i + 1}. {s.title}
              </MenuItem>
            ))}
          </nav>
        )}
        <TextModule
          color={slide.color}
          aria-label={`Lysbilde ${index + 1} av ${slides.length}`}
          className={styles.slide}
        >
          <Text variant="heading" size="large" as="h2">
            {slide.title}
          </Text>
          <Text variant="lead">{slide.body}</Text>
        </TextModule>
      </div>
      <ButtonGroup>
        <Button
          variant="brand-secondary-b"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          Forrige
        </Button>
        <Button disabled={index === slides.length - 1} onClick={() => setIndex(index + 1)}>
          Neste
        </Button>
        <Text variant="label" role="status">
          {index + 1} / {slides.length}
        </Text>
      </ButtonGroup>
    </main>
  );
}
