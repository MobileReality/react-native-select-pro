import type { ComponentProps } from 'react';

import type { Arrow } from '../arrow';

type FromArrowComponentProps = Pick<
    ComponentProps<typeof Arrow>,
    'isOpened' | 'animation' | 'arrowIconStyles'
>;

export type ArrowImageProps = FromArrowComponentProps;
