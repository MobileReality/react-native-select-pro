import type { ForwardedRef, RefObject } from 'react';
import type { View } from 'react-native';

import type { DispatchType, State } from '../../state';
import type { OptionalToRequired, SelectProps, SelectRef } from '../../types';

type FromSelectComponent<T> = Pick<
    SelectProps<T>,
    | 'defaultOption'
    | 'disabled'
    | 'searchable'
    | 'multiple'
    | 'closeDropdownOnSelect'
    | 'onSelectOpened'
    | 'onSelectClosed'
    | 'onRemove'
    | 'onSectionSelect'
    | 'onSectionRemove'
    | 'onSelect'
>;

export type UseSelect<T> = OptionalToRequired<
    FromSelectComponent<T> & {
        dispatch: DispatchType<T>;
        selectControlRef: RefObject<View>;
        optionsListRef: RefObject<View>;
        ref: ForwardedRef<SelectRef<T>>;
        state: State<T>;
    }
>;
