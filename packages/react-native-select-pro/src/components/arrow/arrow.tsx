import React, { useMemo } from 'react';
import type { ImageStyle } from 'react-native';
import { Animated, Image, StyleSheet, View } from 'react-native';

import { useSelectContext } from '../../context';
import { useAnimation } from '../../hooks';

const arrowImage = require('./../../assets/icons/chevron-down.png');

export const Arrow = () => {
    const {
        isOpened,
        styles: mainStyles,
        animation,
        arrowImageProps,
        arrowContainerProps,
    } = useSelectContext();

    const { arrow } = mainStyles?.select ?? {};

    const rotateAnimation = useAnimation({ isOpened, animation });

    const renderImage = useMemo(() => {
        if (rotateAnimation) {
            const rotate = rotateAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
            });

            return (
                <Animated.Image
                    source={arrowImage}
                    {...arrowImageProps}
                    style={[styles.arrowIcon, { transform: [{ rotate }] }, arrow?.icon]}
                />
            );
        }

        return (
            <Image
                source={arrowImage}
                {...arrowImageProps}
                style={[styles.arrowIcon, isOpened && styles.arrowIconOpened, arrow?.icon]}
            />
        );
    }, [arrow?.icon, arrowImageProps, isOpened, rotateAnimation]);

    return (
        <View {...arrowContainerProps} style={arrow?.container}>
            {renderImage}
        </View>
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
