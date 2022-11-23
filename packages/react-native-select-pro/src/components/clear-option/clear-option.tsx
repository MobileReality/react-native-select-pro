import React from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet } from 'react-native';

import { useSelectContext } from '../../context';

import type { ClearOptionProps } from './clear-option.types';

const iconSource = require('./../../assets/icons/x.png');

export const ClearOption = ({ onPressRemove }: ClearOptionProps) => {
    const { selectControlClearOptionA11yLabel, styles: mainStyles, disabled } = useSelectContext();
    const { clear } = mainStyles?.select ?? {};

    return (
        <Pressable
            accessibilityLabel={selectControlClearOptionA11yLabel ?? 'Clear a chosen option'}
            accessibilityRole="button"
            accessible={true}
            hitSlop={clear?.hitSlop ?? { right: 3, left: 3 }}
            style={[styles.xIconWrapper, clear?.button]}
            disabled={disabled}
            onPress={onPressRemove}
        >
            <Image source={iconSource} style={[styles.xIcon, clear?.icon]} />
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
