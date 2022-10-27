import React from 'react';
import { render } from '@testing-library/react-native';

import { SelectProvider } from '../select-provider';

import { OptionsList } from './options-list';

describe('OptionsList', () => {
    it('should generate OptionsList snapshot', () => {
        const DATA = [{ label: 'test', value: 'test' }];
        const optionsList = render(
            <SelectProvider>
                <OptionsList
                    NoOptionsComponent={undefined}
                    OptionComponent={undefined}
                    aboveSelectControl={false}
                    animation={false}
                    flatListProps={{}}
                    isOpened={false}
                    noOptionsText={undefined}
                    openedPosition={{ width: 0, top: 0, left: 0, aboveSelectControl: false }}
                    optionsData={DATA}
                    scrollToSelectedOption={false}
                    searchValue=""
                    searchedOptions={[]}
                    selectedOption={DATA[0]}
                    selectedOptionIndex={0}
                    sectionListProps={{}}
                    optionsListStyles={{}}
                    onOutsidePress={() => {}}
                    onPressOption={() => {}}
                    onSelect={() => {}}
                />
            </SelectProvider>,
        );
        expect(optionsList).toMatchSnapshot();
    });
});
