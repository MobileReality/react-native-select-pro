import React, { useEffect, useRef } from 'react';
import { Keyboard, StyleSheet, TextInput, TextStyle } from 'react-native';
import type {
    OnPressSelectControlType,
    OnSetPosition,
    SelectProps,
} from '@mobile-reality/react-native-select-pro';

import { COLORS, FONT_SIZE } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { DispatchType, State } from '../../state/types';
import { Action } from '../../state/types';

type SelectInputProps = OptionalToRequired<
    Pick<State, 'isOpened' | 'searchValue'> & { dispatch: DispatchType } & Pick<
            SelectProps,
            'placeholderText' | 'searchPattern' | 'disabled'
        > & { onPressSelectControl: OnPressSelectControlType } & { setPosition: OnSetPosition }
>;

export const SelectInput = ({
    disabled,
    isOpened,
    searchValue,
    searchPattern,
    placeholderText,
    onPressSelectControl,
    dispatch,
    setPosition,
}: SelectInputProps) => {
    const searchInputRef = useRef<TextInput>(null);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setPosition();
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setPosition();
        });
        dispatch({
            type: Action.SetSearchInputRef,
            payload: searchInputRef,
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
            dispatch({
                type: Action.SetSearchInputRef,
                payload: null,
            });
        };
    }, []);

    const onChangeText = (payload: string) => {
        if (!disabled) {
            if (!isOpened) {
                dispatch({ type: Action.Open });
            }
            dispatch({
                type: Action.SetSearchValue,
                payload,
            });
            if (searchPattern) {
                dispatch({
                    type: Action.SearchOptions,
                    searchPattern,
                    payload,
                });
            }
        }
    };

    return (
        <TextInput
            accessibilityLabel={'Place text'}
            editable={!disabled}
            onChangeText={onChangeText}
            onPressIn={!disabled ? onPressSelectControl : () => null}
            placeholder={placeholderText}
            ref={searchInputRef}
            style={disabled ? [styles.disabled, styles.text] : styles.text}
            value={searchValue}
        />
    );
};

type Styles = {
    text: TextStyle;
    disabled: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        fontSize: FONT_SIZE,
    },
    disabled: {
        backgroundColor: COLORS.DISABLED,
    },
});
