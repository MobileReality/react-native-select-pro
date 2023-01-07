import React, { memo } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';
import isEqual from 'lodash.isequal';

import { COLORS, FONT_SIZE, PRESSED_STYLE } from '../../constants';

import type { MultiSelectedOptionProps } from './multi-selected-option.types';

export const MultiSelectedOption = memo(
    ({
        option,
        multiSelectedCustomStyles,
        optionWidth,
        onPressRemove,
        disabled,
    }: MultiSelectedOptionProps) => {
        return (
            <Pressable
                accessibilityLabel={
                    option ? `${option.label} selected` : 'Placeholder in multiple select'
                }
                style={({ pressed }) => [
                    styles.multiSelectedOption,
                    multiSelectedCustomStyles?.container,
                    { width: optionWidth },
                    pressed && (multiSelectedCustomStyles?.pressed ?? PRESSED_STYLE),
                ]}
                disabled={disabled}
                onPress={() => onPressRemove(option)}
            >
                <Text
                    numberOfLines={1}
                    style={[
                        styles.text,
                        multiSelectedCustomStyles?.text,
                        {
                            color:
                                StyleSheet.flatten(multiSelectedCustomStyles?.text)?.color ??
                                COLORS.BLACK,
                        },
                    ]}
                >
                    {option?.label}
                </Text>
            </Pressable>
        );
    },
    (prevProps, newProps) => isEqual(prevProps, newProps),
);

type Styles = {
    text: TextStyle;
    multiSelectedOption: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
    },
    multiSelectedOption: {
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

MultiSelectedOption.displayName = 'MultiSelectedOption';
