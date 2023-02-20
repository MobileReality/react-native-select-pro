import { useCallback, useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { useSelectContext } from '../../context';
import { dimensionPercentageToDP, getReducedSectionData } from '../../helpers';
import type { OnPressRemove, OptionType } from '../../types';
import { isOptionIndexType, isOptionType, isSectionOptionsType } from '../../types';

import type { UseMultiSelectProps } from './multi-select.types';

const WIDTH_THRESHOLD = 100;
const WIDTH_OFFSET = 72;

export const useMultiSelect = <T>({ selectedOptions }: UseMultiSelectProps<T>) => {
    const { width: screenWidth } = useWindowDimensions();

    const {
        dispatch,
        searchValue,
        optionsData,
        selectedOptionIndex,
        disabled,
        selectedOption,
        multiple,
        onRemove,
        styles,
    } = useSelectContext();

    const { select: selectStyles } = styles ?? {};
    const { multiSelectedOption: multiSelectedCustomStyles } = selectStyles ?? {};

    const removeSingleOption = useCallback(() => {
        dispatch({
            type: 'selectOption',
            payload: {
                selectedOption: null,
                selectedOptionIndex: -1,
            },
        });

        const isSearchable = typeof searchValue === 'string';
        if (isSearchable) {
            dispatch({
                type: 'setSearchValue',
                payload: '',
            });
        }
    }, [dispatch, searchValue]);

    const removeOptionInMultipleSelect = useCallback(
        (option: OptionType<T>, selectedOptions: OptionType<T>[]) => {
            const removedSelectedOptions = selectedOptions.filter(
                (selected) => selected.value !== option.value,
            );

            const isSectionedOptions = isSectionOptionsType(optionsData);
            const resolvedOptionsData = isSectionedOptions
                ? getReducedSectionData(optionsData)
                : optionsData;
            const foundIndex = resolvedOptionsData.findIndex(
                (item) => 'value' in item && item.value === option?.value,
            );

            let resolveSelectedOptionsIndexes: number | number[] = -1;
            if (Array.isArray(selectedOptionIndex)) {
                const filteredIndexes = selectedOptionIndex.filter((item) => item !== foundIndex);
                resolveSelectedOptionsIndexes =
                    filteredIndexes.length > 0 ? filteredIndexes : resolveSelectedOptionsIndexes;
            }

            dispatch({
                type: 'selectOption',
                payload: {
                    selectedOption:
                        removedSelectedOptions.length > 0 ? removedSelectedOptions : null,
                    selectedOptionIndex: resolveSelectedOptionsIndexes,
                },
            });

            return { index: foundIndex, option };
        },
        [dispatch, optionsData, selectedOptionIndex],
    );

    const onPressRemove: OnPressRemove<T> = useCallback(
        (option = null) => {
            if (disabled) {
                return;
            }
            let removedOption;
            if (option && multiple && selectedOptions) {
                removedOption = removeOptionInMultipleSelect(option, selectedOptions);
            } else {
                removeSingleOption();
                removedOption = {
                    option: selectedOption,
                    index: selectedOptionIndex,
                };
            }

            if (
                onRemove &&
                removedOption.option &&
                isOptionType(removedOption.option) &&
                isOptionIndexType(removedOption.index)
            ) {
                // callback
                onRemove(removedOption.option, removedOption.index);
            }
        },
        [
            disabled,
            multiple,
            onRemove,
            removeOptionInMultipleSelect,
            removeSingleOption,
            selectedOption,
            selectedOptionIndex,
            selectedOptions,
        ],
    );

    const containerWidth = StyleSheet.flatten(selectStyles?.container)?.width;

    const calculatedOptionWidth = useMemo(() => {
        if (!selectedOptions) {
            return 0;
        }
        const { length } = selectedOptions;
        const initialWidth = containerWidth ?? 100;
        if (typeof initialWidth === 'number') {
            const calculatedWidth = (initialWidth - WIDTH_OFFSET) / length;
            return calculatedWidth < WIDTH_THRESHOLD
                ? WIDTH_THRESHOLD
                : Math.floor(calculatedWidth);
        }
        if (typeof initialWidth === 'string') {
            const ratioToScreen = dimensionPercentageToDP(initialWidth, screenWidth);
            const calculatedWidth = ratioToScreen / length;
            return calculatedWidth - WIDTH_OFFSET < WIDTH_THRESHOLD
                ? WIDTH_THRESHOLD
                : calculatedWidth - WIDTH_OFFSET;
        }
        return 0;
    }, [selectedOptions, containerWidth, screenWidth]);

    const isSearchable = typeof searchValue === 'string';

    return {
        calculatedOptionWidth,
        onPressRemove,
        disabled,
        isSearchable,
        multiSelectedCustomStyles,
    };
};
