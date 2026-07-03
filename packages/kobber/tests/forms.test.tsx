import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox, Radiobutton, Search, Switch, TextArea } from "../src/components";

describe("Checkbox", () => {
  it("toggles through the label and fires onChange", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Godta vilkår" onChange={onChange} />);
    const input = screen.getByRole<HTMLInputElement>("checkbox", { name: "Godta vilkår" });
    expect(input.checked).toBe(false);

    fireEvent.click(screen.getByText("Godta vilkår"));
    expect(onChange).toHaveBeenCalledOnce();
    expect(input.checked).toBe(true);
  });

  it("does not toggle when disabled", () => {
    render(<Checkbox label="Låst" disabled />);
    const input = screen.getByRole<HTMLInputElement>("checkbox", { name: "Låst" });
    fireEvent.click(screen.getByText("Låst"));
    expect(input.checked).toBe(false);
  });
});

describe("Radiobutton", () => {
  it("selects one option per name group", () => {
    render(
      <>
        <Radiobutton name="valg" value="a" label="Valg A" />
        <Radiobutton name="valg" value="b" label="Valg B" />
      </>,
    );
    const a = screen.getByRole<HTMLInputElement>("radio", { name: "Valg A" });
    const b = screen.getByRole<HTMLInputElement>("radio", { name: "Valg B" });

    fireEvent.click(a);
    expect(a.checked).toBe(true);

    fireEvent.click(b);
    expect(b.checked).toBe(true);
    expect(a.checked).toBe(false);
  });
});

describe("Switch", () => {
  it("exposes role switch and toggles", () => {
    render(<Switch label="Varsler" />);
    const input = screen.getByRole<HTMLInputElement>("switch", { name: "Varsler" });
    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });
});

describe("TextArea", () => {
  it("associates the label and accepts text", () => {
    render(<TextArea label="Melding" />);
    const textarea = screen.getByLabelText<HTMLTextAreaElement>("Melding");
    expect(textarea.tagName).toBe("TEXTAREA");
    fireEvent.change(textarea, { target: { value: "Hei" } });
    expect(textarea.value).toBe("Hei");
  });
});

describe("Search", () => {
  it("is a search input with a default accessible name", () => {
    const onChange = vi.fn();
    render(<Search onChange={onChange} />);
    const input = screen.getByRole<HTMLInputElement>("searchbox", { name: "Søk" });
    fireEvent.change(input, { target: { value: "kobber" } });
    expect(onChange).toHaveBeenCalledOnce();
    expect(input.value).toBe("kobber");
  });
});
