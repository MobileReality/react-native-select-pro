import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants';
import { useOptionsListContext } from '../../context';

export const NoOptions = () => {
    const {
        noOptionsText,
        noOptionsProps,
        noOptionsTextProps,
        styles: mainStyles,
    } = useOptionsListContext();

    const { noOptions } = mainStyles ?? {};

    return (
        <View {...noOptionsProps} style={[styles.option, noOptions?.container]}>
            <Text {...noOptionsTextProps} style={[styles.text, noOptions?.text]}>
                {noOptionsText}
            </Text>
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
