import React, { ComponentPropsWithRef } from 'react';
import { Image, ImageStyle, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import type { Select } from '@mobile-reality/react-native-select-pro';

import type { OptionalToRequired } from '../../helpers';
import { Action, DispatchType } from '../../state/types';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'options'
    | 'disabled'
    | 'onSelect'
    | 'selectControlClearOptionA11yLabel'
    | 'selectControlClearOptionButtonStyle'
    | 'selectControlClearOptionButtonHitSlop'
    | 'selectControlClearOptionImageStyle'
>;

type RemoveOptionButtonProps = OptionalToRequired<
    FromSelectComponentProps & { dispatch: DispatchType }
>;

export const RemoveOptionButton = ({
    disabled,
    dispatch,
    options,
    onSelect,
    selectControlClearOptionButtonHitSlop,
    selectControlClearOptionButtonStyle,
    selectControlClearOptionImageStyle,
    selectControlClearOptionA11yLabel,
}: RemoveOptionButtonProps) => {
    const onPressRemove = () => {
        if (!disabled) {
            dispatch({
                type: Action.SelectOption,
                payload: null,
            });
            dispatch({
                type: Action.SetOptionsData,
                payload: options,
            });
            if (onSelect) {
                onSelect(null);
            }
        }
    };

    return (
        <TouchableOpacity
            accessibilityLabel={selectControlClearOptionA11yLabel || 'Clear a chosen option'}
            disabled={disabled}
            hitSlop={
                selectControlClearOptionButtonHitSlop
                    ? selectControlClearOptionButtonHitSlop
                    : { right: 3, left: 3 }
            }
            onPress={onPressRemove}
            style={[styles.xIconWrapper, selectControlClearOptionButtonStyle]}>
            <Image
                source={require('./../../assets/icons/x.png')}
                style={[styles.xIcon, selectControlClearOptionImageStyle]}
            />
        </TouchableOpacity>
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
