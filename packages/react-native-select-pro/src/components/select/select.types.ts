import type { Dispatch, ForwardedRef, RefObject } from 'react';
import type { View } from 'react-native';

import type { ActionType, State } from '../../state';
import type { OptionalToRequired, SelectProps, SelectRef } from '../../types';

type FromSelectComponent<T> = Pick<
    SelectProps<T>,
    | 'defaultOption'
    | 'disabled'
    | 'searchable'
    | 'multiple'
    | 'closeOptionsListOnSelect'
    | 'onSelectOpened'
    | 'onSelectClosed'
    | 'onRemove'
    | 'onSectionSelect'
    | 'onSectionRemove'
    | 'onSelect'
>;

export type UseSelect<T> = OptionalToRequired<
    FromSelectComponent<T> & {
        dispatch: Dispatch<ActionType<T>>;
        selectControlRef: RefObject<View>;
        optionsListRef: RefObject<View>;
        ref: ForwardedRef<SelectRef<T>>;
        state: State<T>;
    }
>;
