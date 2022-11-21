import React from 'react';
import { Pressable } from 'react-native';

import { useSelectContext } from '../../context';
import { ArrowImage } from '../arrow-image';

export const Arrow = () => {
    const { disabled, multiSelection, onPressSelectControl } = useSelectContext();
    if (!multiSelection) {
        return <ArrowImage />;
    }

    return (
        <Pressable
            accessibilityLabel="Arrow for opening dropdown"
            disabled={disabled}
            onPress={onPressSelectControl}
        >
            <ArrowImage />
        </Pressable>
    );
};
