import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants/styles';
import type { OptionType } from '../../index';

import type { MultiSelectedOptionProps } from './multi-selected-option.types';

export const MultiSelectedOption = ({
    isPlaceholder = false,
    option,
    textStyle,
    multiSelectionOptionStyle,
    placeholderText,
    placeholderTextColor,
    optionWidth,
    onPressRemove,
}: MultiSelectedOptionProps) => {
    return (
        <Pressable
            accessibilityLabel={option ? `${option.label} selected` : 'Placeholder in multi-select'}
            style={[
                isPlaceholder ? styles.placeholderText : styles.multiSelectionOption,
                multiSelectionOptionStyle,
                { width: optionWidth },
            ]}
            onPress={() => (onPressRemove ? onPressRemove(option as OptionType) : undefined)}
        >
            <Text
                numberOfLines={1}
                style={[
                    styles.text,
                    textStyle,
                    {
                        color: option?.label
                            ? StyleSheet.flatten(textStyle)?.color ?? COLORS.BLACK
                            : placeholderTextColor,
                    },
                ]}
            >
                {option?.label ?? placeholderText}
            </Text>
        </Pressable>
    );
};

type Styles = {
    text: TextStyle;
    multiSelectionOption: ViewStyle;
    placeholderText: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
    },
    placeholderText: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        display: 'flex',
    },
    multiSelectionOption: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: 4,
        backgroundColor: COLORS.DISABLED,
        borderWidth: 1,
        borderColor: COLORS.BLACK,
        margin: 2,
        paddingLeft: 5,
    },
});