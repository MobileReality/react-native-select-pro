module.exports = {
    git: {
        commitMessage: 'chore: release v${version}',
        tagName: 'v${version}',
    },
    npm: false,
    github: {
        release: true,
        web: true,
    },
    plugins: {
        "release-it-yarn-workspaces": {
            workspaces: [
                "packages/react-native-select-pro/*",
            ]
        },
        '@release-it/conventional-changelog': {
            preset: 'conventionalcommits',
            ignoreRecommendedBump: true,
        },
    },
};
