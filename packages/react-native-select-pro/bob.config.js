module.exports = {
    source: 'src',
    output: 'dist',
    targets: [
        'module',
        [
            'typescript',
            {
                project: 'tsconfig.build.json',
            },
        ],
    ],
};
