module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard",
    "@vue/typescript/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "interface-name": "off",
    "no-consecutive-blank-lines": "off",
    "object-literal-sort-keys": "off",
    "ordered-imports": "off",
    "no-var-keyword": "off",
    "no-var-requires": "off",
    "quotemark": "off",
    "trailing-comma": "off",
    "no-console": "off",
    "radix": "off",
    "jsdoc-format": "off",
    "forin": "off",
    "arrow-parens": "off",
    "variable-name": "off",
    "no-empty": "off",
    "max-line-length": "off",
    "semi": "off",
    "quote-props": "off",
    "quotes": "off",
    "space-before-function-paren": 0,
    "object-curly-spacing": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "comma-dangle": "off",
    "vue/no-parsing-error": "off",
    "vue/no-use-v-if-with-v-for": "off",
    "no-self-assign": "off",
    "no-control-regex": "off",
  }
}
