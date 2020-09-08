// .eslintrc.js
module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "@vue/airbnb",
        "@vue/typescript",
        "@vue/typescript/recommended"
    ],
    rules: {},
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        ecmaVersion: 2018,
    },
};