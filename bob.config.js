module.exports = {
    source: 'packages/react-native-select-pro/src',
    output: 'packages/react-native-select-pro/lib',
    targets: [
        'commonjs',
        'module',
        [
            'typescript',
            {
                project: 'tsconfig.build.json',
            },
        ],
    ],
};
