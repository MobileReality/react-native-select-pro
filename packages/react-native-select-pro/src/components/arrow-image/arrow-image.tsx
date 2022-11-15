import React from 'react';
import type { ImageStyle } from 'react-native';
import { Animated, Image, StyleSheet } from 'react-native';

import { useAnimation } from '../../hooks';

import type { ArrowImageProps } from './arrow-image.types';

const arrowImage = require('./../../assets/icons/chevron-down.png');

export const ArrowImage = ({ isOpened, animation, arrowIconStyles }: ArrowImageProps) => {
    const rotateAnimation = useAnimation({ isOpened, animation });
    const { iconStyle, iconSource } = arrowIconStyles ?? {};

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
            style={[styles.arrowIcon, isOpened && styles.arrowIconOpened, iconStyle]}
        />
    );
};

type Styles = {
    arrowIcon: ImageStyle;
    arrowIconOpened: ImageStyle;
};

const styles = StyleSheet.create<Styles>({
    arrowIcon: {
        width: 24,
        height: 24,
        zIndex: -1,
    },
    arrowIconOpened: {
        transform: [{ rotate: '180deg' }],
    },
});
