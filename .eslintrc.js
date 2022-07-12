module.exports = {
    extends: ['@mobile-reality/eslint-config/react-native'],
    rules: {
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
        {
            files: ['apps/e2e/e2e/*.**'],
            globals: {
                by: true,
                element: true,
                device: true,
                waitFor: true,
            },
            rules: {
                'react-native/no-inline-styles': 'off',
                'react-native/no-color-literals': 'off',
            },
        },
    ],
};
