const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('expo/metro-config');

const workspaces = fs.readdirSync(path.resolve(__dirname, '../'));
const currentWorkspace = path.basename(__dirname);

module.exports = (async () => {
    const expoMetroConfig = await getDefaultConfig(__dirname);
    return {
        ...expoMetroConfig,
        projectRoot: __dirname,
        watchFolders: workspaces
            .filter((f) => f !== currentWorkspace)
            .map((f) => path.join(__dirname, '../', f)),
        resolver: {
            extraNodeModules: new Proxy(
                {},
                {
                    get: (target, name) =>
                        path.join(__dirname, `node_modules/${name}`),
                },
            ),
        },
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
    };
})();
