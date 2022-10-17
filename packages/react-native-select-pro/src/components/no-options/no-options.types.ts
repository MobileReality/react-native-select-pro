import type { ComponentProps } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { OptionsList } from '../options-list';

type FromParentProps = Pick<ComponentProps<typeof OptionsList>, 'noOptionsText'>;

export type NoOptionsProps = OptionalToRequired<FromParentProps>;
