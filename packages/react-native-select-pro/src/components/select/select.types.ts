import type { ForwardedRef, RefObject } from 'react';
import type { View } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { DispatchType, State } from '../../state';
import type { SelectProps, SelectRef } from '../../types';

type FromSelectComponent<T> = Pick<
    SelectProps<T>,
    | 'defaultOption'
    | 'disabled'
    | 'searchable'
    | 'multiSelection'
    | 'closeDropdownOnSelect'
    | 'onDropdownOpened'
    | 'onDropdownClosed'
    | 'onRemove'
>;

export type UseSelect<T> = OptionalToRequired<
    FromSelectComponent<T> & {
        dispatch: DispatchType<T>;
        containerRef: RefObject<View>;
        optionsListRef: RefObject<View>;
        ref: ForwardedRef<SelectRef<T>>;
        state: State<T>;
    }
>;
