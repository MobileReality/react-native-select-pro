import React from 'react';
import { StyleSheet, TextInput, TextStyle } from 'react-native';
import type {
    OnPressSelectControlType,
    SelectProps,
} from '@mobile-reality/react-native-select-pro';

import { FONT_SIZE, PADDING } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { DispatchType, State } from '../../state/types';
import { Action } from '../../state/types';

type SelectInputProps = OptionalToRequired<
    Pick<State, 'isOpened' | 'selectedOption' | 'searchValue'> & { dispatch: DispatchType } & Pick<
            SelectProps,
            'placeholderText'
        > & {
            onPressSelectControl: OnPressSelectControlType;
        }
>;

export const SelectInput = ({
    selectedOption,
    searchValue,
    placeholderText,
    onPressSelectControl,
    dispatch,
}: SelectInputProps) => {
    const onChangeText = (payload: string) => {
        dispatch({
            type: Action.SetSearchValue,
            payload,
        });
    };

    return (
        <TextInput
            onChangeText={onChangeText}
            onPressIn={onPressSelectControl}
            placeholder={placeholderText}
            style={styles.text}
            value={searchValue || selectedOption?.label}
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
