import React from 'react';
import { Pressable } from 'react-native';

import { useSelectContext } from '../../context';
import { ArrowImage } from '../arrow-image';

export const Arrow = () => {
    const {
        disabled,
        multiSelection,
        onPressSelectControl,
        styles: mainStyles,
        arrowButtonProp,
    } = useSelectContext();

    if (!multiSelection) {
        return <ArrowImage />;
    }

    const { arrow } = mainStyles?.select ?? {};

    return (
        <Pressable
            accessibilityLabel="Arrow for opening dropdown"
            disabled={disabled}
            {...arrowButtonProp}
            style={arrow?.button}
            onPress={onPressSelectControl}
        >
            <ArrowImage />
        </Pressable>
    );
};
