import type { ComponentProps } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { State } from '../../state/types';
import type { OnPressSelectControlType } from '../../types';
import type { Select } from '../select';

export type ArrowProps = OptionalToRequired<
    { onPressSelectControl: OnPressSelectControlType } & Pick<State, 'isOpened'> &
        Pick<
            ComponentProps<typeof Select>,
            | 'animation'
            | 'multiSelection'
            | 'disabled'
            | 'selectControlArrowImageStyle'
            | 'customSelectControlArrowIconSource'
        >
>;
