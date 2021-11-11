import React, { useState } from 'react';
import { StyleSheet, TextInput, TextStyle } from 'react-native';
import type { SelectProps } from '@mobile-reality/react-native-select-pro';

import { FONT_SIZE, PADDING } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { DispatchType, State } from '../../state/types';

type SelectInputProps = OptionalToRequired<
    Pick<State, 'isOpened' | 'selectedOption'> & { dispatch: DispatchType } & Pick<
            SelectProps,
            'placeholderText'
        >
>;

export const SelectInput = ({ selectedOption, placeholderText }: SelectInputProps) => {
    const [inputValue, setInputValue] = useState('');

    const value = selectedOption?.label || inputValue;

    return (
        <TextInput
            onChangeText={setInputValue}
            placeholder={placeholderText}
            style={styles.text}
            value={value}
        />
    );
};

type Styles = {
    text: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        padding: PADDING,
        fontSize: FONT_SIZE,
        color: 'red',
    },
});
