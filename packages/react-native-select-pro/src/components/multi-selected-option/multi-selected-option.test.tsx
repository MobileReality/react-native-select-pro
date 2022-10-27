import React from 'react';
import { render } from '@testing-library/react-native';

import { MultiSelectedOption } from './multi-selected-option';

describe('MultiSelectedOption', () => {
    it('should generate MultiSelectedOption snapshot', () => {
        const multiSelectedOption = render(
            <MultiSelectedOption
                option={{ label: 'test', value: 'test' }}
                optionWidth="100%"
                isPlaceholder={false}
                placeholderText={undefined}
                placeholderTextColor={undefined}
                textStyle={{}}
                multiSelectionOptionStyle={{}}
            />,
        );
        expect(multiSelectedOption).toMatchSnapshot();
    });
});
