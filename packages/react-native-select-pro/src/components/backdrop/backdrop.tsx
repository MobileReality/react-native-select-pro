import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import type { BackdropProps } from './backdrop.types';

export const Backdrop = ({ onOutsidePress, backdrop }: BackdropProps) => {
    return (
        <TouchableWithoutFeedback
            accessibilityLabel="Close a dropdown from outside"
            accessibilityRole="button"
            onPress={onOutsidePress}
        >
            <View style={[styles.modalOverlay, backdrop]} />
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
