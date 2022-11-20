import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { SectionOptionsList } from './section-options-list';

describe('SectionOptionsList', () => {
    it('should generate SectionOptionsList snapshot', () => {
        const DATA = [{ title: 'test', data: [{ label: 'test', value: 'test' }] }];
        const ITEM_LAYOUT = {
            length: 0,
            offset: 0,
            index: 0,
        };
        const sectionOptionsList = render(
            <SectionOptionsList
                resolvedData={DATA}
                sectionHeaderTextStyle={undefined}
                sectionHeaderContainerStyle={undefined}
                getItemLayout={() => ITEM_LAYOUT}
                renderItem={() => <Text>Test</Text>}
            />,
        );
        expect(sectionOptionsList).toMatchSnapshot();
    });
});
