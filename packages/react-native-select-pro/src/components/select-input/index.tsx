import React, { useEffect, useRef } from 'react';
import type { TextStyle } from 'react-native';
import { I18nManager, Keyboard, StyleSheet, TextInput } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers/types/optional-to-required';
import type { DispatchType, State } from '../../state/types';
import { Action } from '../../state/types';
import type { OnPressSelectControlType, OnSetPosition, SelectProps } from '../../types';
import type { SelectControlStyles } from '../../types/styles';

type SelectInputProps = OptionalToRequired<
    Pick<State, 'isOpened' | 'searchValue' | 'selectedOption'> & {
        dispatch: DispatchType;
    } & Pick<
            SelectProps,
            | 'placeholderText'
            | 'searchPattern'
            | 'disabled'
            | 'multiSelection'
            | 'placeholderTextColor'
            | 'textInputProps'
        > & { onPressSelectControl: OnPressSelectControlType } & {
            setPosition: OnSetPosition;
        } & Pick<SelectControlStyles, 'textStyle'>
>;

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
