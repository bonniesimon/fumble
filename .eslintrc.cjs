module.exports = {
   plugins: ["perfectionist"],
   extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "@electron-toolkit",
      "@electron-toolkit/eslint-config-prettier",
   ],
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
