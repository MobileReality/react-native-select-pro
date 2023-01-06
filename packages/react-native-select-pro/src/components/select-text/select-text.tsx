import React from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants';

import { useSelectText } from './select-text.hooks';
import type { SelectTextProps } from './select-text.types';

export const SelectText = ({ selectedOptionLabel }: SelectTextProps) => {
    const { placeholderText, placeholderTextColor, selectTextProps, multiple, textCustomStyles } =
        useSelectText();

    if (multiple) {
        return (
            <Text
                numberOfLines={1}
                {...selectTextProps}
                style={[
                    styles.multiple,
                    textCustomStyles,
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
                textCustomStyles,
                {
                    color: selectedOptionLabel
                        ? StyleSheet.flatten(textCustomStyles)?.color ?? COLORS.BLACK
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
