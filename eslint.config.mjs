import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";
import filenames from "eslint-plugin-filenames";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeysShorthand from "eslint-plugin-sort-keys-shorthand";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";
import magicNumbers from "@piro0919/eslint-config";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

/*
 * next lint の廃止に伴い .eslintrc.json から移した。ESLint 10 で起動ごと
 * 落ちる、または設定の検証に通らないものは外している。
 * - eslint-plugin-ext、eslint-config-google、eslint-config-standard、
 *   eslint-plugin-typescript-sort-keys: 2023 年以前で更新が止まっている
 * - eslint-plugin-postcss-modules: 2022 年で止まっており、ESLint 10 では
 *   1ファイル目で応答が返らなくなる
 * - filenames は context.getFilename() を呼ぶので @eslint/compat で包む
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "@types/**",
      "**/*.d.ts",
      "**/*.js",
      "**/*.mjs",
    ],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ),
  // eslint-config-next は 16 から flat 形式を直接出す
  ...nextCoreWebVitals,
  prettier,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      filenames: fixupPluginRules(filenames),
      "sort-destructure-keys": sortDestructureKeys,
      "sort-keys-shorthand": sortKeysShorthand,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "filenames/match-exported": ["error", ["camel", "pascal"]],
      "filenames/match-regex": "error",
      "filenames/no-index": "off",
      "import/newline-after-import": ["error", { count: 1 }],
      // 並べ替えの修正案を作る段で ESLint 10 では消えた API を呼んで落ちる
      "import/order": "off",
      "import/prefer-default-export": "error",
      "newline-before-return": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: [
            "break",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: [
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
        },
        { blankLine: "never", next: "import", prev: "*" },
        { blankLine: "never", next: "case", prev: "case" },
        { blankLine: "never", next: "const", prev: "const" },
        { blankLine: "never", next: "let", prev: "let" },
      ],
      quotes: ["error", "double"],
      "react-hooks/exhaustive-deps": [
        "error",
        { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
      ],
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-newline": ["error", { prevent: true }],
      "react/jsx-sort-props": "error",
      semi: ["error", "always"],
      "sort-destructure-keys/sort-destructure-keys": "error",
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      "sort-keys-shorthand/sort-keys-shorthand": [
        "error",
        "asc",
        { shorthand: "first" },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
    settings: {
      // eslint-plugin-react は React の版を自分で探そうとして ESLint 10 で落ちる
      react: { version: "19.3" },
    },
  },
  // 名前の無い数字を警告する（全リポジトリで共有する piro0919/eslint-config）
  ...magicNumbers(),
];

export default eslintConfig;
