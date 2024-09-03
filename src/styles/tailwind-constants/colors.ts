import { colors as defaultColors } from "tailwindcss/defaultTheme";
import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from "tailwindcss/types/config";

export const colors = {
  ...defaultColors,
  none: "none",
  transparent: "transparent",
  "linear-gradient-black": "rgba(0,0,0,0.60)",
  "adhesion-green": "rgba(116, 158, 81, 0.40)",
  "layover-gray": "rgba(34, 34, 34, 0.60)",
  "custom-gray": "rgba(34, 34, 34, 0.30)",
  "article-heading": "#222222",
  text: {
    primary: "#0D0D0D",
    secondary: "#434343",
    tertiary: "#666666",
    disabled: "#AFAFAF",
    reversed: "#FFFFFF",
    "color-01": "#00854B",
    "color-02": "#05442E",
    "color-03": "#BAEC31",
  },
  border: {
    "subtle-01": "#E1E1E1",
    "subtle-02": "#AFAFAF",
    "strong-01": "#434343",
    "strong-02": "#0D0D0D",
    color: "#65CC5C",
    "color-01": "#00854B",
    "color-02": "#4DC044",
  },
  surface: {
    primary: "#FFFFFF",
    secondary: "#F2F2F2",
    reversed: "#0D0D0D",
    "color-01": "#00854B",
    "color-02": "#C8FA31",
    panel: "#F2F2F2",
  },
  base: {
    black: "#000000",
    white: "#FFFFFF",
  },
  neutral: {
    900: "#0D0D0D",
    800: "#282828",
    700: "#434343",
    600: "#666666",
    500: "#7e7e7e",
    400: "#969696",
    300: "#AFAFAF",
    200: "#CFCFCF",
    100: "#E1E1E1",
    50: "#F2F2F2",
  },
  red: {
    900: "#700000",
    800: "#851414",
    700: "#A01C1C",
    600: "#BB2020",
    500: "#cd2e2e",
    400: "#D65353",
    300: "#E36363",
    200: "#EA8B8B",
    100: "#F4BCBC",
    50: "#FBE7E7",
  },
  orange: {
    900: "#673112",
    800: "#944314",
    700: "#B95D27",
    600: "#DD7031",
    500: "#EC8244",
    400: "#F19865",
    300: "#F3A87C",
    200: "#F6BA98",
    100: "#F8D0B9",
    50: "#FAE4D1",
  },
  yellow: {
    900: "#4E4613",
    800: "#837520",
    700: "#AC9928",
    600: "#C6B12E",
    500: "#DEC737",
    400: "#F3D620",
    300: "#FAE24B",
    200: "#FFEC74",
    100: "#FFF2A3",
    50: "#FFF9D1",
  },
  lime: {
    900: "#3C4B0F",
    800: "#647D19",
    700: "#7A991E",
    600: "#8FB323",
    500: "#A4CF26",
    400: "#B6E32B",
    300: "#C8FA31",
    200: "#D6FB65",
    100: "#E4FD98",
    50: "#F1FECC",
  },
  spring: {
    900: "#22441F",
    800: "#2E6C28",
    700: "#3A8F32",
    600: "#40A937",
    500: "#4DC044",
    400: "#65CC5C",
    300: "#76D86E",
    200: "#9FE798",
    100: "#B7EFB3",
    50: "#DCF7D9",
  },
  emerald: {
    900: "#004A2B",
    800: "#006B3D",
    700: "#00854B",
    600: "#009958",
    500: "#00AC63",
    400: "#32B87F",
    300: "#66C29B",
    200: "#91D4B7",
    100: "#AAE3CB",
    50: "#E5F7EF",
  },
  forest: {
    900: "#002E1D",
    800: "#05442E",
    700: "#165A42",
    600: "#2E725B",
    500: "#50927B",
    400: "#75AF9B",
    300: "#8EC1AF",
    200: "#A6D4C3",
    100: "#C4E3D7",
    50: "#E1F0EB",
  },
  "light-blue": {
    900: "#004666",
    800: "#00608A",
    700: "#0075A8",
    600: "#0089C5",
    500: "#0098DB",
    400: "#26ADE8",
    300: "#4FBDED",
    200: "#78CDF2",
    100: "#AFE1F8",
    50: "#E5F5FB",
  },
  "dark-blue": {
    900: "#002D52",
    800: "#003966",
    700: "#0D4673",
    600: "#1B5A8B",
    500: "#3E75A2",
    400: "#5489B2",
    300: "#7CA6C5",
    200: "#9BBBD4",
    100: "#C1D6E6",
    50: "#DBEAF5",
  },
  purple: {
    900: "#3A2263",
    800: "#482B78",
    700: "#513286",
    600: "#5E3E94",
    500: "#6E4BAA",
    400: "#7F61B3",
    300: "#9D86C6",
    200: "#BAA8D7",
    100: "#C8B9DF",
    50: "#E3DBF0",
  },
} as const satisfies ResolvableTo<RecursiveKeyValuePair<string, string>>;