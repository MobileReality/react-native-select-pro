import React from 'react';

import type { OnPressRemove, OptionType, SelectStyles } from '../../types';
import { useMultiSelect } from '../multi-select/multi-select.hooks';
import type { MultiSelectProps } from '../multi-select/multi-select.types';
import { MultiSelectedOption } from '../multi-selected-option';

type Props<T> = {
    selectedOptions: OptionType<T>[] | null | undefined;
    calculatedOptionWidth: number;
    onPressRemove: OnPressRemove<T>;
    multiSelectedCustomStyles: NonNullable<SelectStyles['select']>['multiSelectedOption'];
    disabled?: boolean;
};

const resolveSelectedOptionsList = <T,>({
    selectedOptions,
    calculatedOptionWidth,
    onPressRemove,
    multiSelectedCustomStyles,
    disabled,
}: Props<T>) => {
    if (!selectedOptions) {
        return null;
    }

    return (
        <>
            {selectedOptions.map((option: OptionType<T>) => (
                <MultiSelectedOption
                    key={`${option.section}-${option.value}`}
                    optionWidth={calculatedOptionWidth}
                    option={option}
                    multiSelectedCustomStyles={multiSelectedCustomStyles}
                    disabled={disabled}
                    onPressRemove={onPressRemove as OnPressRemove<unknown>}
                />
            ))}
        </>
    );
};

export const MultiSelectedOptions = <T,>({
    selectedOptions,
    widthThreshold,
    widthOffset,
}: MultiSelectProps<T>) => {
    const { calculatedOptionWidth, onPressRemove, multiSelectedCustomStyles, disabled } =
        useMultiSelect<T>({
            selectedOptions,
            widthThreshold,
            widthOffset,
        });

    return resolveSelectedOptionsList({
        selectedOptions,
        calculatedOptionWidth,
        onPressRemove,
        multiSelectedCustomStyles,
        disabled,
    });
};
