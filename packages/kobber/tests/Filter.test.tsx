import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Filter } from "../src/components";

describe("Filter", () => {
  it("exposes selected state via aria-pressed", () => {
    const { rerender } = render(<Filter>Grunnskole</Filter>);
    expect(screen.getByRole("button")).toHaveProperty("ariaPressed", "false");

    rerender(<Filter selected>Grunnskole</Filter>);
    expect(screen.getByRole("button")).toHaveProperty("ariaPressed", "true");
  });

  it("shows the counter only when count is set", () => {
    const { rerender } = render(<Filter>Grunnskole</Filter>);
    expect(screen.getByRole("button").textContent).toBe("Grunnskole");

    rerender(<Filter count={120}>Grunnskole</Filter>);
    expect(screen.getByRole("button").textContent).toBe("Grunnskole120");
  });
});
