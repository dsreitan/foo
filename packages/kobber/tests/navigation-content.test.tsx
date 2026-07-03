import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  ContentCard,
  List,
  ListItem,
  ProductCard,
  TextLink,
} from "../src/components";

describe("TextLink", () => {
  it("renders an anchor with href", () => {
    render(<TextLink href="/side">Les mer</TextLink>);
    expect(screen.getByRole("link", { name: "Les mer" }).getAttribute("href")).toBe("/side");
  });

  it("disables via aria-disabled and removes tab focus", () => {
    render(
      <TextLink href="/side" disabled>
        Utilgjengelig
      </TextLink>,
    );
    const link = screen.getByText("Utilgjengelig");
    expect(link.getAttribute("aria-disabled")).toBe("true");
    expect(link.getAttribute("tabindex")).toBe("-1");
  });
});

describe("Breadcrumb", () => {
  it("marks the item without href as the current page", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Hjem</BreadcrumbItem>
        <BreadcrumbItem href="/laeremidler">Læremidler</BreadcrumbItem>
        <BreadcrumbItem>Matematikk 5</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "Brødsmulesti" })).toBeDefined();
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("Matematikk 5").getAttribute("aria-current")).toBe("page");
  });
});

describe("List", () => {
  it("renders ul or ol by the ordered prop", () => {
    const { rerender } = render(
      <List>
        <ListItem>En</ListItem>
      </List>,
    );
    expect(screen.getByRole("list").tagName).toBe("UL");

    rerender(
      <List ordered>
        <ListItem>En</ListItem>
      </List>,
    );
    expect(screen.getByRole("list").tagName).toBe("OL");
  });
});

describe("ContentCard", () => {
  it("renders meta, title and body", () => {
    render(
      <ContentCard title="Tittel" meta={<span>Nyhet</span>}>
        Ingress
      </ContentCard>,
    );
    expect(screen.getByRole("heading", { name: "Tittel" })).toBeDefined();
    expect(screen.getByText("Nyhet")).toBeDefined();
    expect(screen.getByText("Ingress")).toBeDefined();
  });
});

describe("ProductCard", () => {
  it("is a single link wrapping the whole card", () => {
    render(<ProductCard href="/bok" title="Matematikk 5" subtitle="Grunnbok" />);
    const link = screen.getByRole("link", { name: /Matematikk 5/ });
    expect(link.getAttribute("href")).toBe("/bok");
    expect(link.textContent).toContain("Grunnbok");
  });
});
