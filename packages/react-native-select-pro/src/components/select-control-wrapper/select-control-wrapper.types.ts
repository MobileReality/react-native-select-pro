import type { ReactNode } from 'react';

import type { SelectControlStyles } from '../../types/styles';

export type FromSelectControlComponent = {
    accessibilityHint: string | undefined;
    accessibilityLabel: string;
    children: ReactNode;
    selectStyles: SelectControlStyles | undefined;
};

export type SelectControlWrapperProps = FromSelectControlComponent;
