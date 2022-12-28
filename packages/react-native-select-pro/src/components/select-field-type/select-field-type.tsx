import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants';
import { useSelectContext } from '../../context';
import { selectedOptionResolver } from '../../helpers';
import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';

import type { SelectFieldTypeProps } from './select-field-type.types';

export const SelectFieldType = ({ onPressRemove, selectStyles }: SelectFieldTypeProps) => {
    const { multiSelection, placeholderText, placeholderTextColor, searchValue, selectedOption } =
        useSelectContext();
    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);

    const multiSelect = (
        <MultiSelect
            {...{
                selectStyles,
                selectedOptions,
                onPressRemove,
            }}
        />
    );

    const selectInput = (
        <SelectInput
            {...{
                textStyle: selectStyles?.text,
                selectedOption,
            }}
        />
    );

    const textField = (
        <Text
            numberOfLines={1}
            style={[
                styles.text,
                selectStyles?.text,
                {
                    color: selectedOptionLabel
                        ? StyleSheet.flatten(selectStyles?.text)?.color ?? COLORS.BLACK
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
