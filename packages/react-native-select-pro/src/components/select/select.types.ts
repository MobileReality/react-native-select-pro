import type { ComponentPropsWithRef, ForwardedRef, RefObject } from 'react';
import type { View } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { Select } from '../../index';
import type { DispatchType, State } from '../../state/types';
import type { SelectRef } from '../../types';

type FromSelectComponent = Pick<
    ComponentPropsWithRef<typeof Select>,
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

export type UseSelect = OptionalToRequired<
    FromSelectComponent & {
        dispatch: DispatchType;
        containerRef: RefObject<View>;
        ref: ForwardedRef<SelectRef>;
        state: State;
    }
>;
