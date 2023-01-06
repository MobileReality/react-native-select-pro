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

export const MultiSelect = ({ selectedOptions }: MultiSelectProps) => {
    const { calculatedOptionWidth, onPressRemove } = useMultiSelect({
        selectedOptions,
    });
    const { searchValue, styles: mainStyles, disabled } = useSelectContext();
    const { select: selectStyles } = mainStyles ?? {};

    const isSearchable = typeof searchValue === 'string';

    const resolveContent = () => {
        const resolveSelectedOptionsList = () => {
            if (!selectedOptions) {
                return isSearchable ? null : <SelectText />;
            }

            return selectedOptions.map((option: OptionType) => (
                <MultiSelectedOption
                    key={`${option.section}-${option.value}`}
                    optionWidth={calculatedOptionWidth}
                    option={option}
                    selectStyles={selectStyles}
                    disabled={disabled}
                    onPressRemove={onPressRemove}
                />
            ));
        };

        return (
            <>
                {isSearchable && <SelectInput />}
                {resolveSelectedOptionsList()}
            </>
        );
    };

    return (
        <ScrollView
            scrollEnabled={!disabled}
            horizontal={true}
            style={styles.multipleSelectionWrapper}
        >
            {resolveContent()}
        </ScrollView>
    );
};

type Styles = {
    multipleSelectionWrapper: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    multipleSelectionWrapper: {
        flex: 1,
    },
});
