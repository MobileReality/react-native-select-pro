import React from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';

import { useSelectContext } from '../../context';
import type { OptionType } from '../../index';
import { MultiSelectedOption } from '../multi-selected-option';
import { SelectInput } from '../select-input';
import { SelectText } from '../select-text';

import { useMultiSelect } from './multi-select.hooks';
import type { MultiSelectProps } from './multi-select.types';

export const MultiSelect = ({ selectedOptions, onPressRemove, selectStyles }: MultiSelectProps) => {
    const { searchValue } = useSelectContext();
    const containerWidth = (selectStyles as ViewStyle)?.width;
    const { calculatedOptionWidth } = useMultiSelect({ selectedOptions, containerWidth });
    const isSearchable = typeof searchValue === 'string';

    const resolveContent = () => {
        const searchInput = (
            <SelectInput selectedOption={selectedOptions} textStyle={selectStyles?.text} />
        );

        const placeholder = <SelectText selectStyles={selectStyles} />;

        const resolveSelectedOptionsList = () => {
            if (!selectedOptions) {
                return isSearchable ? null : placeholder;
            }

            return selectedOptions.map((option: OptionType) => (
                <MultiSelectedOption
                    key={`${option.section}-${option.value}`}
                    optionWidth={calculatedOptionWidth}
                    {...{
                        option,
                        selectStyles,
                        onPressRemove,
                    }}
                />
            ));
        };

        return (
            <>
                {isSearchable && searchInput}
                {resolveSelectedOptionsList()}
            </>
        );
    };

    return (
        <ScrollView horizontal={true} style={styles.multiSelectionWrapper}>
            {resolveContent()}
        </ScrollView>
    );
};

type Styles = {
    multiSelectionWrapper: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    multiSelectionWrapper: {
        flex: 1,
    },
});
