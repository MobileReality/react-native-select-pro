// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'React Native Select Pro',
    url: 'https://mobilereality.github.io',
    baseUrl: '/react-native-select-pro/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'MobileReality',
    projectName: 'react-native-select-pro',
    clientModules: [require.resolve('./snackPlayerInitializer.js')],
    scripts: [
        {
            src: 'https://snack.expo.dev/embed.js',
            defer: true,
        },
    ],
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                debug: true,
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true,

                    editUrl: 'https://github.com/MobileReality/react-native-select-pro/website/',
                    remarkPlugins: [
                        [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
                        require('@react-native-website/remark-snackplayer'),
                    ],
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themes: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                hashed: true,
            },
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            docs: {
              sidebar: {
                  hideable: true,
              },
            },
            navbar: {
                title: 'React Native Select Pro',
                logo: {
                    alt: 'React Native Select Pro Logo',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        to: '/docs/getting-started',
                        label: 'Docs',
                        position: 'left',
                    },
                    {
                        href: 'https://github.com/MobileReality/react-native-select-pro',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Mobile Reality',
                        items: [
                            {
                                label: 'Contact us',
                                href: 'https://www.mobilereality.pl/en/#footer_contact',
                            },
                        ],
                    },
                ],
                copyright: `React Native Select Pro developed by Mobile Reality`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
