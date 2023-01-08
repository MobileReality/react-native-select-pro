import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import type { BackdropProps } from './backdrop.types';

export const Backdrop = <T,>({
    onOutsidePress,
    backdropCustomStyles,
    backdropProps,
    backdropChildProps,
}: BackdropProps<T>) => {
    return (
        <TouchableWithoutFeedback
            accessibilityLabel="Close a dropdown from outside"
            accessibilityRole="button"
            {...backdropProps}
            onPress={onOutsidePress}
        >
            <View {...backdropChildProps} style={[styles.modalOverlay, backdropCustomStyles]} />
        </TouchableWithoutFeedback>
    );
};

type Styles = {
    modalOverlay: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
});
