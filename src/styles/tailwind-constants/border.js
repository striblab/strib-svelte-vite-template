import {
    borderRadius as defaultBorderRadius,
    borderWidth as defaultBorderWidth,
} from "tailwindcss/defaultTheme";

export const borderRadius = {
    ...defaultBorderRadius,
    none: "0rem",
    12: "1.2rem",
    24: "2.4rem",
    25: "2.5rem",
    full: "9999rem",
};

export const borderWidth = {
    ...defaultBorderWidth,
    DEFAULT: "1px",
    0: "0",
    2: "2px",
    3: "3px",
    4: "4px",
    6: "6px",
    8: "8px",
};
