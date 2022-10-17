import React from 'react';

import { MultiSelectedOption } from './multi-selected-option';

describe('MultiSelectedOption', () => {
    it('should generate MultiSelectedOption snapshot', () => {
        const multiSelectedOption = (
            <MultiSelectedOption
                option={{ label: 'test', value: 'test' }}
                optionWidth="100%"
                isPlaceholder={false}
                placeholderText={undefined}
                placeholderTextColor={undefined}
                textStyle={{}}
                multiSelectionOptionStyle={{}}
            />
        );
        expect(multiSelectedOption).toMatchSnapshot();
    });
});
