import type { ComponentPropsWithRef } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { Select } from '../../index';
import type { OptionType } from '../../index';
import type { DispatchType, State } from '../../state/types';
import type { OnPressSelectControlType, OnSetPosition } from '../../types';
import type { SelectControlStyles } from '../../types/styles';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'disabled'
    | 'searchable'
    | 'searchPattern'
    | 'textInputProps'
    | 'placeholderText'
    | 'placeholderTextColor'
    | 'multiSelection'
>;

export type SelectFieldTypeProps = OptionalToRequired<
    FromSelectComponentProps &
        Pick<State, 'isOpened' | 'selectedOption' | 'searchValue'> &
        Pick<SelectControlStyles, 'containerStyle' | 'textStyle' | 'multiSelectionOptionStyle'> & {
            onPressSelectControl: OnPressSelectControlType;
            onPressRemove: (option?: OptionType | null) => void;
            dispatch: DispatchType;
            setPosition: OnSetPosition;
        }
>;
