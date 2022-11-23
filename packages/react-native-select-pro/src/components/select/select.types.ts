import type { ForwardedRef, RefObject } from 'react';
import type { View } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { DispatchType, State } from '../../state/types';
import type { SelectProps, SelectRef } from '../../types';

type FromSelectComponent<T> = Pick<
    SelectProps<T>,
    | 'options'
    | 'defaultOption'
    | 'disabled'
    | 'searchable'
    | 'multiSelection'
    | 'closeDropdownOnSelect'
    | 'onDropdownOpened'
    | 'onDropdownClosed'
    | 'onRemove'
    | 'styles'
>;

export type UseSelect<T> = OptionalToRequired<
    FromSelectComponent<T> & {
        dispatch: DispatchType<T>;
        containerRef: RefObject<View>;
        ref: ForwardedRef<SelectRef<T>>;
        state: State<T>;
    }
>;
