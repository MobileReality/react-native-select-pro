import React from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants';
import { useSelectContext } from '../../context';

import type { SelectTextProps } from './select-text.types';

export const SelectText = ({ selectStyles, selectedOptionLabel }: SelectTextProps) => {
    const { placeholderText, placeholderTextColor, selectTextProps, multiple } = useSelectContext();

    if (multiple) {
        return (
            <Text
                numberOfLines={1}
                {...selectTextProps}
                style={[
                    styles.multiple,
                    selectStyles?.text,
                    {
                        color: placeholderTextColor,
                    },
                ]}
            >
                {placeholderText}
            </Text>
        );
    }

    return (
        <Text
            numberOfLines={1}
            {...selectTextProps}
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
            {(selectedOptionLabel as string) || placeholderText}
        </Text>
    );
};

type Styles = {
    text: TextStyle;
    multiple: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
    },
    multiple: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
        alignSelf: 'center',
    },
});
