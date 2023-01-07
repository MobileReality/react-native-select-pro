import React, { forwardRef, memo } from 'react';
import type { TextStyle, View, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';
import isEqual from 'lodash.isequal';

import { COLORS, FONT_SIZE, ITEM_HEIGHT, PADDING, PRESSED_STYLE } from '../../constants';
import type { OnChooseOption } from '../../types';

import type { OptionProps } from './option.types';

const OptionComponent = forwardRef<View, OptionProps>(
    (
        {
            isSelected,
            option,
            optionIndex,
            disabled,
            onPressOption,
            optionButtonProps,
            optionTextProps,
            optionCustomStyles,
            isDisabled,
        },
        ref,
    ) => {
        const onChooseOption: OnChooseOption = () => {
            onPressOption(option, optionIndex);
        };

        const { label } = option;

        return (
            <Pressable
                accessibilityLabel={`Select ${label} option`}
                {...optionButtonProps}
                ref={ref}
                accessibilityRole="menuitem"
                accessibilityState={{ disabled: isDisabled }}
                disabled={isDisabled}
                style={({ pressed }) => [
                    styles.option,
                    optionCustomStyles?.container,
                    isSelected && [styles.selected, optionCustomStyles?.selected?.container],
                    pressed && (optionCustomStyles?.pressed ?? PRESSED_STYLE),
                    disabled && styles.disabled,
                ]}
                onPress={onChooseOption}
            >
                <Text
                    numberOfLines={1}
                    {...optionTextProps}
                    style={[
                        styles.text,
                        optionCustomStyles?.text,
                        isSelected && optionCustomStyles?.selected?.text,
                    ]}
                >
                    {label}
                </Text>
            </Pressable>
        );
    },
);

type Styles = {
    option: ViewStyle;
    selected: ViewStyle;
    text: TextStyle;
    disabled: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    option: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: PADDING,
    },
    text: {
        fontSize: FONT_SIZE,
        color: COLORS.BLACK,
        textAlign: 'left',
    },
    selected: {
        backgroundColor: COLORS.SELECTED,
    },
    disabled: {
        backgroundColor: COLORS.DISABLED,
    },
});

OptionComponent.displayName = 'OptionComponent';

export const Option = memo(OptionComponent, (prevProps, newProps) => isEqual(prevProps, newProps));
Option.displayName = 'Option';
