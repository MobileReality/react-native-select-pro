import type { ComponentProps } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { SelectStyles } from '../../types/styles';
import type { SelectControl } from '../select-control';

type FromSelectControlProps = Pick<
    ComponentProps<typeof SelectControl>,
    'selectControlClearOptionA11yLabel' | 'disabled'
>;

export type ClearOptionProps = OptionalToRequired<
    FromSelectControlProps & {
        onPressRemove: () => void;
    } & Pick<SelectStyles, 'clearOptionStyles'>
>;
