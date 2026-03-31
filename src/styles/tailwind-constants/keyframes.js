import { keyframes as defaultKeyframes } from "tailwindcss/defaultTheme";

export const keyframes = {
  ...defaultKeyframes,
  adhesiveFadeInSlideUp: {
    "0%": { opacity: "0", transform: "translate(-50%, 100%)" },
    "100%": { opacity: "1", transform: "translate(-50%, 0)" },
  },
  adhesiveFadeOutSlideDown: {
    "0%": { opacity: "1", transform: "translate(-50%, 0)", bottom: "0" },
    "100%": {
      opacity: "0",
      transform: "translate(-50%, 100%)",
      bottom: "-100%",
    },
  },
};
