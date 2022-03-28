module.exports = {
    extends: ['@mobile-reality/eslint-config/react-native'],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
    },
    overrides: [
        {
            files: ['example/src/**/*.tsx'],
            rules: {
                'react-native/no-inline-styles': 'off',
                'react-native/no-color-literals': 'off',
            },
        },
    ],
};
