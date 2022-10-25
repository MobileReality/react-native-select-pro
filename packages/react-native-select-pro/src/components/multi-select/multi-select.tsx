import React from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';

import type { OptionType } from '../../index';
import { MultiSelectedOption } from '../multi-selected-option';
import { SelectInput } from '../select-input';

import { useMultiSelect } from './multi-select.hooks';
import type { MultiSelectProps } from './multi-select.types';

export const MultiSelect = ({
    textStyle,
    containerStyle,
    selectedOptions,
    placeholderText,
    placeholderTextColor,
    onPressRemove,
    disabled,
    dispatch,
    isOpened,
    onPressSelectControl,
    searchPattern,
    textInputProps,
    searchValue,
    setPosition,
    multiSelection,
    multiSelectionOptionStyle,
}: MultiSelectProps) => {
    const { calculatedOptionWidth } = useMultiSelect({ selectedOptions, containerStyle });
    const isSearchable = typeof searchValue === 'string';

    const resolveNoSelectedOptions = () => {
        const selectInput = (
            <SelectInput
                selectedOption={selectedOptions}
                {...{
                    disabled,
                    dispatch,
                    isOpened,
                    multiSelection,
                    placeholderText,
                    placeholderTextColor,
                    searchPattern,
                    textInputProps,
                    searchValue,
                    textStyle,
                    setPosition,
                    onPressSelectControl,
                }}
            />
        );
        const placeholderMultiOption = (
            <MultiSelectedOption
                isPlaceholder={true}
                option={null}
                optionWidth="100%"
                {...{ placeholderText, placeholderTextColor, textStyle, multiSelectionOptionStyle }}
            />
        );
        return isSearchable ? selectInput : placeholderMultiOption;
    };

    const resolveSelectedOptions = (selectedOptions: OptionType[]) => {
        return selectedOptions.map((option: OptionType, index) => {
            return (
                <MultiSelectedOption
                    key={index}
                    optionWidth={calculatedOptionWidth}
                    {...{
                        option,
                        placeholderText,
                        textStyle,
                        multiSelectionOptionStyle,
                        placeholderTextColor,
                        onPressRemove,
                    }}
                />
            );
        });
    };

    return (
        <ScrollView horizontal={true} style={styles.multiSelectionWrapper}>
            {selectedOptions ? resolveSelectedOptions(selectedOptions) : resolveNoSelectedOptions()}
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
