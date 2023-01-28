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
            items: ['home', 'getting-started', 'usage'],
        },
        {
            type: 'category',
            label: 'API',
            items: [
                'api/select',
                'api/select-provider',
                'api/select-modal',
            ],
        },
        {
            type: 'doc',
            label: 'react-native-select-pro v2',
            id: 'react-native-select-pro-v2'
        },
        {
            type: 'doc',
            label: 'Troubleshooting',
            id: 'troubleshooting'
        }
    ],
};

module.exports = sidebars;
