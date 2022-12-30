import React, { forwardRef } from 'react';
import type { TextStyle, View, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONT_SIZE, ITEM_HEIGHT, PADDING, PRESSED_STYLE } from '../../constants';
import { useOptionsListContext } from '../../context';

import type { OnChooseOption, OptionProps } from './option.types';

export const Option = forwardRef<View, OptionProps>(({ isSelected, option, optionIndex }, ref) => {
    const { OptionComponent, onPressOption, styles: mainStyles } = useOptionsListContext();
    const onChooseOption: OnChooseOption = () => {
        onPressOption(option, optionIndex);
    };

    if (OptionComponent) {
        return (
            <OptionComponent
                {...{ isSelected, option, optionIndex }}
                onPressOption={onChooseOption}
            />
        );
    }

    const { label } = option;
    const { option: optionStyles } = mainStyles ?? {};

    return (
        <Pressable
            ref={ref}
            accessibilityLabel={`Choose ${label} option`}
            accessibilityRole="button"
            accessible={true}
            style={({ pressed }) => [
                styles.option,
                optionStyles,
                isSelected && [styles.selected, optionStyles?.selected],
                pressed ? optionStyles?.pressed ?? PRESSED_STYLE : undefined,
            ]}
            disabled={isSelected}
            onPress={onChooseOption}
        >
            <Text
                numberOfLines={1}
                style={[styles.text, optionStyles?.text, isSelected && optionStyles?.selectedText]}
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
