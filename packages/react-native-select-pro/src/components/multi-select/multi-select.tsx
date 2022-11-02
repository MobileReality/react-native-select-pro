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
    const containerWidth = (containerStyle as ViewStyle)?.width;
    const { calculatedOptionWidth } = useMultiSelect({ selectedOptions, containerWidth });
    const isSearchable = typeof searchValue === 'string';

    const resolveContent = () => {
        const searchInput = (
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

        const emptyList = (
            <MultiSelectedOption
                isPlaceholder={true}
                option={null}
                optionWidth="100%"
                {...{
                    placeholderText,
                    placeholderTextColor,
                    textStyle,
                    multiSelectionOptionStyle,
                }}
            />
        );

        const resolveSelectedOptionsList = () => {
            if (!selectedOptions) {
                return isSearchable ? null : emptyList;
            }

            return selectedOptions.map((option: OptionType, index) => (
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
