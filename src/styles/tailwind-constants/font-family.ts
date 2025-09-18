import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { fontFamily as defaultFontFamily } from "tailwindcss/defaultTheme";

const fallbackFont = "sans-serif";

export const fontFamily = {
  ...defaultFontFamily,
  "popular-bold": ["popular-bold", fallbackFont],
  "popular-light": ["popular-light", fallbackFont],
  "popular-medium": ["popular-medium", fallbackFont],
  "popular-regular": ["popular-regular", fallbackFont],
  "graphik-regular": ["graphik-regular", fallbackFont],
  "graphik-medium": ["graphik-medium", fallbackFont],
  "graphik-italic": ["graphik-italic", fallbackFont],
  "graphik-semibold": ["graphik-semibold", fallbackFont],
  "graphik-bold": ["graphik-bold", fallbackFont],
  "graphik-bold-italic": ["graphik-bold-italic", fallbackFont],
  "graphik-condensed-medium": ["graphik-condensed-medium", fallbackFont],
  "publico-text-roman": ["publico-text-roman", fallbackFont],
  "publico-text-italic": ["publico-text-italic", fallbackFont],
  "publico-text-bold": ["publico-text-bold", fallbackFont],
  "publico-text-bold-italic": ["publico-text-bold-italic", fallbackFont],
  "publico-headline-banner": ["publico-headline-banner", fallbackFont],
  "publico-headline-roman": ["publico-headline-roman", fallbackFont],
  "publico-headline-medium": ["publico-headline-medium", fallbackFont],
  "publico-headline-italic": ["publico-headline-italic", fallbackFont],
  "publico-headline-light-italic": [
    "publico-headline-light-italic",
    fallbackFont,
  ],
  "font-publico-headline-medium": [
    "font-publico-headline-medium",
    fallbackFont,
  ],
  "publico-headline-condensed-medium": [
    "publico-headline-condensed-medium",
    fallbackFont,
  ],
  "publico-headline-condensed-black": [
    "publico-headline-condensed-black",
    fallbackFont,
  ],
  "publico-headline-xcondensed-light": [
    "publico-headline-xcondensed-light",
    fallbackFont,
  ],
  "publico-banner-light-italic": ["publico-banner-light-italic", fallbackFont],
  "publico-banner-light": ["publico-banner-light", fallbackFont],

  "publico-banner-condensed-medium": [
    "publico-banner-condensed-medium",
    fallbackFont,
  ],
  "publico-banner-condensed-black": [
    "publico-banner-condensed-black",
    fallbackFont,
  ],
  "publico-banner-xcondensed-light": [
    "publico-banner-xcondensed-light",
    fallbackFont,
  ],
  "publico-banner-black": [
    "publico-banner-black",
    fallbackFont,
  ],
  "publico-headline-black": [
    "publico-headline-black",
    fallbackFont,
  ],
  "graphik-semibold-italic": [
    "graphik-semibold-italic",
    fallbackFont,
  ],
  "publico-headline-black-italic": [
    "publico-headline-black-italic",
    fallbackFont,
  ],
  "barlow-italic": ["barlow-italic", fallbackFont],
  "barlow-regular": ["barlow-regular", fallbackFont],
  "barlow-semibold": ["barlow-semibold", fallbackFont],
  "barlow-semibold-italic": ["barlow-semibold-italic", fallbackFont],
  "barlow-condensed-medium": ["barlow-condensed-medium", fallbackFont],
  "barlow-condensed-semibold": ["barlow-condensed-semibold", fallbackFont],
  roboto: ["roboto", fallbackFont],
  sans: ["Helvetica", "Arial", "sans-serif"],
} as const satisfies
  | ResolvableTo<
      KeyValuePair<
        string,
        | string
        | string[]
        | [
            fontFamily: string | string[],
            configuration: Partial<{
              fontFeatureSettings: string;
              fontVariationSettings: string;
            }>,
          ]
      >
    >
  | undefined;
