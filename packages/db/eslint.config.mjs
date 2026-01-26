import base from "../../eslint.config.mjs";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...base,
  {
    files: ["**/*.{ts,tsx}", "**/*.cts", "**/*.mts"],
    languageOptions: {
      globals: {
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
];
