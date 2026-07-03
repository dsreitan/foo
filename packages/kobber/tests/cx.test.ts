import { describe, expect, it } from "vitest";
import { cx } from "../src/utils/cx";

describe("cx", () => {
  it("joins classes and drops falsy values", () => {
    expect(cx("a", false, undefined, "b", null, "")).toBe("a b");
  });
});
