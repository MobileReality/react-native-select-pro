import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { FlatOptionsList } from './flat-options-list';

describe('FlatOptionsList', () => {
    it('should generate FlatOptionsList snapshot', () => {
        const DATA = [{ label: 'test', value: 'test' }];
        const ITEM_LAYOUT = {
            length: 0,
            offset: 0,
            index: 0,
        };
        const flatOptionsList = render(
            <FlatOptionsList
                flatListProps={undefined}
                isOpened={false}
                noOptionsText={undefined}
                scrollToSelectedOption={false}
                NoOptionsComponent={undefined}
                selectedOptionIndex={0}
                resolveData={() => DATA}
                renderItem={() => <Text>Test Item</Text>}
                getItemLayout={() => ITEM_LAYOUT}
                onPressOption={() => {}}
            />,
        );
        expect(flatOptionsList).toMatchSnapshot();
    });
});
