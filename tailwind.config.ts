import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1920px",
        lg: "1440px",
        pc: "744px",
      },
      fontFamily: {},
      backgroundImage: {},
    },
  },
  plugins: [require("daisyui")],
};
export default config;
