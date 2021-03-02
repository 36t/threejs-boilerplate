module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    parserOptions: {
        sourceType: 'module',
        project: "./tsconfig.json",
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier"
    ],
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        'prefer-const': 'error',
    }
}
