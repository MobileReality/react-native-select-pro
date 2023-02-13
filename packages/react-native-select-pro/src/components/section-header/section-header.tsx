import React from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONT_SIZE, PADDING, PRESSED_STYLE } from '../../constants';

import { useSectionHeader } from './section-header.hooks';
import type { SectionHeaderProps } from './section-header.types';

const iconSource = require('./../../assets/icons/x.png');

export const SectionHeader = ({ title, isSelected }: SectionHeaderProps) => {
    const {
        sectionHeaderCustomStyles,
        onPressSection,
        sectionHeaderButtonProps,
        sectionHeaderTextProps,
        sectionHeaderImageProps,
        isDisabled,
    } = useSectionHeader();

    return (
        <Pressable
            disabled={isDisabled}
            accessibilityState={{ disabled: isDisabled }}
            {...sectionHeaderButtonProps}
            style={({ pressed }) => [
                styles.sectionHeaderContainerStyle,
                sectionHeaderCustomStyles?.container,
                isSelected && sectionHeaderCustomStyles?.selected?.container,
                pressed && (sectionHeaderCustomStyles?.pressed ?? PRESSED_STYLE),
            ]}
            onPress={() => onPressSection(title)}
        >
            <Text
                {...sectionHeaderTextProps}
                style={[
                    styles.sectionHeaderTextStyle,
                    sectionHeaderCustomStyles?.text,
                    isSelected && sectionHeaderCustomStyles?.selected?.text,
                ]}
            >
                {title}
            </Text>
            {isSelected && (
                <Image
                    source={iconSource}
                    {...sectionHeaderImageProps}
                    style={[styles.xIcon, sectionHeaderCustomStyles?.clear?.icon]}
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
