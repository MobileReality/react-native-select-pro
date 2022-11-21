import type { ReactNode } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { SelectControlStyles } from '../../types/styles';

export type FromSelectControlComponent = {
    accessibilityHint: string | undefined;
    accessibilityLabel: string;
    children: ReactNode;
    onPress: () => void;
} & OptionalToRequired<Pick<SelectControlStyles, 'containerStyle' | 'disabledStyle'>>;

export type SelectControlWrapperProps = FromSelectControlComponent;
