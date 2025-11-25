import { defineConfig, globalIgnores } from "eslint/config";
import geekslabConfig from "@geekslab/config/eslint.config.js";

const eslintConfig = defineConfig([
  ...geekslabConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
