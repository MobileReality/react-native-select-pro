import type { ComponentProps } from 'react';
import React from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet } from 'react-native';

import type { OptionalToRequired } from '../../helpers/types/optional-to-required';
import type { SelectControl } from '../select-control';

type FromSelectControlProps = Pick<
    ComponentProps<typeof SelectControl>,
    | 'selectControlClearOptionA11yLabel'
    | 'disabled'
    | 'selectControlClearOptionButtonHitSlop'
    | 'selectControlClearOptionButtonStyle'
    | 'selectControlClearOptionImageStyle'
> & {
    onPressRemove: () => void;
};

type ClearOptionProps = OptionalToRequired<FromSelectControlProps>;

export const ClearOption = ({
    selectControlClearOptionA11yLabel,
    disabled,
    selectControlClearOptionButtonHitSlop,
    selectControlClearOptionButtonStyle,
    selectControlClearOptionImageStyle,
    onPressRemove,
}: ClearOptionProps) => {
    return (
        <Pressable
            accessibilityLabel={selectControlClearOptionA11yLabel ?? 'Clear a chosen option'}
            accessibilityRole="button"
            accessible={true}
            disabled={disabled}
            hitSlop={selectControlClearOptionButtonHitSlop ?? { right: 3, left: 3 }}
            style={[styles.xIconWrapper, selectControlClearOptionButtonStyle]}
            onPress={onPressRemove}
        >
            <Image
                source={require('./../../assets/icons/x.png')}
                style={[styles.xIcon, selectControlClearOptionImageStyle]}
            />
        </Pressable>
    );
};

type Styles = {
    xIcon: ImageStyle;
    xIconWrapper: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    xIconWrapper: {
        height: '100%',
        justifyContent: 'center',
    },
    xIcon: {
        width: 20,
        height: 20,
        zIndex: 1,
    },
});
