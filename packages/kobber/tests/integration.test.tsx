/**
 * Consumer-integration contracts: router links via the `as` prop and
 * DOM refs via forwardRef (React 18 compatible).
 */
import { createRef, type AnchorHTMLAttributes } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Checkbox, MenuItem, NavigationCard, Search, Switch, TextInput, TextLink } from "../src";

/** Stand-in for react-router/TanStack Link: `to` instead of `href`. */
function RouterLink({ to, ...props }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={to} data-router {...props} />;
}

describe("router links via as", () => {
  it("TextLink renders the router component with its props", () => {
    render(
      <TextLink as={RouterLink} to="/laeremidler">
        Læremidler
      </TextLink>,
    );
    const link = screen.getByRole("link", { name: "Læremidler" });
    expect(link.getAttribute("href")).toBe("/laeremidler");
    expect(link.hasAttribute("data-router")).toBe(true);
    expect(link.className).not.toBe("");
  });

  it("MenuItem keeps aria-current on a router link", () => {
    render(
      <MenuItem as={RouterLink} to="/oversikt" active>
        Oversikt
      </MenuItem>,
    );
    const link = screen.getByRole("link", { name: "Oversikt" });
    expect(link.getAttribute("aria-current")).toBe("page");
    expect(link.getAttribute("href")).toBe("/oversikt");
  });

  it("NavigationCard stays one named link through a router component", () => {
    render(<NavigationCard as={RouterLink} to="/omrade" title="Grunnskole" />);
    expect(screen.getByRole("link", { name: "Grunnskole" }).getAttribute("href")).toBe("/omrade");
  });
});

describe("forwardRef to the native element", () => {
  it("form controls expose their input", () => {
    const text = createRef<HTMLInputElement>();
    const check = createRef<HTMLInputElement>();
    const toggle = createRef<HTMLInputElement>();
    const search = createRef<HTMLInputElement>();
    render(
      <>
        <TextInput ref={text} label="Navn" />
        <Checkbox ref={check} label="Godta" />
        <Switch ref={toggle} label="Varsler" />
        <Search ref={search} />
      </>,
    );
    expect(text.current?.tagName).toBe("INPUT");
    expect(check.current?.type).toBe("checkbox");
    expect(toggle.current?.getAttribute("role")).toBe("switch");
    text.current?.focus();
    expect(document.activeElement).toBe(text.current);
    expect(search.current?.type).toBe("search");
  });
});
