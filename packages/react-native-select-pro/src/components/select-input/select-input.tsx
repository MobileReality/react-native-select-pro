import React from 'react';
import type { TextStyle } from 'react-native';
import { I18nManager, StyleSheet, TextInput } from 'react-native';

import { COLORS, FONT_SIZE } from '../../constants';

import { useSelectInput } from './select-input.hooks';

export const SelectInput = () => {
    const {
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
    } = useSelectInput();

    return (
        <TextInput
            accessibilityLabel="Place text"
            {...selectInputProps}
            ref={searchInputRef}
            editable={!disabled}
            placeholder={resolvedPlaceholder}
            placeholderTextColor={placeholderTextColor}
            style={
                disabled
                    ? [styles.disabled, styles.text, multiple && styles.marginMultiple]
                    : [styles.text, textCustomStyles]
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
    marginMultiple: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        fontSize: FONT_SIZE,
    },
    disabled: {
        backgroundColor: COLORS.DISABLED,
    },
    marginMultiple: {
        marginRight: 6,
    },
});
