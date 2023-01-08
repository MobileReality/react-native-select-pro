import type { OnPressRemove, OptionalToRequired } from '../../types';

export type ClearOptionProps<T> = OptionalToRequired<{
    onPressRemove: OnPressRemove<T>;
}>;
