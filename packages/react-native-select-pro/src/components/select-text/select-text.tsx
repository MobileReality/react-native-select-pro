import React from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants';
import { useSelectContext } from '../../context';

import type { SelectTextProps } from './select-text.types';

export const SelectText = ({ selectedOptionLabel }: SelectTextProps) => {
    const {
        placeholderText,
        placeholderTextColor,
        selectTextProps,
        multiple,
        styles: mainStyles,
    } = useSelectContext();

    const { select } = mainStyles ?? {};
    const { text: textStyles } = select ?? {};

    if (multiple) {
        return (
            <Text
                numberOfLines={1}
                {...selectTextProps}
                style={[
                    styles.multiple,
                    textStyles,
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
                textStyles,
                {
                    color: selectedOptionLabel
                        ? StyleSheet.flatten(textStyles)?.color ?? COLORS.BLACK
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
