import React from 'react';
import { render } from '@testing-library/react-native';

import { MultiSelect } from './multi-select';

describe('MultiSelect', () => {
    it('should generate MultiSelect snapshot', () => {
        const multiSelect = render(
            <MultiSelect
                selectedOptions={[{ label: 'test', value: 'test' }]}
                containerStyle={{}}
                multiSelectionOptionStyle={{}}
                textStyle={{}}
                onPressRemove={() => {}}
            />,
        );
        expect(multiSelect).toMatchSnapshot();
    });
});
