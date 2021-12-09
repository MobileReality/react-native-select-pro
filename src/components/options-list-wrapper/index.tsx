import React, { ComponentProps, ReactElement, useRef } from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';

import { ANIMATION_DURATION } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { Select } from '../../index';
import type { OptionsList } from '../options-list';

type FromSelectProps = Pick<ComponentProps<typeof Select>, 'isAnimated'>;
type FromOptionListProps = Pick<ComponentProps<typeof OptionsList>, 'isOpened'>;

type WrapperStyles = {
    wrapperStyles: StyleProp<ViewStyle>;
};

type OptionsListWrapperProps = OptionalToRequired<FromSelectProps & FromOptionListProps> & {
    children: ReactElement;
} & WrapperStyles;

export const OptionsListWrapper = ({
    children,
    isAnimated,
    isOpened,
    wrapperStyles,
}: OptionsListWrapperProps) => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (isAnimated) {
            Animated.timing(fadeAnimation, {
                toValue: isOpened ? 1 : 0,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }).start();
        }
    }, [fadeAnimation, isOpened]);

    return isAnimated ? (
        <Animated.View
            pointerEvents={isOpened ? 'auto' : 'none'}
            style={[wrapperStyles, { opacity: fadeAnimation }]}>
            {children}
        </Animated.View>
    ) : isOpened ? (
        <View style={wrapperStyles}>{children}</View>
    ) : null;
};
