import type { Config } from "tailwindcss";
import sharedConfig from "@geekslab/config/tailwind.config.js";

const config: Config = {
  presets: [sharedConfig],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
