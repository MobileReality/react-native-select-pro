import React from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet } from 'react-native';

import { useClearOption } from './clear-option.hooks';

const iconSource = require('./../../assets/icons/x.png');

export const ClearOption = () => {
    const {
        disabled,
        clearOptionButtonProps,
        clearOptionImageProps,
        iconCustomStyles,
        containerCustomStyles,
        onPressClearOption,
    } = useClearOption();

    return (
        <Pressable
            accessibilityLabel="Clear a selected option"
            accessibilityRole="button"
            accessible={true}
            accessibilityState={{ disabled }}
            hitSlop={{ right: 3, left: 3 }}
            disabled={disabled}
            {...clearOptionButtonProps}
            style={[styles.xIconWrapper, containerCustomStyles]}
            onPress={onPressClearOption}
        >
            <Image
                source={iconSource}
                {...clearOptionImageProps}
                style={[styles.xIcon, iconCustomStyles]}
            />
        </Pressable>
    );
};

type Styles = {
    xIcon: ImageStyle;
    xIconWrapper: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    xIconWrapper: {
        height: '100%',
        justifyContent: 'center',
    },
    xIcon: {
        width: 20,
        height: 20,
        zIndex: 1,
    },
});
