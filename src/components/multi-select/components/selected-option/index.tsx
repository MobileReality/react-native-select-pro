import React, { ComponentPropsWithRef } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import type { OptionType, Select } from '@mobile-reality/react-native-select-pro';

import { COLORS, FONT_SIZE } from '../../../../constants/styles';

type Props = {
    option: OptionType | null;
    optionWidth: number | string;
    isPlaceholder?: boolean;
    onPressRemove?: (option: OptionType) => void;
};

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    'selectControlTextStyle' | 'placeholderText'
>;

export const MultiSelectedOption = ({
    isPlaceholder = false,
    option,
    selectControlTextStyle,
    placeholderText,
    optionWidth,
    onPressRemove,
}: Props & FromSelectComponentProps) => {
    return (
        <Pressable
            accessibilityLabel={
                option ? `${(option as OptionType).label} selected` : 'Placeholder in multi-select'
            }
            onPress={() => (onPressRemove ? onPressRemove(option as OptionType) : undefined)}
            style={[
                isPlaceholder ? styles.placeholderText : styles.multiSelectionOption,
                { width: optionWidth },
            ]}>
            <Text
                numberOfLines={1}
                style={[
                    styles.text,
                    { color: option?.label ? COLORS.BLACK : COLORS.GRAY },
                    selectControlTextStyle,
                ]}>
                {option?.label || placeholderText}
            </Text>
        </Pressable>
    );
};

type Styles = {
    text: TextStyle;
    multiSelectionOption: ViewStyle;
    placeholderText: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
    },
    placeholderText: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        display: 'flex',
    },
    multiSelectionOption: {
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
