import React, { useMemo } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants/styles';
import type { OptionType } from '../../index';
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
    const resolveMultiSelectOptions = useMemo(() => {
        if (!selectedOption) {
            return null;
        }
        return Array.isArray(selectedOption) ? selectedOption : [selectedOption];
    }, [selectedOption]);

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
                searchable,
                containerStyle,
                textStyle,
                multiSelectionOptionStyle,
                selectedOptions: resolveMultiSelectOptions,
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
