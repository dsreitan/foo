import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfileCard, QuoteModule, TextModule } from "../src/components";

describe("QuoteModule", () => {
  it("uses figure/blockquote/figcaption semantics", () => {
    render(<QuoteModule attribution="Sigrid Undset">Å lese er å leve dobbelt.</QuoteModule>);
    const figure = screen.getByRole("figure");
    expect(figure.querySelector("blockquote")?.textContent).toContain("Å lese er å leve dobbelt.");
    expect(figure.querySelector("figcaption")?.textContent).toBe("Sigrid Undset");
  });
});

describe("TextModule", () => {
  it("renders a section with its children", () => {
    render(
      <TextModule color="brand-a" aria-label="Om Kobber">
        <p>Innhold</p>
      </TextModule>,
    );
    expect(screen.getByRole("region", { name: "Om Kobber" }).textContent).toContain("Innhold");
  });
});

describe("ProfileCard", () => {
  it("renders portrait alt and heading", () => {
    render(
      <ProfileCard title="Ola Nordmann" image={<img src="x.jpg" alt="Portrett av Ola Nordmann" />}>
        Redaktør
      </ProfileCard>,
    );
    expect(screen.getByRole("heading", { name: "Ola Nordmann" })).toBeDefined();
    expect(screen.getByRole("img", { name: "Portrett av Ola Nordmann" })).toBeDefined();
  });
});
