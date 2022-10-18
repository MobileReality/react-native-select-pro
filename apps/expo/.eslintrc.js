module.exports = {
    "extends": "@monorepo/eslint-config",
    overrides: [
        {
            files: ['src/**/*.tsx'],
            rules: {
                'react-native/no-inline-styles': 'off',
                'react-native/no-color-literals': 'off',
            },
        },
    ],
};
