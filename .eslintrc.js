const path = require("path");

module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/recommended",
    "plugin:prettier/recommended",
    // must be last to allow it to override other configs
    "prettier",
  ],
};

const previous = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: path.resolve(__dirname, "src"),
        extensions: [".ts", ".tsx"],
      },
    },
  },
  env: {
    node: true,
    jest: true,
  },
  plugins: [
    "@typescript-eslint",
    "jsx-a11y",
    "jest",
    "import",
    "testing-library",
    "prettier",
  ],
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jsx-a11y/strict",
    "plugin:jest/recommended",
  ],
  rules: {
    "no-alert": "error",
    "no-console": "error",
    "no-var": "error",
    "prefer-const": "error",
    "react/jsx-fragments": ["error", "syntax"],
    "react/self-closing-comp": "error",
    "jest/expect-expect": [
      "error",
      {
        assertFunctionNames: ["expect", "expect*"],
      },
    ],

    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "no-unused-vars": "off",
        "no-undef": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
      },
    },
  ],
};
