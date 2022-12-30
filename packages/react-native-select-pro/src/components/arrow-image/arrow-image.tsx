import React from 'react';
import type { ImageStyle } from 'react-native';
import { Animated, Image, StyleSheet } from 'react-native';

import { useSelectContext } from '../../context';
import { useAnimation } from '../../hooks';

const arrowImage = require('./../../assets/icons/chevron-down.png');

export const ArrowImage = () => {
    const { isOpened, styles: mainStyles, animation, arrowImageProp } = useSelectContext();
    const rotateAnimation = useAnimation({ isOpened, animation });
    const { arrow } = mainStyles?.select ?? {};

    if (rotateAnimation) {
        const rotate = rotateAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });

        return (
            <Animated.Image
                source={arrowImage}
                {...arrowImageProp}
                style={[styles.arrowIcon, { transform: [{ rotate }] }, arrow?.icon]}
            />
        );
    }

    return (
        <Image
            source={arrowImage}
            {...arrowImageProp}
            style={[styles.arrowIcon, isOpened && styles.arrowIconOpened, arrow?.icon]}
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
