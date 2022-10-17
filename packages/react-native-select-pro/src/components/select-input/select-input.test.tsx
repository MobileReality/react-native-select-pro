import React from 'react';

import { SelectInput } from './select-input';

describe('SelectInput', () => {
    it('should generate SelectInput snapshot', () => {
        const selectInput = (
            <SelectInput
                disabled={false}
                isOpened={false}
                searchValue=""
                searchPattern={undefined}
                textInputProps={{}}
                placeholderText={undefined}
                dispatch={() => {}}
                setPosition={() => {}}
                multiSelection={false}
                selectedOption={null}
                placeholderTextColor={undefined}
                textStyle={{}}
                onPressSelectControl={() => {}}
            />
        );
        expect(selectInput).toMatchSnapshot();
    });
});
