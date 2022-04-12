import React, { ComponentProps, ReactNode, useEffect, useRef } from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';

import type { OptionalToRequired } from '../../helpers/types/OptionalToRequired';
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
