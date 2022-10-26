import React from 'react';
import { Text } from 'react-native';

import { FlatOptionsList } from './flat-options-list';

describe('FlatOptionsList', () => {
    it('should generate FlatOptionsList snapshot', () => {
        const data = [{ label: 'test', value: 'test' }];
        const itemLayout = {
            length: 0,
            offset: 0,
            index: 0,
        };
        const flatOptionsList = (
            <FlatOptionsList
                flatListProps={undefined}
                isOpened={false}
                noOptionsText={undefined}
                scrollToSelectedOption={false}
                NoOptionsComponent={undefined}
                selectedOptionIndex={0}
                resolveData={() => data}
                renderItem={() => <Text>Test Item</Text>}
                getItemLayout={() => itemLayout}
                onPressOption={() => {}}
            />
        );
        expect(flatOptionsList).toMatchSnapshot();
    });
});
