import type { OptionType } from '../types';

type SelectedOptionResolverOutput = {
    selectedOptionValue: string;
    selectedOptionLabel: string;
    selectedOptions: OptionType[] | null;
};

export const selectedOptionResolver = (selectedOption: OptionType | OptionType[] | null) => {
    const result: SelectedOptionResolverOutput = {
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
