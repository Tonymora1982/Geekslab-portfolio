/** @type {import('tailwindcss').Config} */
const sharedConfig = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#111827",
        secondary: "#1f2937",
        accent: "#2563eb"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "ui-monospace"]
      }
    }
  },
  plugins: []
};

export default sharedConfig;
