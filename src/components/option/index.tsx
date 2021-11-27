import React, { ComponentProps } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { OptionType } from '../../index';
import type { OptionsList } from '../options-list';

type FromSelectComponentProps = Pick<
    ComponentProps<typeof OptionsList>,
    | 'optionSelectedStyle'
    | 'optionStyle'
    | 'optionTextStyle'
    | 'onSelect'
    | 'onPressOption'
    | 'OptionComponent'
>;

export type OptionProps = OptionalToRequired<FromSelectComponentProps> & {
    isSelected: boolean;
    option: OptionType;
};

export type OnChooseOption = () => void;

export const Option = ({
    optionSelectedStyle,
    optionStyle,
    optionTextStyle,
    isSelected,
    onPressOption,
    option,
    onSelect,
    OptionComponent,
}: OptionProps) => {
    const { label } = option;

    const onChooseOption: OnChooseOption = () => {
        onPressOption(option);
        if (onSelect) {
            onSelect(option);
        }
    };

    if (OptionComponent) {
        return (
            <OptionComponent
                isSelected={isSelected}
                onPressOption={onChooseOption}
                option={option}
            />
        );
    }

    return (
        <TouchableOpacity
            accessibilityLabel={`Choose ${label} option`}
            onPress={onChooseOption}
            style={[
                styles.option,
                optionStyle,
                isSelected && [styles.selected, optionSelectedStyle],
            ]}>
            <Text numberOfLines={1} style={[styles.text, optionTextStyle]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

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
