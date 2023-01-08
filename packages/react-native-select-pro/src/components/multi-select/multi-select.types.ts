import type { OptionType } from '../../types';

export type MultiSelectProps<T> = {
    selectedOptions: OptionType<T>[] | null;
};

export type UseMultiSelectProps<T> = {
    selectedOptions: OptionType<T>[] | null;
};
