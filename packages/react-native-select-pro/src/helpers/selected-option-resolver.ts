import type { OptionType } from '../types';

type SelectedOptionResolverOutput<T> = {
    selectedOptionValue: string;
    selectedOptionLabel: string;
    selectedOptions: OptionType<T>[] | null;
};

export const selectedOptionResolver = <T>(
    selectedOption: OptionType<T> | OptionType<T>[] | null,
) => {
    const result: SelectedOptionResolverOutput<T> = {
        selectedOptionValue: '',
        selectedOptionLabel: '',
        selectedOptions: null,
    };

    if (selectedOption) {
        if (Array.isArray(selectedOption)) {
            result.selectedOptions = selectedOption;
        } else {
            result.selectedOptionValue = selectedOption.value;
            result.selectedOptionLabel = selectedOption.label;
        }
    }

    return result;
};
