import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants';

import { useNoOptions } from './no-options.hooks';

export const NoOptions = () => {
    const {
        noOptionsText,
        noOptionsProps,
        noOptionsTextProps,
        textCustomStyles,
        containerCustomStyles,
    } = useNoOptions();

    return (
        <View {...noOptionsProps} style={[styles.option, containerCustomStyles]}>
            <Text {...noOptionsTextProps} style={[styles.text, textCustomStyles]}>
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
