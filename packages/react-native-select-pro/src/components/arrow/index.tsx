import type { ComponentProps } from 'react';
import React from 'react';
import type { ImageStyle } from 'react-native';
import { Animated, Image, Pressable, StyleSheet } from 'react-native';

import type { OptionalToRequired } from '../../helpers/types/optional-to-required';
import { useAnimation } from '../../hooks/use-animation';
import type { State } from '../../state/types';
import type { OnPressSelectControlType } from '../../types';
import type { Select } from '../select';

const arrowImage = require('./../../assets/icons/chevron-down.png');

type ArrowProps = OptionalToRequired<
    { onPressSelectControl: OnPressSelectControlType } & Pick<State, 'isOpened'> &
        Pick<
            ComponentProps<typeof Select>,
            | 'animation'
            | 'multiSelection'
            | 'disabled'
            | 'selectControlArrowImageStyle'
            | 'customSelectControlArrowIconSource'
        >
>;

export const Arrow = ({
    isOpened,
    disabled,
    animation,
    multiSelection,
    selectControlArrowImageStyle,
    customSelectControlArrowIconSource,
    onPressSelectControl,
}: ArrowProps) => {
    const rotateAnimation = useAnimation({ isOpened, animation });
    const accessibilityLabel = 'Arrow for opening dropdown';

    const resolveContent = () => {
        const arrowSource = customSelectControlArrowIconSource ?? arrowImage;

        if (rotateAnimation) {
            const rotate = rotateAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
            });

            return (
                <Animated.Image
                    source={arrowSource}
                    style={[
                        styles.arrowIcon,
                        { transform: [{ rotate }] },
                        selectControlArrowImageStyle,
                    ]}
                />
            );
        }

        return (
            <Image
                source={arrowSource}
                style={[
                    styles.arrowIcon,
                    isOpened ? styles.arrowIconOpened : styles.arrowIconClosed,
                    selectControlArrowImageStyle,
                ]}
            />
        );
    };
    const arrowContent = resolveContent();

    if (!multiSelection) {
        return arrowContent;
    }

    return (
        <Pressable
            accessibilityLabel={accessibilityLabel}
            onPress={disabled ? undefined : onPressSelectControl}
        >
            {arrowContent}
        </Pressable>
    );
};

type Styles = {
    arrowIcon: ImageStyle;
    arrowIconOpened: ImageStyle;
    arrowIconClosed: ImageStyle;
};

const styles = StyleSheet.create<Styles>({
    arrowIcon: {
        width: 25,
        height: 25,
        zIndex: -1,
    },
    arrowIconOpened: {
        transform: [{ rotate: '180deg' }],
    },
    arrowIconClosed: {
        transform: [{ rotate: '0deg' }],
    },
});
