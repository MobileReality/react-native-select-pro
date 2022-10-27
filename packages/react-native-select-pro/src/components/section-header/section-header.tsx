import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { COLORS, FONT_SIZE, PADDING } from '../../constants/styles';

import type { SectionHeaderProps } from './section-header.types';

export const SectionHeader = ({
    title,
    sectionHeaderTextStyle,
    sectionHeaderContainerStyle,
}: SectionHeaderProps) => (
    <View style={[styles.sectionHeaderContainerStyle, sectionHeaderContainerStyle]}>
        <Text style={[styles.sectionHeaderTextStyle, sectionHeaderTextStyle]}>{title}</Text>
    </View>
);

type Styles = {
    sectionHeaderContainerStyle: ViewStyle;
    sectionHeaderTextStyle: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    sectionHeaderTextStyle: {
        fontSize: FONT_SIZE,
        color: COLORS.BLACK,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    sectionHeaderContainerStyle: {
        padding: PADDING,
        backgroundColor: COLORS.WHITE,
    },
});
