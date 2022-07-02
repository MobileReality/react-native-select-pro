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
        "release-it-yarn-workspaces": true,
        '@release-it/conventional-changelog': {
            preset: 'conventionalcommits',
            ignoreRecommendedBump: true,
        },
    },
};
