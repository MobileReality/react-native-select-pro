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
        multiple,
        disabled,
    } = useOptionsListContext();

    const { sectionHeader } = mainStyles ?? {};

    const isDisabled = disabled ?? !multiple;

    return (
        <Pressable
            disabled={isDisabled}
            accessibilityState={{ disabled: isDisabled }}
            {...sectionHeaderButtonProps}
            style={({ pressed }) => [
                styles.sectionHeaderContainerStyle,
                sectionHeader?.container,
                isSelected && sectionHeader?.selected?.container,
                pressed && (sectionHeader?.pressed ?? PRESSED_STYLE),
            ]}
            onPress={() => onPressSection(title)}
        >
            <Text
                {...sectionHeaderTextProps}
                style={[
                    styles.sectionHeaderTextStyle,
                    sectionHeader?.text,
                    isSelected && sectionHeader?.selected?.text,
                ]}
            >
                {title}
            </Text>
            {isSelected && (
                <Image
                    source={iconSource}
                    {...sectionHeaderImageProps}
                    style={[styles.xIcon, sectionHeader?.clear?.icon]}
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
