import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown, DropdownItem } from "../src/components";

function renderDropdown(onSelect = vi.fn()) {
  render(
    <Dropdown label="Meny">
      <DropdownItem onClick={onSelect}>Valg A</DropdownItem>
    </Dropdown>,
  );
  return onSelect;
}

describe("Dropdown", () => {
  it("opens on trigger click and closes after selecting an item", () => {
    const onSelect = renderDropdown();
    const trigger = screen.getByRole("button", { name: "Meny" });

    expect(screen.queryByRole("button", { name: "Valg A" })).toBeNull();
    fireEvent.click(trigger);

    const item = screen.getByRole("button", { name: "Valg A" });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(item);
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("button", { name: "Valg A" })).toBeNull();
  });

  it("closes on Escape", () => {
    renderDropdown();
    fireEvent.click(screen.getByRole("button", { name: "Meny" }));
    expect(screen.queryByRole("button", { name: "Valg A" })).not.toBeNull();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("button", { name: "Valg A" })).toBeNull();
  });
});
