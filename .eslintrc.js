module.exports = {
    extends: 'eslint:recommended',
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 8,
    },
    plugins: ['prettier'],
    rules: {
        'no-console': 'off',
        'prettier/prettier': 'error',
    },
}
