import React, { ComponentProps } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers/types/OptionalToRequired';
import type { OptionsList } from '../options-list';

type FromParentProps = Pick<
    ComponentProps<typeof OptionsList>,
    'noOptionsText'
>;

type NoOptionsProps = OptionalToRequired<FromParentProps>;

export const NoOptions = ({ noOptionsText }: NoOptionsProps) => {
    return (
        <View style={styles.option}>
            <Text style={styles.text}>{noOptionsText}</Text>
        </View>
    );
};

type Styles = {
    option: ViewStyle;
    text: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
    option: {
        padding: PADDING,
    },
    text: {
        fontSize: FONT_SIZE,
        color: COLORS.BLACK,
        textAlign: 'left',
    },
});
