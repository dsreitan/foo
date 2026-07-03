import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../src/components";
import { variant } from "../src/components/Button/Button.css";

describe("Button", () => {
  it("fires onClick", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Klikk</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Klikk" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies the variant class", () => {
    render(<Button variant="success-b">Lagre</Button>);
    expect(screen.getByRole("button").className).toContain(variant["success-b"]);
  });

  it("merges a consumer className instead of dropping it", () => {
    render(<Button className="mine">Klikk</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("mine");
    expect(button.className).toContain(variant["brand-primary-a"]);
  });

  it("does not fire when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Klikk
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
