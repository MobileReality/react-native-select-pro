import React, { forwardRef } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONT_SIZE, ITEM_HEIGHT, PADDING } from '../../constants/styles';
import { useOptionsListContext } from '../../context';

import type { OnChooseOption, OptionProps } from './option.types';

export const Option = forwardRef<TouchableOpacity, OptionProps>(
    ({ isSelected, option, optionIndex }, ref) => {
        const {
            OptionComponent,
            onSelect,
            onPressOption,
            styles: mainStyles,
        } = useOptionsListContext();
        const { label } = option;

        const { option: optionStyles } = mainStyles ?? {};

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
                    optionStyles,
                    isSelected && [styles.selected, optionStyles?.selected],
                ]}
                disabled={isSelected}
                onPress={onChooseOption}
            >
                <Text numberOfLines={1} style={[styles.text, optionStyles?.text]}>
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
