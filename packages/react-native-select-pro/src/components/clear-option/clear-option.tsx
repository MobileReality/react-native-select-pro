import React from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet } from 'react-native';

import { useSelectContext } from '../../context';

import type { ClearOptionProps } from './clear-option.types';

const iconSource = require('./../../assets/icons/x.png');

export const ClearOption = ({ onPressRemove }: ClearOptionProps) => {
    const {
        styles: mainStyles,
        disabled,
        clearOptionButtonProps,
        clearOptionImageProps,
    } = useSelectContext();

    const { clear } = mainStyles?.select ?? {};

    return (
        <Pressable
            accessibilityLabel="Clear a selected option"
            accessibilityRole="button"
            accessible={true}
            accessibilityState={{ disabled }}
            hitSlop={{ right: 3, left: 3 }}
            disabled={disabled}
            {...clearOptionButtonProps}
            style={[styles.xIconWrapper, clear?.container]}
            onPress={() => onPressRemove(null)}
        >
            <Image
                source={iconSource}
                {...clearOptionImageProps}
                style={[styles.xIcon, clear?.icon]}
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
