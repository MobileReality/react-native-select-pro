// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('metro-cache');
const path = require('node:path');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];
// #3 - Force resolving nested modules to the folders below
config.resolver.disableHierarchicalLookup = true;

// Use turborepo to restore the cache when possible
config.cacheStores = [
    new FileStore({ root: path.join(projectRoot, 'node_modules', '.cache', 'metro') }),
];

module.exports = config;
