const fallbackFont = "sans-serif";
import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  keyframes,
  borderRadius,
  borderWidth,
} from "./src/styles/tailwind-constants";

export const content = ["./src/**/*.svelte"];
export const theme = {
  fontFamily: {
    ...fontFamily,
  },
  extend: {
    screens: {
      xs: "320px",
      md: "768px",
      lg: "1160px",
      xl: "1440px",
    },
    colors: {
      ...colors,
    },
    keyframes: {
      ...keyframes,
    },
    animation: {
      adhesiveFadeInSlideUp: "adhesiveFadeInSlideUp 1s ease-in-out",
      adhesiveFadeOutSlideDown: "adhesiveFadeOutSlideDown 1s ease-in-out",
    },
    boxShadow: {
      custom: "0px 0px 34px 0px rgba(0, 0, 0, 0.12)",
      global: "0px 8px 24px 0px rgba(0, 0, 0, 0.08)",
    },
    fontSize: {
      ...fontSize,
    },
    fontWeight: {
      ...fontWeight,
    },
    letterSpacing: {
      ...letterSpacing,
    },
    lineHeight: {
      ...lineHeight,
    },
    borderRadius: {
      ...borderRadius,
    },
    borderWidth: {
      ...borderWidth,
    },
  },
};

export const future = {
  hoverOnlyWhenSupported: true,
};
