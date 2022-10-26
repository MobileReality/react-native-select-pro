import React from 'react';
import { Text } from 'react-native';

import { SectionOptionsList } from './section-options-list';

describe('SectionOptionsList', () => {
    it('should generate SectionOptionsList snapshot', () => {
        const sections = [{ title: 'test', data: [{ label: 'test', value: 'test' }] }];
        const itemLayout = {
            length: 0,
            offset: 0,
            index: 0,
        };
        const sectionOptionsList = (
            <SectionOptionsList
                isOpened={false}
                optionsData={sections}
                noOptionsText={undefined}
                NoOptionsComponent={undefined}
                sectionListProps={undefined}
                sectionHeaderTextStyle={undefined}
                sectionHeaderContainerStyle={undefined}
                getItemLayout={() => itemLayout}
                renderItem={() => <Text>Test</Text>}
            />
        );
        expect(sectionOptionsList).toMatchSnapshot();
    });
});
