module.exports = {
    branches: ['main'],
    extends: "semantic-release-monorepo",
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        '@semantic-release/git',
        '@semantic-release/github',
    ],
};