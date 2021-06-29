module.exports = {
    root: true,
    extends: ['@react-native-community'],
    parser: '@typescript-eslint/parser',
    plugins: ['simple-import-sort'],
    rules: {
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Side effect imports.
                    ['^\\u0000'],
                    // Packages. `react` related packages come first.
                    ['^react', '^@?\\w'],
                    // Parent imports. Put `..` last.
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts', '*.tsx'],
            rules: {
                'no-console': 2,
                'no-debugger': 2,
                'object-shorthand': 2,
                'no-else-return': 2,
                'eslint-comments/no-unlimited-disable': 0,
                'react-hooks/exhaustive-deps': 0,
                'prefer-const': 2,
                'no-shadow': 0,
                'no-trailing-spaces': ['error', { ignoreComments: true }],
                'react-native/no-unused-styles': 2,
                eqeqeq: ['error'],
            },
        },
    ],
};
