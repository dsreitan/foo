import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TextInput } from "../src/components";

describe("TextInput", () => {
  it("associates the label with the input", () => {
    render(<TextInput label="E-post" />);
    expect(screen.getByLabelText("E-post").tagName).toBe("INPUT");
  });

  it("passes native input props straight through", () => {
    render(<TextInput label="E-post" type="email" placeholder="navn@gyldendal.no" />);
    const input = screen.getByLabelText<HTMLInputElement>("E-post");
    expect(input.type).toBe("email");
    expect(input.placeholder).toBe("navn@gyldendal.no");

    fireEvent.change(input, { target: { value: "dagfinn@gyldendal.no" } });
    expect(input.value).toBe("dagfinn@gyldendal.no");
  });
});
