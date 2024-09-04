import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { fontWeight as defaultFontWeight } from "tailwindcss/defaultTheme";

export const fontWeight = {
  ...defaultFontWeight,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const satisfies ResolvableTo<KeyValuePair<string, string | number>>;
