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

    const isPositionSet = isOpened && top !== 0 && left !== 0 && width !== 0;

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
                isPositionSet ? styles.visible : styles.hidden,
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
                isPositionSet ? styles.visible : styles.hidden,
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
    visible: ViewStyle;
    hidden: ViewStyle;
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
    visible: {
        display: 'flex',
    },
    hidden: {
        display: 'none',
    },
});

OptionsListWrapper.displayName = 'OptionsListWrapper';
