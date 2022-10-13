import type { ComponentProps, ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Animated, View } from 'react-native';

import type { OptionalToRequired } from '../../helpers/types/optional-to-required';
import { useAnimation } from '../../hooks/use-animation';
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
    const animation = useAnimation({ isOpened, animated, animationDuration });

    return animated ? (
        <Animated.View
            pointerEvents={isOpened ? 'auto' : 'none'}
            style={[wrapperStyles, { opacity: animation }]}
        >
            {children}
        </Animated.View>
    ) : isOpened ? (
        <View style={wrapperStyles}>{children}</View>
    ) : null;
};
