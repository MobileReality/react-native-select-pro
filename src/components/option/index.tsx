import React, { ComponentProps, forwardRef } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { OptionType } from '../../index';
import type { OptionsList } from '../options-list';

type FromSelectComponentProps = Pick<
    ComponentProps<typeof OptionsList>,
    'optionSelectedStyle' | 'optionStyle' | 'optionTextStyle' | 'onSelect' | 'onPressOption'
>;
type OptionProps = OptionalToRequired<FromSelectComponentProps> & {
    isSelected: boolean;
    option: OptionType;
};

export const Option = forwardRef(
    (
        {
            optionSelectedStyle,
            optionStyle,
            optionTextStyle,
            isSelected,
            onPressOption,
            option,
            onSelect,
        }: OptionProps,
        ref,
    ) => {
        return (
            <TouchableOpacity
                accessibilityLabel={`Choose ${option.label} option`}
                accessibilityRole={'button'}
                accessible={true}
                onPress={() => {
                    if (onPressOption) {
                        onPressOption(option);
                    }
                    if (onSelect) {
                        onSelect(option);
                    }
                }}
                ref={ref}
                style={[
                    styles.option,
                    optionStyle,
                    isSelected && [styles.selected, optionSelectedStyle],
                ]}>
                <Text numberOfLines={1} style={[styles.text, optionTextStyle]}>
                    {option.label}
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
        padding: PADDING,
    },
    text: {
        fontSize: FONT_SIZE,
        color: COLORS.BLACK,
    },
    selected: {
        backgroundColor: COLORS.SELECTED,
    },
});
