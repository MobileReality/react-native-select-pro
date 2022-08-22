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
    PARENT_ITEM_HEIGHT,
} from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers/types/OptionalToRequired';
import type { OptionType } from '../../index';
import type { OptionsList } from '../options-list';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof OptionsList>,
    | 'optionSelectedStyle'
    | 'optionStyle'
    | 'optionTextStyle'
    | 'parentOptionStyle'
    | 'parentOptionTextStyle'
    | 'onSelect'
    | 'onPressOption'
    | 'OptionComponent'
>;

export type OptionProps = OptionalToRequired<FromSelectComponentProps> & {
    isSelected: boolean;
    option: OptionType;
    optionIndex: number;
    isCategorized?: boolean;
};

export type OnChooseOption = () => void;

export const Option = forwardRef<TouchableOpacity, OptionProps>(
    (
        {
            optionSelectedStyle,
            optionStyle,
            optionTextStyle,
            parentOptionStyle,
            parentOptionTextStyle,
            isSelected,
            isCategorized,
            onPressOption,
            option,
            onSelect,
            OptionComponent,
            optionIndex,
        },
        ref,
    ) => {
        const { label, parent } = option;
        const isParentOption = isCategorized && !parent;

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
                    !isParentOption && optionStyle,
                    isSelected && [styles.selected, optionSelectedStyle],
                    isParentOption ? parentOptionStyle : styles.parentOption,
                ]}
                disabled={isParentOption}
                onPress={onChooseOption}
            >
                <Text
                    numberOfLines={1}
                    style={[
                        styles.text,
                        !isParentOption && optionTextStyle,
                        isParentOption
                            ? parentOptionTextStyle
                            : styles.parentText,
                    ]}
                >
                    {label}
                </Text>
            </TouchableOpacity>
        );
    },
);

type Styles = {
    option: ViewStyle;
    parentOption: ViewStyle;
    selected: ViewStyle;
    text: TextStyle;
    parentText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    option: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: PADDING,
    },
    parentOption: {
        height: PARENT_ITEM_HEIGHT,
        marginTop: PADDING,
    },
    text: {
        fontSize: FONT_SIZE,
        color: COLORS.BLACK,
        textAlign: 'left',
    },
    selected: {
        backgroundColor: COLORS.SELECTED,
    },
    parentText: {
        color: COLORS.DISABLED,
        textTransform: 'uppercase',
    },
});

Option.displayName = 'Option';
