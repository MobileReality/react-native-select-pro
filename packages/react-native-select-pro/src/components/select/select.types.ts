import type { ComponentPropsWithRef, ForwardedRef } from 'react';
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
    | 'optionsListStyles'
    | 'closeDropdownOnSelect'
    | 'onDropdownOpened'
    | 'onDropdownClosed'
    | 'onRemove'
>;

export type UseSelect = OptionalToRequired<
    FromSelectComponent & {
        isMultiSelection: boolean;
        isSearchable: boolean;
        dispatch: DispatchType;
        containerRef: React.RefObject<View>;
        ref: ForwardedRef<SelectRef>;
        state: State;
    }
>;
