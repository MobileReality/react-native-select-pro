import React, { forwardRef } from 'react';
import type { ViewStyle } from 'react-native';
import { Animated, StyleSheet, View } from 'react-native';

import { BORDER_WIDTH, COLORS, OPTIONS_LIST_HEIGHT, SHAPE } from '../../constants';

import { useOptionListWrapper } from './option-list-wrapper.hooks';
import type { OptionsListWrapperProps } from './options-list-wrapper.types';

export const OptionsListWrapper = forwardRef<View, OptionsListWrapperProps>(({ children }, ref) => {
    const {
        isOpened,
        fadeAnimation,
        optionsListCustomStyles,
        aboveSelectControl,
        top,
        left,
        width,
    } = useOptionListWrapper();

    return fadeAnimation ? (
        <Animated.View
            ref={ref}
            pointerEvents={isOpened ? 'auto' : 'none'}
            style={[
                styles.optionsList,
                aboveSelectControl ? styles.overflown : styles.notOverflown,
                optionsListCustomStyles,
                { top, left, width },
                { opacity: fadeAnimation },
            ]}
        >
            {children}
        </Animated.View>
    ) : isOpened ? (
        <View
            ref={ref}
            style={[
                styles.optionsList,
                aboveSelectControl ? styles.overflown : styles.notOverflown,
                optionsListCustomStyles,
                { top, left, width },
            ]}
        >
            {children}
        </View>
    ) : null;
});

type Styles = {
    optionsList: ViewStyle;
    notOverflown: ViewStyle;
    overflown: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    optionsList: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: COLORS.WHITE,
        borderWidth: BORDER_WIDTH,
        maxHeight: OPTIONS_LIST_HEIGHT,
        elevation: 5,
    },
    notOverflown: {
        borderTopWidth: 0,
        borderBottomRightRadius: SHAPE,
        borderBottomLeftRadius: SHAPE,
    },
    overflown: {
        borderBottomWidth: 0,
        borderTopRightRadius: SHAPE,
        borderTopLeftRadius: SHAPE,
    },
});

OptionsListWrapper.displayName = 'OptionsListWrapper';
