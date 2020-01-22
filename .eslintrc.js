module.exports = {
  parser: "babel-eslint",
  extends: ["prettier", "prettier/react"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"]
  },
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  }
};
