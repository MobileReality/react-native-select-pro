module.exports = {
    git: {
        commitMessage: 'chore: release ${version}',
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
        },
    },
};
