import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Dialog, ProgressBar, Skeleton, StatCard, Toast } from "../src";

describe("Dialog", () => {
  it("opens as a modal and closes via the close button", () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Slett innlevering?">
        Dette kan ikke angres.
      </Dialog>,
    );
    expect(screen.getByRole("heading", { name: "Slett innlevering?" })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Lukk" }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe("Toast", () => {
  it("is polite by default and interrupting for warning", () => {
    render(<Toast>Lagret</Toast>);
    expect(screen.getByRole("status").textContent).toContain("Lagret");
    render(<Toast severity="warning">Mistet tilkobling</Toast>);
    expect(screen.getByRole("alert")).toBeDefined();
  });
});

describe("ProgressBar", () => {
  it("exposes clamped value via aria", () => {
    render(<ProgressBar value={120} label="Emma Hansen" />);
    const bar = screen.getByRole("progressbar", { name: "Emma Hansen" });
    expect(bar.getAttribute("aria-valuenow")).toBe("100");
  });
});

describe("Skeleton", () => {
  it("is hidden from assistive tech", () => {
    const { container } = render(<Skeleton variant="circle" width={40} height={40} />);
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Aktive elever" value={5} />);
    expect(screen.getByText("Aktive elever")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
  });
});
