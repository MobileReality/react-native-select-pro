import type { OptionalToRequired } from '../../helpers';
import type { OnPressRemove } from '../../types/shared';

export type ClearOptionProps = OptionalToRequired<{
    onPressRemove: OnPressRemove;
}>;
