import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants/styles';
import { useSelectContext } from '../../context';
import { selectedOptionResolver } from '../../helpers';
import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';

import type { SelectFieldTypeProps } from './select-field-type.types';

export const SelectFieldType = ({
    onPressRemove,
    containerStyle,
    textStyle,
    multiSelectionOptionStyle,
}: SelectFieldTypeProps) => {
    const { multiSelection, placeholderText, placeholderTextColor, searchValue, selectedOption } =
        useSelectContext();
    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);

    const multiSelect = (
        <MultiSelect
            {...{
                containerStyle,
                textStyle,
                multiSelectionOptionStyle,
                selectedOptions,
                onPressRemove,
            }}
        />
    );

    const selectInput = (
        <SelectInput
            {...{
                textStyle,
                selectedOption,
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
