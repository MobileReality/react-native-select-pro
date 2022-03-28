module.exports = {
    git: {
        commitMessage: 'chore: release v${version}',
        tagName: 'v${version}',
    },
    npm: {
        publish: true,
    },
    github: {
        release: true,
        web: true,
    },
    plugins: {
        '@release-it/conventional-changelog': {
            preset: 'conventionalcommits',
            ignoreRecommendedBump: true,
        },
    },
};
