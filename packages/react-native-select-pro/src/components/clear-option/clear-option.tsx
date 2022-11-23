import React from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet } from 'react-native';

import { useSelectContext } from '../../context';

import type { ClearOptionProps } from './clear-option.types';

const icon = require('./../../assets/icons/x.png');

export const ClearOption = ({ onPressRemove }: ClearOptionProps) => {
    const { selectControlClearOptionA11yLabel, clearOptionStyles, disabled } = useSelectContext();
    const { buttonHitSlop, buttonStyle, iconStyle } = clearOptionStyles ?? {};

    return (
        <Pressable
            accessibilityLabel={selectControlClearOptionA11yLabel ?? 'Clear a chosen option'}
            accessibilityRole="button"
            accessible={true}
            hitSlop={buttonHitSlop ?? { right: 3, left: 3 }}
            style={[styles.xIconWrapper, buttonStyle]}
            disabled={disabled}
            onPress={onPressRemove}
        >
            <Image source={icon} style={[styles.xIcon, iconStyle]} />
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