import React from 'react';
import { Animated, View } from 'react-native';

import { useOptionsListContext } from '../../context';
import { useAnimation } from '../../hooks';

import type { OptionsListWrapperProps } from './options-list-wrapper.types';

export const OptionsListWrapper = ({ children, wrapperStyles }: OptionsListWrapperProps) => {
    const { animation, isOpened } = useOptionsListContext();
    const fadeAnimation = useAnimation({ isOpened, animation });

    return fadeAnimation ? (
        <Animated.View
            pointerEvents={isOpened ? 'auto' : 'none'}
            style={[wrapperStyles, { opacity: fadeAnimation }]}
        >
            {children}
        </Animated.View>
    ) : isOpened ? (
        <View style={wrapperStyles}>{children}</View>
    ) : null;
};
