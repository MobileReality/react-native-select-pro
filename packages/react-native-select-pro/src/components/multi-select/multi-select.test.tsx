import React from 'react';
import { render } from '@testing-library/react-native';

import { MultiSelect } from './multi-select';

describe('MultiSelect', () => {
    it('should generate MultiSelect snapshot', () => {
        const multiSelect = render(
            <MultiSelect
                selectedOptions={[{ label: 'test', value: 'test' }]}
                placeholderText={undefined}
                disabled={false}
                searchPattern={undefined}
                multiSelection={true}
                placeholderTextColor={undefined}
                textInputProps={{}}
                isOpened={false}
                searchValue=""
                dispatch={() => {}}
                setPosition={() => {}}
                containerStyle={{}}
                multiSelectionOptionStyle={{}}
                textStyle={{}}
                onPressRemove={() => {}}
                onPressSelectControl={() => {}}
            />,
        );
        expect(multiSelect).toMatchSnapshot();
    });
});
