import React, { forwardRef } from 'react';
import { Animated, View } from 'react-native';

import { useOptionsListContext } from '../../context';
import { useAnimation } from '../../hooks';

import type { OptionsListWrapperProps } from './options-list-wrapper.types';

export const OptionsListWrapper = forwardRef<View, OptionsListWrapperProps>(
    ({ children, wrapperStyles }, ref) => {
        const { animation, isOpened } = useOptionsListContext();
        const fadeAnimation = useAnimation({ isOpened, animation });

        return fadeAnimation ? (
            <Animated.View
                ref={ref}
                pointerEvents={isOpened ? 'auto' : 'none'}
                style={[wrapperStyles, { opacity: fadeAnimation }]}
            >
                {children}
            </Animated.View>
        ) : isOpened ? (
            <View ref={ref} style={wrapperStyles}>
                {children}
            </View>
        ) : null;
    },
);

OptionsListWrapper.displayName = 'OptionsListWrapper';
