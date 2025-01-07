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
      "no-unused-vars": "off",  // Disable unused-vars rule
      "no-call-signature": "off",  // Disable call signature error
      "@typescript-eslint/no-unused-vars": "off",  // Disable TypeScript unused-vars rule
      // Add more rules as needed
    },
  },
];

export default eslintConfig;
