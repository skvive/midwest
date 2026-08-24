import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#122b52",
          navy2: "#0e2140",
          gold: "#b98a2f",
          goldsoft: "#e8c87a",
          paper: "#faf9f6",
          line: "#e7e3d8",
          slate: "#4c5568",
          muted: "#6b7385",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Noto Sans KR",
          "Apple SD Gothic Neo",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
