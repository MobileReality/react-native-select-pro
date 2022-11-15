import React from 'react';
import { Pressable } from 'react-native';

import { ArrowImage } from '../arrow-image';

import type { ArrowProps } from './arrow.types';

export const Arrow = ({
    isOpened,
    disabled,
    animation,
    multiSelection,
    onPressSelectControl,
    arrowIconStyles,
}: ArrowProps) => {
    const arrowImage = (
        <ArrowImage
            {...{
                isOpened,
                animation,
                arrowIconStyles,
            }}
        />
    );

    if (!multiSelection) {
        return arrowImage;
    }

    return (
        <Pressable
            accessibilityLabel="Arrow for opening dropdown"
            disabled={disabled}
            onPress={onPressSelectControl}
        >
            {arrowImage}
        </Pressable>
    );
};
