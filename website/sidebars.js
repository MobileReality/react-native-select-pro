/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docs: [
        {
            type: 'category',
            label: 'Start',
            items: ['getting-started', 'basic-usage'],
        },
        {
            type: 'category',
            label: 'API',
            items: [
                'api/select-provider',
                {
                    type: 'category',
                    label: 'Select',
                    items: [
                        'api/required',
                        'api/common',
                        'api/callbacks',
                        'api/styles',
                        'api/components',
                        'api/accessibility',
                    ],
                },
                'api/select-modal',
            ],
        },
        {
            type: 'category',
            label: 'Examples',
            items: [
                'examples/video',
                {
                    type: 'link',
                    label: 'Expo Snack',
                    href: 'https://snack.expo.dev/@irekrog/smelly-beef-jerky',
                },
                'examples/repo-clone',
            ],
        },
    ],
};

module.exports = sidebars;
