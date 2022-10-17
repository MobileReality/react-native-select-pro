import React from 'react';

import { MultiSelect } from './multi-select';

describe('MultiSelect', () => {
    it('should generate MultiSelect snapshot', () => {
        const multiSelect = (
            <MultiSelect
                selectedOption={{ label: 'test', value: 'test' }}
                placeholderText={undefined}
                disabled={false}
                searchPattern={undefined}
                multiSelection={true}
                placeholderTextColor={undefined}
                searchable={false}
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
            />
        );
        expect(multiSelect).toMatchSnapshot();
    });
});
