import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { fontSize as defaultFontSize } from "tailwindcss/defaultTheme";

export const fontSize = {
  ...defaultFontSize,
  11: "0.6875rem", // 11px
  12: "0.75rem", // 12px
  14: "0.875rem", // 14px
  15: "0.9375rem", // 15px
  16: "1.0rem", // 16px
  17: "1.0625rem", //17px
  18: "1.125rem", // 18px
  19: "1.1875rem", // 19px
  20: "1.25rem", // 20px
  22: "1.375rem", // 22px
  23: "1.438rem", // 23px
  24: "1.5rem", // 24px
  26: "1.625rem", // 26px
  28: "1.75rem", // 28px
  30: "1.875rem", // 30px
  32: "2.0rem", // 32px
  34: "2.125rem", // 34px
  36: "2.25rem", //36px
  38: "2.375rem", //38px
  40: "2.5rem", // 40px
  42: "2.625rem", // 42px
  44: "2.75rem", //44px
  45: "2.8125rem", //45px
  46: "2.875rem", //46px
  48: "3.0rem", // 48px
  52: "3.25rem", // 52px
  55: "3.375rem", // 54px
  56: "3.5rem", // 56px
  60: "3.75rem", // 60px
  64: "4rem", //64px
  65: "4.0625rem", // 65px
  66: "4.125rem", // 66px
  72: "4.5rem", // 72px
  78: "4.875rem", // 78px
  82: "5.125rem", // 82px
  85: "5.3125rem", //85px
  110: "6.875rem", // 110px
  120: "7.5rem", // 120px
} as const satisfies
  | ResolvableTo<
      KeyValuePair<
        string,
        | string
        | [fontSize: string, lineHeight: string]
        | [
            fontSize: string,
            configuration: Partial<{
              lineHeight: string;
              letterSpacing: string;
              fontWeight: string | number;
            }>,
          ]
      >
    >
  | undefined;
