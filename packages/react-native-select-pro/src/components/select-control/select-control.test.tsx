import React from 'react';
import { render } from '@testing-library/react-native';

import { SelectControl } from './select-control';

describe('SelectControl', () => {
    it('should generate SelectControl snapshot', () => {
        const DATA = [{ label: 'test', value: 'test' }];
        const selectControl = render(
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
                optionsData={DATA}
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
            />,
        );
        expect(selectControl).toMatchSnapshot();
    });
});
