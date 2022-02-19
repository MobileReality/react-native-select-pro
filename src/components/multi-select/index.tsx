import React, { ComponentPropsWithRef } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import type { OptionType, Select } from '@mobile-reality/react-native-select-pro';

import { COLORS, FONT_SIZE } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { State } from '../../state/types';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    'selectControlTextStyle' | 'placeholderText'
>;

type SelectControlProps = OptionalToRequired<
    FromSelectComponentProps & Pick<State, 'selectedOption'>
>;

export const MultiSelect = ({
    selectControlTextStyle,
    selectedOption,
    placeholderText,
}: SelectControlProps) => {
    const selectedOptionTyped = selectedOption as OptionType;

    return (
        <View style={styles.multiSelectionWrapper}>
            <Text
                numberOfLines={1}
                style={[
                    styles.text,
                    { color: selectedOptionTyped?.label ? COLORS.BLACK : COLORS.GRAY },
                    selectControlTextStyle,
                    styles.multiSelectionOption,
                ]}>
                {selectedOptionTyped?.label || placeholderText}
            </Text>
        </View>
    );
};

type Styles = {
    text: TextStyle;
    multiSelectionWrapper: ViewStyle;
    multiSelectionOption: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
    },
    multiSelectionWrapper: {
        width: '100%',
    },
    multiSelectionOption: {
        width: '100%',
    },
});
