import React from 'react';
import { StyleSheet, TextInput, TextStyle } from 'react-native';
import type {
    OnPressSelectControlType,
    SelectProps,
} from '@mobile-reality/react-native-select-pro';

import { FONT_SIZE } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { DispatchType, State } from '../../state/types';
import { Action } from '../../state/types';

type SelectInputProps = OptionalToRequired<
    Pick<State, 'isOpened' | 'searchValue'> & { dispatch: DispatchType } & Pick<
            SelectProps,
            'placeholderText' | 'searchPattern'
        > & { onPressSelectControl: OnPressSelectControlType }
>;

export const SelectInput = ({
    isOpened,
    searchValue,
    searchPattern,
    placeholderText,
    onPressSelectControl,
    dispatch,
}: SelectInputProps) => {
    const onChangeText = (payload: string) => {
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
    };

    return (
        <TextInput
            onChangeText={onChangeText}
            onPressIn={onPressSelectControl}
            placeholder={placeholderText}
            style={styles.text}
            value={searchValue}
        />
    );
};

type Styles = {
    text: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    text: {
        fontSize: FONT_SIZE,
    },
});
