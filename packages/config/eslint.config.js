import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    ignores: [
      "**/.next/**",
      "**/.turbo/**",
      "**/dist/**",
      "**/out/**",
      "**/build/**",
      "**/node_modules/**"
    ]
  },
  js.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules
    }
  }
];

export default config;
