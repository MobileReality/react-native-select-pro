import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants';

import { useLoading } from './loading.hooks';

export const Loading = () => {
    const { loadingText, loadingProps, loadingTextProps, textCustomStyles, containerCustomStyles } =
        useLoading();

    return (
        <View {...loadingProps} style={[styles.option, containerCustomStyles]}>
            <Text {...loadingTextProps} style={[styles.text, textCustomStyles]}>
                {loadingText}
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
