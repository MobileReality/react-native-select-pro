import React from 'react';

import { OptionsList } from './options-list';

describe('OptionsList', () => {
    it('should generate OptionsList snapshot', () => {
        const data = [{ label: 'test', value: 'test' }];
        const optionsList = (
            <OptionsList
                NoOptionsComponent={undefined}
                OptionComponent={undefined}
                aboveSelectControl={false}
                animation={false}
                flatListProps={{}}
                isOpened={false}
                multiSelection={false}
                noOptionsText={undefined}
                openedPosition={{ width: 0, top: 0, left: 0, aboveSelectControl: false }}
                optionsData={data}
                scrollToSelectedOption={false}
                searchValue=""
                searchable={false}
                searchedOptions={[]}
                selectedOption={data[0]}
                selectedOptionIndex={0}
                sectionListProps={{}}
                optionsListStyles={{}}
                onOutsidePress={() => {}}
                onPressOption={() => {}}
                onSelect={() => {}}
            />
        );
        expect(optionsList).toMatchSnapshot();
    });
});
