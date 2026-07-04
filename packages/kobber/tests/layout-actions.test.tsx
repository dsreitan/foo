import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  AccordionGroup,
  AccordionItem,
  Button,
  ButtonGroup,
  Collapsible,
  Divider,
  NavLink,
  NavLinkGroup,
} from "../src/components";

describe("Divider", () => {
  it("renders a separator with orientation", () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole("separator").getAttribute("aria-orientation")).toBe("vertical");
  });
});

describe("ButtonGroup", () => {
  it("groups its children", () => {
    render(
      <ButtonGroup>
        <Button>Lagre</Button>
        <Button variant="brand-secondary-b">Avbryt</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).toBeDefined();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});

describe("NavLink", () => {
  it("marks the active link with aria-current", () => {
    render(
      <NavLinkGroup label="Hovedmeny">
        <NavLink href="/a">Læremidler</NavLink>
        <NavLink href="/b" active>
          Forfattere
        </NavLink>
      </NavLinkGroup>,
    );
    expect(screen.getByRole("navigation", { name: "Hovedmeny" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Forfattere" }).getAttribute("aria-current")).toBe(
      "page",
    );
    expect(
      screen.getByRole("link", { name: "Læremidler" }).getAttribute("aria-current"),
    ).toBeNull();
  });
});

describe("Accordion", () => {
  it("expands items independently", () => {
    render(
      <AccordionGroup>
        <AccordionItem title="Første">Innhold A</AccordionItem>
        <AccordionItem title="Andre">Innhold B</AccordionItem>
      </AccordionGroup>,
    );
    const first = screen.getByText("Første").closest("details")!;
    const second = screen.getByText("Andre").closest("details")!;

    fireEvent.click(screen.getByText("Første"));
    expect(first.open).toBe(true);
    expect(second.open).toBe(false);
  });
});

describe("Collapsible", () => {
  it("toggles between expand and collapse labels", () => {
    render(
      <Collapsible>
        <p>Lang tekst</p>
      </Collapsible>,
    );
    const toggle = screen.getByRole("button", { name: "Vis mer" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Vis mindre" }).getAttribute("aria-expanded")).toBe(
      "true",
    );
  });
});
