module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended'
    ],
    env: {
        node: true,
        es2020: true
    },
    rules: {
        'no-console': 'warn',
        'no-debugger': 'error',
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    }
};
