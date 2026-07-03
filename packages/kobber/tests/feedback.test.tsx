import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AlertAccordion, AlertBanner, AlertLabel, Counter } from "../src/components";

describe("AlertLabel", () => {
  it("is polite for success, interrupting for warning", () => {
    render(<AlertLabel severity="success">Lagret</AlertLabel>);
    expect(screen.getByRole("status").textContent).toContain("Lagret");

    render(<AlertLabel severity="warning">Feil</AlertLabel>);
    expect(screen.getByRole("alert").textContent).toContain("Feil");
  });
});

describe("AlertBanner", () => {
  it("renders a dismiss button only when onDismiss is set", () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<AlertBanner>Melding</AlertBanner>);
    expect(screen.queryByRole("button", { name: "Lukk" })).toBeNull();

    rerender(<AlertBanner onDismiss={onDismiss}>Melding</AlertBanner>);
    fireEvent.click(screen.getByRole("button", { name: "Lukk" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});

describe("AlertAccordion", () => {
  it("expands and collapses via the summary", () => {
    render(
      <AlertAccordion title="Detaljer">
        <p>Utdypende tekst</p>
      </AlertAccordion>,
    );
    const details = screen.getByText("Detaljer").closest("details")!;
    expect(details.open).toBe(false);

    fireEvent.click(screen.getByText("Detaljer"));
    expect(details.open).toBe(true);
  });
});

describe("Counter", () => {
  it("renders its value", () => {
    render(<Counter color="success">12</Counter>);
    expect(screen.getByText("12")).toBeDefined();
  });
});
