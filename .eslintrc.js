module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['@mobile-reality/eslint-config/react-native', 'plugin:prettier/recommended'],
    globals: {
        JSX: true,
        module: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'no-void': 'off',
        'no-inline-comments': 'off',
        'line-comment-position': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
        '@typescript-eslint/no-unused-vars': ['error', { destructuredArrayIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'unicorn/prefer-module': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
    overrides: [
        {
            files: ['apps/expo/src/**/*.tsx'],
            rules: {
                'react-native/no-inline-styles': 'off',
                'react-native/no-color-literals': 'off',
            },
        },
    ],
};
