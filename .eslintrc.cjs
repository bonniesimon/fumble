module.exports = {
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
         jsx: true,
      },
   },
   plugins: ["perfectionist", "@typescript-eslint"],
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "@electron-toolkit",
      "@electron-toolkit/eslint-config-prettier",
   ],
   settings: {
      react: {
         version: "detect",
      },
   },
   rules: {
      "react/prop-types": 0,
      "perfectionist/sort-imports": [
         "error",
         {
            type: "natural",
            order: "asc",
         },
      ],
   },
};
