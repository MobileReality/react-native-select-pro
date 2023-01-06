import type { OptionType } from '../types';

type SelectedOptionResolverOutput<T> = {
    selectedOptionValue: string;
    selectedOptionLabel: string;
    selectedOptions: OptionType<T>[] | null;
};

export const selectedOptionResolver = <T>(
    selectedOption: OptionType<T> | OptionType<T>[] | null,
): SelectedOptionResolverOutput<T> => {
    if (!selectedOption) {
        return {
            selectedOptionValue: '',
            selectedOptionLabel: '',
            selectedOptions: null,
        };
    }

    if (Array.isArray(selectedOption)) {
        return {
            selectedOptionValue: '',
            selectedOptionLabel: '',
            selectedOptions: selectedOption,
        };
    }

    return {
        selectedOptionValue: selectedOption.value,
        selectedOptionLabel: selectedOption.label,
        selectedOptions: null,
    };
};
