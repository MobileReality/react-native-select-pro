import React from 'react';

import { SelectFieldType } from './select-field-type';

describe('SelectFieldType', () => {
    it('should generate SelectFieldType snapshot', () => {
        const selectFieldType = (
            <SelectFieldType
                isOpened={false}
                selectedOption={null}
                dispatch={() => {}}
                disabled={false}
                multiSelection={false}
                placeholderText={undefined}
                placeholderTextColor={undefined}
                searchable={false}
                searchPattern={undefined}
                textInputProps={{}}
                searchValue=""
                setPosition={() => {}}
                textStyle={undefined}
                containerStyle={undefined}
                multiSelectionOptionStyle={undefined}
                onPressSelectControl={() => {}}
                onPressRemove={() => {}}
            />
        );
        expect(selectFieldType).toMatchSnapshot();
    });
});
