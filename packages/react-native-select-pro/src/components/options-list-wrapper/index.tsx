import type { ComponentProps, ReactNode } from 'react';
import React, { useEffect, useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Animated, View } from 'react-native';

import type { OptionalToRequired } from '../../helpers/types/optional-to-required';
import type { OptionsList } from '../options-list';

type FromOptionListProps = Pick<
    ComponentProps<typeof OptionsList>,
    'animated' | 'animationDuration' | 'isOpened'
>;

type WrapperStyles = {
    wrapperStyles: StyleProp<ViewStyle>;
};

type OptionsListWrapperProps = OptionalToRequired<FromOptionListProps> & {
    children: ReactNode;
} & WrapperStyles;

export const OptionsListWrapper = ({
    children,
    animated,
    animationDuration,
    isOpened,
    wrapperStyles,
}: OptionsListWrapperProps) => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (animated) {
            Animated.timing(fadeAnimation, {
                toValue: isOpened ? 1 : 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        }
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fadeAnimation, isOpened]);

    return animated ? (
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
