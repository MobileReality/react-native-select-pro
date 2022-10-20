import React, { useEffect, useRef } from 'react';
import type { TextStyle } from 'react-native';
import { I18nManager, Keyboard, StyleSheet, TextInput } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants/styles';
import { Action } from '../../state/types';

import type { SelectInputProps } from './select-input.types';

export const SelectInput = ({
    disabled,
    isOpened,
    searchValue,
    searchPattern,
    textInputProps,
    placeholderText,
    onPressSelectControl,
    dispatch,
    setPosition,
    multiSelection,
    selectedOption,
    placeholderTextColor,
    textStyle,
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
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const resolvePlaceholder = () => {
        if (multiSelection && Array.isArray(selectedOption) && selectedOption.length > 0) {
            return '  ';
        }
        return placeholderText;
    };

    return (
        <TextInput
            {...textInputProps}
            ref={searchInputRef}
            accessibilityLabel="Place text"
            editable={!disabled}
            placeholder={resolvePlaceholder()}
            placeholderTextColor={placeholderTextColor}
            style={
                disabled
                    ? [styles.disabled, styles.text, multiSelection && { marginRight: 5 }]
                    : [styles.text, textStyle]
            }
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
            value={searchValue}
            onChangeText={onChangeText}
            onPressIn={disabled ? () => null : onPressSelectControl}
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