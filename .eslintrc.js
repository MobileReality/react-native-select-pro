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
                    ['^\\u0000'],
                    ['^react', '^@?\\w'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'react/jsx-sort-props': 'error',
        'react/destructuring-assignment': 'error',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'no-console': ['error', { allow: ['warn', 'error'] }],
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
