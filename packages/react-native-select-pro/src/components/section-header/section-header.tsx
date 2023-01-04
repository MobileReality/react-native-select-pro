import React from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Image, Pressable } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

import { COLORS, FONT_SIZE, PADDING, PRESSED_STYLE } from '../../constants';
import { useOptionsListContext } from '../../context';

import type { SectionHeaderProps } from './section-header.types';

const iconSource = require('./../../assets/icons/x.png');

export const SectionHeader = ({ title, isSelected }: SectionHeaderProps) => {
    const {
        styles: mainStyles,
        onPressSection,
        sectionHeaderButtonProps,
        sectionHeaderTextProps,
        sectionHeaderImageProps,
    } = useOptionsListContext();

    const { sectionHeader } = mainStyles ?? {};

    return (
        <Pressable
            {...sectionHeaderButtonProps}
            style={({ pressed }) => [
                styles.sectionHeaderContainerStyle,
                sectionHeader,
                isSelected && sectionHeader?.selected,
                pressed && (sectionHeader?.pressed ?? PRESSED_STYLE),
            ]}
            onPress={() => onPressSection(title)}
        >
            <Text
                {...sectionHeaderTextProps}
                style={[
                    styles.sectionHeaderTextStyle,
                    sectionHeader?.text,
                    isSelected && sectionHeader?.selectedText,
                ]}
            >
                {title}
            </Text>
            {isSelected && (
                <Image
                    source={iconSource}
                    {...sectionHeaderImageProps}
                    style={[styles.xIcon, sectionHeader?.clearIcon]}
                />
            )}
        </Pressable>
    );
};

type Styles = {
    sectionHeaderContainerStyle: ViewStyle;
    sectionHeaderTextStyle: TextStyle;
    xIcon: ImageStyle;
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    xIcon: {
        width: 16,
        height: 16,
    },
});
