import type { ComponentProps, ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Animated, View } from 'react-native';

import type { OptionalToRequired } from '../../helpers/types/optional-to-required';
import { useAnimation } from '../../hooks/use-animation';
import type { OptionsList } from '../options-list';

type FromOptionListProps = Pick<ComponentProps<typeof OptionsList>, 'animation' | 'isOpened'>;

type WrapperStyles = {
    wrapperStyles: StyleProp<ViewStyle>;
};

type OptionsListWrapperProps = OptionalToRequired<FromOptionListProps> & {
    children: ReactNode;
} & WrapperStyles;

export const OptionsListWrapper = ({
    children,
    animation,
    isOpened,
    wrapperStyles,
}: OptionsListWrapperProps) => {
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
