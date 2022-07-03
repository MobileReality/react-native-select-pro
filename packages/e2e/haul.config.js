import { makeConfig, withPolyfills } from '@haul-bundler/preset-0.60';

export default makeConfig({
    bundles: {
        index: {
            entry: withPolyfills('./index'),
        },
    },
});
