// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Semicolon rules
      "semi": ["error", "always"],
      "semi-spacing": ["error", { "after": true, "before": false }],
      "semi-style": ["error", "last"],

      // Comma rules
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": ["error", { "after": true, "before": false }],
      "comma-style": ["error", "last"],
    },
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];

export default eslintConfig;