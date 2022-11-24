import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants/styles';
import { useSelectContext } from '../../context';

import type { MultiSelectedOptionProps } from './multi-selected-option.types';

export const MultiSelectedOption = ({
    isPlaceholder = false,
    option,
    selectStyles,
    optionWidth,
    onPressRemove,
}: MultiSelectedOptionProps) => {
    const { placeholderText, placeholderTextColor } = useSelectContext();
    const isPressable = onPressRemove && option;
    return (
        <Pressable
            accessibilityLabel={option ? `${option.label} selected` : 'Placeholder in multi-select'}
            style={[
                isPlaceholder ? styles.placeholderText : styles.multiSelectionOption,
                selectStyles?.multiSelectionOption,
                { width: optionWidth },
            ]}
            disabled={!isPressable}
            onPress={isPressable ? () => onPressRemove(option) : undefined}
        >
            <Text
                numberOfLines={1}
                style={[
                    styles.text,
                    selectStyles?.text,
                    {
                        color: option?.label
                            ? StyleSheet.flatten(selectStyles?.text)?.color ?? COLORS.BLACK
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
