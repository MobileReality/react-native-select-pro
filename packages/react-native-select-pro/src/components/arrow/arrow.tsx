import React from 'react';
import type { ImageStyle } from 'react-native';
import { Animated, Image, Pressable, StyleSheet } from 'react-native';

import { useAnimation } from '../../hooks';

import type { ArrowProps } from './arrow.types';

const arrowImage = require('./../../assets/icons/chevron-down.png');

export const Arrow = ({
    isOpened,
    disabled,
    animation,
    multiSelection,
    onPressSelectControl,
    arrowIconStyles,
}: ArrowProps) => {
    const rotateAnimation = useAnimation({ isOpened, animation });
    const accessibilityLabel = 'Arrow for opening dropdown';
    const { iconStyle, iconSource } = arrowIconStyles ?? {};

    const resolveContent = () => {
        const arrowSource = iconSource ?? arrowImage;

        if (rotateAnimation) {
            const rotate = rotateAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
            });

            return (
                <Animated.Image
                    source={arrowSource}
                    style={[styles.arrowIcon, { transform: [{ rotate }] }, iconStyle]}
                />
            );
        }

        return (
            <Image
                source={arrowSource}
                style={[
                    styles.arrowIcon,
                    isOpened ? styles.arrowIconOpened : styles.arrowIconClosed,
                    iconStyle,
                ]}
            />
        );
    };
    const arrowContent = resolveContent();

    if (!multiSelection) {
        return arrowContent;
    }

    return (
        <Pressable
            accessibilityLabel={accessibilityLabel}
            onPress={disabled ? undefined : onPressSelectControl}
        >
            {arrowContent}
        </Pressable>
    );
};

type Styles = {
    arrowIcon: ImageStyle;
    arrowIconOpened: ImageStyle;
    arrowIconClosed: ImageStyle;
};

const styles = StyleSheet.create<Styles>({
    arrowIcon: {
        width: 25,
        height: 25,
        zIndex: -1,
    },
    arrowIconOpened: {
        transform: [{ rotate: '180deg' }],
    },
    arrowIconClosed: {
        transform: [{ rotate: '0deg' }],
    },
});