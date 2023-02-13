import React, { useMemo } from 'react';
import type { ImageStyle } from 'react-native';
import { Animated, Image, StyleSheet, View } from 'react-native';

import { useArrow } from './arrow.hooks';

const arrowImage = require('./../../assets/icons/chevron-down.png');

export const Arrow = () => {
    const {
        arrowImageProps,
        arrowContainerProps,
        rotateAnimation,
        containerCustomStyles,
        iconCustomStyles,
        isOpened,
    } = useArrow();

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
                    style={[styles.arrowIcon, { transform: [{ rotate }] }, iconCustomStyles]}
                />
            );
        }

        return (
            <Image
                source={arrowImage}
                {...arrowImageProps}
                style={[styles.arrowIcon, isOpened && styles.arrowIconOpened, iconCustomStyles]}
            />
        );
    }, [iconCustomStyles, arrowImageProps, isOpened, rotateAnimation]);

    return (
        <View testID="Dropdown arrow" {...arrowContainerProps} style={containerCustomStyles}>
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
