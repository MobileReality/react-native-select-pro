import { useEffect, useRef } from 'react';
import type { TextInput } from 'react-native';
import { Keyboard } from 'react-native';

import { useSelectContext } from '../../context';

export const useSelectInput = () => {
    const searchInputRef = useRef<TextInput>(null);

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
        styles,
        selectedOption,
    } = useSelectContext();

    const { select: selectStyles } = styles ?? {};
    const { text: textCustomStyles } = selectStyles ?? {};

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', async () => {
            await setOptionsListPosition();
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', async () => {
            await setOptionsListPosition();
        });
        dispatch({
            type: 'setSearchInputRef',
            payload: searchInputRef,
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
            dispatch({
                type: 'setSearchInputRef',
                payload: null,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeText = (payload: string) => {
        if (disabled) {
            return;
        }
        if (!isOpened) {
            dispatch({ type: 'open' });
        }
        dispatch({
            type: 'setSearchValue',
            payload,
        });
        if (searchPattern) {
            dispatch({
                type: 'searchOptions',
                searchPattern,
                payload,
            });
        }
        // callback

        onSelectChangeText?.(payload);
    };

    const resolvePlaceholder = () => {
        if (multiple && Array.isArray(selectedOption) && selectedOption.length > 0) {
            return '  ';
        }
        return placeholderText;
    };

    const resolvedPlaceholder = resolvePlaceholder();

    return {
        disabled,
        multiple,
        placeholderTextColor,
        searchValue,
        onPressSelectControl,
        selectInputProps,
        textCustomStyles,
        searchInputRef,
        resolvedPlaceholder,
        onChangeText,
    };
};
