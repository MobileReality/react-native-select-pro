import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants/styles';
import { selectedOptionResolver } from '../../helpers/selected-option-resolver';
import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';

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
    searchPattern,
    textInputProps,
    searchValue,
    setPosition,
    onPressRemove,
    containerStyle,
    textStyle,
    multiSelectionOptionStyle,
}: SelectFieldTypeProps) => {
    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);

    const multiSelect = (
        <MultiSelect
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
                containerStyle,
                textStyle,
                multiSelectionOptionStyle,
                selectedOptions,
                setPosition,
                onPressRemove,
                onPressSelectControl,
            }}
        />
    );

    const selectInput = (
        <SelectInput
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
                selectedOption,
                setPosition,
                onPressSelectControl,
            }}
        />
    );

    const textField = (
        <Text
            numberOfLines={1}
            style={[
                styles.text,
                textStyle,
                {
                    color: selectedOptionLabel
                        ? StyleSheet.flatten(textStyle)?.color ?? COLORS.BLACK
                        : placeholderTextColor,
                },
            ]}
        >
            {selectedOptionLabel || placeholderText}
        </Text>
    );

    const isSearchable = typeof searchValue === 'string';
    return (
        <View style={[styles.container, multiSelection ? styles.multiSelect : styles.singleSelect]}>
            {multiSelection ? multiSelect : isSearchable ? selectInput : textField}
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
