import React, { forwardRef } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONT_SIZE, ITEM_HEIGHT, PADDING } from '../../constants/styles';

import type { OnChooseOption, OptionProps } from './option.types';

export const Option = forwardRef<TouchableOpacity, OptionProps>(
    (
        {
            optionSelectedStyle,
            optionStyle,
            optionTextStyle,
            isSelected,
            onPressOption,
            option,
            onSelect,
            OptionComponent,
            optionIndex,
        },
        ref,
    ) => {
        const { label } = option;

        const onChooseOption: OnChooseOption = () => {
            onPressOption(option, optionIndex);
            if (onSelect) {
                onSelect(option, optionIndex);
            }
        };

        if (OptionComponent) {
            return (
                <OptionComponent
                    isSelected={isSelected}
                    option={option}
                    onPressOption={onChooseOption}
                />
            );
        }

        return (
            <TouchableOpacity
                ref={ref}
                accessibilityLabel={`Choose ${label} option`}
                accessibilityRole="button"
                accessible={true}
                style={[
                    styles.option,
                    optionStyle,
                    isSelected && [styles.selected, optionSelectedStyle],
                ]}
                onPress={onChooseOption}
            >
                <Text numberOfLines={1} style={[styles.text, optionTextStyle]}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    },
);

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
