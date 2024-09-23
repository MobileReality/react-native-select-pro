import type { OptionType } from '../../types';

export type MultiSelectProps<T> = {
    selectedOptions: OptionType<T>[] | null;
    separatedMultiple?: boolean;
    widthThreshold?: number;
    widthOffset?: number;
};

export type UseMultiSelectProps<T> = {
    selectedOptions: OptionType<T>[] | null;
    widthThreshold?: number;
    widthOffset?: number;
};
