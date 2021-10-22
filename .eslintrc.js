module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'react', 'import'],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [
    '.eslintrc.js',
    'babel.config.js',
    'node_modules/',
  ],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "error",
  },
};
