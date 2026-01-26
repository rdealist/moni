import base from "../../eslint.config.mjs";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...base,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
  },
];
