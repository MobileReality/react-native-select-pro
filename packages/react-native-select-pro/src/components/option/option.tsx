import React, { forwardRef } from 'react';
import type { TextStyle, View, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONT_SIZE, ITEM_HEIGHT, PADDING, PRESSED_STYLE } from '../../constants';
import { useOptionsListContext } from '../../context';
import type { OnChooseOption } from '../../types/shared';

import type { OptionProps } from './option.types';

export const Option = forwardRef<View, OptionProps>(({ isSelected, option, optionIndex }, ref) => {
    const {
        onPressOption,
        optionButtonProps,
        optionTextProps,
        styles: mainStyles,
        pressableSelectedOption,
    } = useOptionsListContext();
    const onChooseOption: OnChooseOption = () => {
        onPressOption(option, optionIndex);
    };

    const { label } = option;
    const { option: optionStyles } = mainStyles ?? {};

    const isDisabled = pressableSelectedOption ? false : isSelected;

    return (
        <Pressable
            accessibilityLabel={`Choose ${label} option`}
            {...optionButtonProps}
            ref={ref}
            accessibilityRole="menuitem"
            accessibilityState={{ disabled: isDisabled }}
            disabled={isDisabled}
            style={({ pressed }) => [
                styles.option,
                optionStyles?.container,
                isSelected && [styles.selected, optionStyles?.selected?.container],
                pressed && (optionStyles?.pressed ?? PRESSED_STYLE),
            ]}
            onPress={onChooseOption}
        >
            <Text
                numberOfLines={1}
                {...optionTextProps}
                style={[
                    styles.text,
                    optionStyles?.text,
                    isSelected && optionStyles?.selected?.text,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
});

type Styles = {
    option: ViewStyle;
    selected: ViewStyle;
    text: TextStyle;
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
});

Option.displayName = 'Option';
