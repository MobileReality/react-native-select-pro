import type { OptionType } from '../types';

export const getDefaultSelectionIndex = <T>(
    flatOptions: OptionType<T>[],
    defaultOption: OptionType<T> | OptionType<T>[],
): number | number[] => {
    if (Array.isArray(defaultOption)) {
        const foundIndices = defaultOption
            .map((option) => flatOptions.findIndex((item) => item.value === option.value))
            .filter((index) => index !== -1);

        if (foundIndices.length > 0) {
            return foundIndices;
        }
    } else {
        const foundIndex = flatOptions.findIndex((item) => item.value === defaultOption.value);

        if (foundIndex !== -1) {
            return foundIndex;
        }
    }

    return Array.isArray(defaultOption) ? [] : -1;
};
