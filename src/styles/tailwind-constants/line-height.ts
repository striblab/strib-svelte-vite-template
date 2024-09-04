import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { lineHeight as defaultLineHeight } from "tailwindcss/defaultTheme";

export const lineHeight = {
  ...defaultLineHeight,
  "heading-extra-tight": "1.1",
  "heading-tight": "1.15",
  "rich-text": "1.0938rem",
  "article-body-tight": "1.4",
  "article-body-normal": "1.35",
  description: "1.25",
  heading: "1.2",
  input: "0.9",
  link: "1.3",
  none: "1",
  normal: "1.5",
  title: "1.05",
} as const satisfies ResolvableTo<KeyValuePair<string, string | number>>;
