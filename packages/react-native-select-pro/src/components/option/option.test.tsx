import React from 'react';

import { Option } from './option';

describe('Option', () => {
    it('should generate Option snapshot', () => {
        const option = (
            <Option
                isSelected={false}
                option={{ label: 'test', value: 'test' }}
                optionIndex={0}
                optionSelectedStyle={{}}
                optionStyle={{}}
                optionTextStyle={{}}
                OptionComponent={undefined}
                onPressOption={() => {}}
                onSelect={() => {}}
            />
        );
        expect(option).toMatchSnapshot();
    });
});
