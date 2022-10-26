import type { ComponentPropsWithRef, ReactNode } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { SelectControlStyles } from '../../types/styles';
import type { SelectControl } from '../select-control';

export type FromSelectControlComponent = Pick<
    ComponentPropsWithRef<typeof SelectControl>,
    'multiSelection' | 'selectedOption' | 'aboveSelectControl' | 'isOpened' | 'disabled'
> & {
    accessibilityHint: string | undefined;
    accessibilityLabel: string;
    children: ReactNode;
    onPress: () => void;
} & OptionalToRequired<Pick<SelectControlStyles, 'containerStyle' | 'disabledStyle'>>;

export type SelectControlWrapperProps = FromSelectControlComponent;
