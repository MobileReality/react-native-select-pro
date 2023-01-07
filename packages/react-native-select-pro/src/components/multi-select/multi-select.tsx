import React from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';

import type { OptionType } from '../../index';
import { MultiSelectedOption } from '../multi-selected-option';
import { SelectInput } from '../select-input';
import { SelectText } from '../select-text';

import { useMultiSelect } from './multi-select.hooks';
import type { MultiSelectProps } from './multi-select.types';

export const MultiSelect = ({ selectedOptions }: MultiSelectProps) => {
    const {
        calculatedOptionWidth,
        onPressRemove,
        multiSelectedCustomStyles,
        disabled,
        isSearchable,
    } = useMultiSelect({
        selectedOptions,
    });

    const resolveSelectedOptionsList = () => {
        if (!selectedOptions) {
            return isSearchable ? null : <SelectText />;
        }

        return selectedOptions.map((option: OptionType) => (
            <MultiSelectedOption
                key={`${option.section}-${option.value}`}
                optionWidth={calculatedOptionWidth}
                option={option}
                multiSelectedCustomStyles={multiSelectedCustomStyles}
                disabled={disabled}
                onPressRemove={onPressRemove}
            />
        ));
    };

    return (
        <ScrollView scrollEnabled={!disabled} style={styles.container} horizontal>
            {isSearchable && <SelectInput />}
            {resolveSelectedOptionsList()}
        </ScrollView>
    );
};

type Styles = {
    container: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
    },
});
