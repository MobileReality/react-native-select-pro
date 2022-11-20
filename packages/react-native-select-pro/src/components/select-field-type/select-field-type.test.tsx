import React from 'react';
import { render } from '@testing-library/react-native';

import { SelectFieldType } from './select-field-type';

describe('SelectFieldType', () => {
    it('should generate SelectFieldType snapshot', () => {
        const selectFieldType = render(
            <SelectFieldType
                textStyle={undefined}
                containerStyle={undefined}
                multiSelectionOptionStyle={undefined}
                onPressRemove={() => {}}
            />,
        );
        expect(selectFieldType).toMatchSnapshot();
    });
});
