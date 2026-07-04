import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  Button,
  ContextualNavigationBar,
  Dropdown,
  DropdownItem,
  InfoCard,
  Logo,
  MenuItem,
  NavigationCard,
  Popover,
  createDam,
} from "../src";

describe("createDam", () => {
  const dam = createDam({ baseUrl: "https://dam.test.gyldendal.no/" });

  it("builds original and preview urls", () => {
    expect(dam.originalUrl("abc 1")).toBe("https://dam.test.gyldendal.no/original/abc%201");
    expect(dam.previewUrl("abc", { width: 240, quality: 80, crop: "fill", format: "webp" })).toBe(
      "https://dam.test.gyldendal.no/preview/abc?width=240&quality=80&crop=fill&format=webp",
    );
  });

  it("omits the query when no options are given", () => {
    expect(dam.previewUrl("abc")).toBe("https://dam.test.gyldendal.no/preview/abc");
  });
});

describe("Logo", () => {
  it("has an accessible name via alt", () => {
    render(<Logo alt="Gyldendal Norsk Forlag" />);
    expect(screen.getByRole("img", { name: "Gyldendal Norsk Forlag" })).toBeDefined();
  });
});

describe("Popover", () => {
  it("opens from the trigger and closes on Escape with focus return", () => {
    render(
      <Popover trigger={<Button>Vis info</Button>}>
        <p>Innhold</p>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Vis info" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Innhold")).toBeDefined();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Innhold")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});

describe("Dropdown keyboard navigation", () => {
  it("moves focus between items with arrow keys and wraps", async () => {
    render(
      <Dropdown label="Meny">
        <DropdownItem>Første</DropdownItem>
        <DropdownItem>Andre</DropdownItem>
      </Dropdown>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Meny" }));
    const menu = screen.getByText("Første").parentElement!;

    screen.getByRole("button", { name: "Første" }).focus();
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement?.textContent).toBe("Andre");

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement?.textContent).toBe("Første");

    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement?.textContent).toBe("Andre");
  });
});

describe("MenuItem", () => {
  it("renders anchor with href and button without", () => {
    render(
      <>
        <MenuItem href="/side" active>
          Lenke
        </MenuItem>
        <MenuItem onClick={() => {}}>Handling</MenuItem>
      </>,
    );
    expect(screen.getByRole("link", { name: "Lenke" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("button", { name: "Handling" })).toBeDefined();
  });
});

describe("ContextualNavigationBar", () => {
  it("is a separately labelled navigation landmark", () => {
    render(
      <ContextualNavigationBar label="Seksjonsmeny" actions={<Button>Ny</Button>}>
        <MenuItem href="/a">Oversikt</MenuItem>
      </ContextualNavigationBar>,
    );
    expect(screen.getByRole("navigation", { name: "Seksjonsmeny" })).toBeDefined();
  });
});

describe("NavigationCard", () => {
  it("is one link named by its title", () => {
    render(<NavigationCard href="/omrade" title="Grunnskole" />);
    expect(screen.getByRole("link", { name: "Grunnskole" }).getAttribute("href")).toBe("/omrade");
  });
});

describe("InfoCard", () => {
  it("renders heading and body", () => {
    render(
      <InfoCard title="Sigrid Undset" image={<img src="x.jpg" alt="Portrett av Sigrid Undset" />}>
        Forfatter
      </InfoCard>,
    );
    expect(screen.getByRole("heading", { name: "Sigrid Undset" })).toBeDefined();
    expect(screen.getByRole("img", { name: "Portrett av Sigrid Undset" })).toBeDefined();
  });
});
