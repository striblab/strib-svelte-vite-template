import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { letterSpacing as defaultLetterSpacing } from "tailwindcss/defaultTheme";

export const letterSpacing = {
  ...defaultLetterSpacing,
  tighter: "-0.05em",
  tight: "-0.01em",
  normal: "0.00em",
  wide: "0.01em",
  wider: "0.03em",
} as const satisfies ResolvableTo<KeyValuePair<string, string>>;
