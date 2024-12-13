// @ts-check

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import vitestPlugin from "@vitest/eslint-plugin";
import prettierPlugin from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import-x";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    name: "global ignore",
    ignores: ["next.config.ts", ".next", "tsconfig.json", "node_modules"],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tailwindPlugin.configs["flat/recommended"],
  {
    name: "general",
    plugins: {
      "import-x": importPlugin,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // @ts-ignore
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...importPlugin.flatConfigs.recommended.rules,
      "@next/next/no-img-element": "off",
      "import-x/named": "off",
      "import-x/order": "error",
      "import-x/no-unresolved": "off",
      "import-x/newline-after-import": "warn",
      "@typescript-eslint/strict-boolean-expressions": [
        "warn",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowAny: false,
        },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": [
        "error",
        {
          requireDefaultForNonUnion: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "ImportDeclaration[source.value='lucide-react'] > ImportSpecifier > Identifier:not([name=/Icon$/])",
          message:
            "lucide-reactからインポートする際は、インポート名の末尾を 'Icon' にしてください。",
        },
      ],
    },
  },
  {
    name: "test",
    files: ["**/*.spec.ts*", "**/*.test.ts*", "**/*.test-d.ts*"],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      "vitest/consistent-test-it": ["error", { fn: "it" }],
      "vitest/require-top-level-describe": ["error"],
    },
  },
  {
    name: "typescript",
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "class",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
        {
          selector: "variable",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "should", "has", "can", "did", "will"],
        },
        {
          selector: ["variableLike"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          trailingUnderscore: "allow",
        },
      ],
    },
  },
  prettierPlugin
);
