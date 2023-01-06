import React, { useEffect, useRef } from 'react';
import type { TextStyle } from 'react-native';
import { I18nManager, Keyboard, StyleSheet, TextInput } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants';
import { useSelectContext } from '../../context';
import { Action } from '../../state';

export const SelectInput = () => {
    const {
        isOpened,
        disabled,
        multiple,
        placeholderText,
        placeholderTextColor,
        searchPattern,
        searchValue,
        onPressSelectControl,
        selectInputProps,
        dispatch,
        setOptionsListPosition,
        onSelectChangeText,
        styles: mainStyles,
        selectedOption,
    } = useSelectContext();
    const searchInputRef = useRef<TextInput>(null);

    const { select: selectStyles } = mainStyles ?? {};
    const { text: textStyles } = selectStyles ?? {};

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', async () => {
            await setOptionsListPosition();
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', async () => {
            await setOptionsListPosition();
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
            onSelectChangeText?.(payload);
        }
    };

    const resolvePlaceholder = () => {
        if (multiple && Array.isArray(selectedOption) && selectedOption.length > 0) {
            return '  ';
        }
        return placeholderText;
    };

    return (
        <TextInput
            accessibilityLabel="Place text"
            {...selectInputProps}
            ref={searchInputRef}
            editable={!disabled}
            placeholder={resolvePlaceholder()}
            placeholderTextColor={placeholderTextColor}
            style={
                disabled
                    ? [styles.disabled, styles.text, multiple && { marginRight: 5 }]
                    : [styles.text, textStyles]
            }
            textAlign={I18nManager.getConstants().isRTL ? 'right' : 'left'}
            value={searchValue ?? ''}
            onChangeText={onChangeText}
            onPressIn={disabled ? undefined : onPressSelectControl}
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
