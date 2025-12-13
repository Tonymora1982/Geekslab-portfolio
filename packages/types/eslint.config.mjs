import typescriptConfig from "eslint-config-next/typescript";

const eslintConfig = [
  ...typescriptConfig,
  {
    ignores: [
      ".turbo/**",
      "dist/**",
    ],
  },
];

export default eslintConfig;
