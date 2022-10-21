import React from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { dimensionPercentageToDP } from '../../helpers/dimension-percentage-to-dp';
import type { OptionType } from '../../index';
import { MultiSelectedOption } from '../multi-selected-option';
import { SelectInput } from '../select-input';

import type { MultiSelectProps } from './multi-select.types';

export const MultiSelect = ({
    searchable,
    textStyle,
    containerStyle,
    selectedOption,
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
    const { width: screenWidth } = useWindowDimensions();
    const selectedOptionTyped = selectedOption as OptionType[];

    const resolveSelectedOptions = () => {
        if (!selectedOptionTyped) {
            if (searchable) {
                return null;
            }
            return (
                <MultiSelectedOption
                    isPlaceholder={true}
                    option={null}
                    optionWidth="100%"
                    placeholderText={placeholderText}
                    placeholderTextColor={placeholderTextColor}
                    textStyle={textStyle}
                    multiSelectionOptionStyle={multiSelectionOptionStyle}
                />
            );
        }

        const optionWidth = () => {
            const WIDTH_THRESHOLD = 100;
            const WIDTH_OFFSET = 72;
            const { length } = selectedOptionTyped;
            const initialWidth = containerStyle ? (containerStyle as ViewStyle).width : 100;
            let calculatedWidth = 100;
            if (typeof initialWidth === 'number') {
                calculatedWidth = (initialWidth - WIDTH_OFFSET) / length;
                if (calculatedWidth < WIDTH_THRESHOLD) {
                    return WIDTH_THRESHOLD;
                }
                return Math.floor(calculatedWidth);
            }
            if (typeof initialWidth === 'string') {
                const ratioToScreen = dimensionPercentageToDP(initialWidth, screenWidth);
                calculatedWidth = ratioToScreen / length;
                if (calculatedWidth - WIDTH_OFFSET < WIDTH_THRESHOLD) {
                    return WIDTH_THRESHOLD;
                }
                return calculatedWidth - WIDTH_OFFSET;
            }
            return 0;
        };

        return selectedOptionTyped.map((option: OptionType, index) => {
            return (
                <MultiSelectedOption
                    key={index}
                    option={option}
                    optionWidth={optionWidth()}
                    placeholderText={placeholderText}
                    textStyle={textStyle}
                    multiSelectionOptionStyle={multiSelectionOptionStyle}
                    placeholderTextColor={placeholderTextColor}
                    onPressRemove={onPressRemove}
                />
            );
        });
    };

    return (
        <ScrollView horizontal={true} style={styles.multiSelectionWrapper}>
            {searchable && (
                <SelectInput
                    disabled={disabled}
                    dispatch={dispatch}
                    isOpened={isOpened}
                    multiSelection={multiSelection}
                    placeholderText={placeholderText}
                    placeholderTextColor={placeholderTextColor}
                    searchPattern={searchPattern}
                    textInputProps={textInputProps}
                    searchValue={searchValue}
                    textStyle={textStyle}
                    selectedOption={selectedOption}
                    setPosition={setPosition}
                    onPressSelectControl={onPressSelectControl}
                />
            )}
            {resolveSelectedOptions()}
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
