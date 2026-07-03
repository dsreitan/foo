import { style } from "@vanilla-extract/css";
import { field } from "../TextInput/TextInput.css";

export { container, label } from "../TextInput/TextInput.css";

/** Same underlined field as TextInput, grown for multiline text. */
export const textarea = style([
  field,
  {
    minHeight: "5.5rem",
    resize: "vertical",
  },
]);
