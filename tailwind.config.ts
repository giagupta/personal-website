import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        "soft-blue": "#7BA7BC",
        charcoal: "#2C2C2C",
        tan: "#C4A882",
        "warm-gray": "#A89F91",
        "faded-rose": "#C9A9A6",
        "dusty-sage": "#A3B5A6",
        "muted-gold": "#D4B96A",
      },
      fontFamily: {
        serif: ["Crimson Pro", "Georgia", "serif"],
        sans: ["Karla", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
