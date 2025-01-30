// @ts-check
import angular from "angular-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    extends: [
      perfectionist.configs["recommended-natural"],
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
          },
        },
      },
    ],
    files: ["**/*.ts"],
    ignores: ["libs/**"],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: ["app", "component", "hlm"],
          style: "kebab-case",
          type: "element",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: ["app", "component", "hlm"],
          style: "camelCase",
          type: "attribute",
        },
      ],
      "@angular-eslint/prefer-on-push-component-change-detection": ["warn"],
      "@angular-eslint/prefer-standalone": ["warn"],
      "@typescript-eslint/no-floating-promises": "error",
      "no-console": ["warn"],
      "no-unused-vars": ["warn"],
      "perfectionist/sort-classes": [
        "error",
        {
          partitionByNewLine: true,
        },
      ],
    },
  },
  {
    extends: [
      perfectionist.configs["recommended-natural"],
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    files: ["**/*.html"],
    rules: {
      "@angular-eslint/template/attributes-order": [
        "warn",
        { alphabetical: true },
      ],
      "@angular-eslint/template/prefer-control-flow": ["warn"],
      "@angular-eslint/template/prefer-self-closing-tags": ["warn"],
    },
  },
);
