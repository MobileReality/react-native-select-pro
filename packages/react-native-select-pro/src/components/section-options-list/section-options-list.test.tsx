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
                isOpened={false}
                optionsData={DATA}
                selectedOption={{
                    label: 'test',
                    value: 'test',
                    section: { title: 'test', index: 0 },
                }}
                scrollToSelectedOption={false}
                noOptionsText={undefined}
                NoOptionsComponent={undefined}
                sectionListProps={undefined}
                sectionHeaderTextStyle={undefined}
                sectionHeaderContainerStyle={undefined}
                getItemLayout={() => ITEM_LAYOUT}
                renderItem={() => <Text>Test</Text>}
                onPressOption={() => {}}
            />,
        );
        expect(sectionOptionsList).toMatchSnapshot();
    });
});
