import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants/styles';
import type { OptionType } from '../../index';
import { MultiSelect } from '../multi-select';
import type { MultiSelectProps } from '../multi-select/multi-select.types';
import { SelectInput } from '../select-input';
import type { SelectInputProps } from '../select-input/select-input.types';

import type { SelectFieldTypeProps } from './select-field-type.types';

export const SelectFieldType = ({
    isOpened,
    selectedOption,
    onPressSelectControl,
    dispatch,
    disabled,
    multiSelection,
    placeholderText,
    placeholderTextColor,
    searchable,
    searchPattern,
    textInputProps,
    searchValue,
    setPosition,
    onPressRemove,
    containerStyle,
    textStyle,
    multiSelectionOptionStyle,
}: SelectFieldTypeProps) => {
    const multiSelectProps: MultiSelectProps = {
        disabled,
        dispatch,
        isOpened,
        multiSelection,
        placeholderText,
        placeholderTextColor,
        searchPattern,
        textInputProps,
        searchValue,
        searchable,
        containerStyle,
        textStyle,
        multiSelectionOptionStyle,
        selectedOption,
        setPosition,
        onPressRemove,
        onPressSelectControl,
    };
    const multiSelect = <MultiSelect {...multiSelectProps} />;

    const selectInputProps: SelectInputProps = {
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
        selectedOption,
        setPosition,
        onPressSelectControl,
    };
    const selectInput = <SelectInput {...selectInputProps} />;

    const selectedOptionTyped = selectedOption as OptionType; // for proper typing
    const textField = (
        <Text
            numberOfLines={1}
            style={[
                styles.text,
                textStyle,
                {
                    color: selectedOptionTyped?.label
                        ? StyleSheet.flatten(textStyle)?.color ?? COLORS.BLACK
                        : placeholderTextColor,
                },
            ]}
        >
            {selectedOptionTyped?.label || placeholderText}
        </Text>
    );

    return (
        <View style={[styles.container, multiSelection ? styles.multiSelect : styles.singleSelect]}>
            {multiSelection ? multiSelect : searchable ? selectInput : textField}
        </View>
    );
};

type Styles = {
    container: ViewStyle;
    multiSelect: ViewStyle;
    singleSelect: ViewStyle;
    text: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        height: '100%',
        paddingHorizontal: PADDING,
        justifyContent: 'center',
    },
    multiSelect: {
        paddingRight: 40,
    },
    singleSelect: {
        paddingRight: 55,
    },
    text: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
    },
});

SelectFieldType.displayName = 'SelectFieldType';
