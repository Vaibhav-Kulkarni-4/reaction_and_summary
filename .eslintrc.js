module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["react", "@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
  },
  ignorePatterns: ["node_modules"],
};
