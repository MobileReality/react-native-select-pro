import React from 'react';

import { SelectControl } from './select-control';

describe('SelectControl', () => {
    it('should generate SelectControl snapshot', () => {
        const data = [{ label: 'test', value: 'test' }];
        const selectControl = (
            <SelectControl
                ref={null}
                aboveSelectControl={false}
                animation={false}
                clearable={false}
                disabled={false}
                dispatch={() => {}}
                hideSelectControlArrow={false}
                isOpened={false}
                multiSelection={false}
                optionsData={data}
                placeholderText={undefined}
                placeholderTextColor={undefined}
                searchPattern={undefined}
                searchValue=""
                textInputProps={{}}
                selectControlClearOptionA11yLabel={undefined}
                selectControlOpenDropdownA11yLabel={undefined}
                selectedOption={null}
                selectedOptionIndex={-1}
                clearOptionStyles={{}}
                customLeftIconStyles={{}}
                selectControlStyles={{}}
                arrowIconStyles={{}}
                setPosition={() => {}}
                onPressSelectControl={() => {}}
                onRemove={() => {}}
            />
        );
        expect(selectControl).toMatchSnapshot();
    });
});
