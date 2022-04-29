import React, { ComponentPropsWithRef, forwardRef } from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

import {
    COLORS,
    FONT_SIZE,
    ITEM_HEIGHT,
    PADDING,
} from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers/types/OptionalToRequired';
import type { OptionType } from '../../index';
import type { OptionsList } from '../options-list';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof OptionsList>,
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
    optionIndex: number;
};

export type OnChooseOption = () => void;

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
