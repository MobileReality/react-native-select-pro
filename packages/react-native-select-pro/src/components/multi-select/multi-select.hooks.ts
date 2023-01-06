import { useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { useWindowDimensions } from 'react-native';

import { useSelectContext } from '../../context';
import {
    dimensionPercentageToDP,
    getReducedSectionData,
    isSectionOptionsType,
} from '../../helpers';
import { Action } from '../../state';
import type { OptionType } from '../../types';
import type { OnPressRemove } from '../../types';

const WIDTH_THRESHOLD = 100;
const WIDTH_OFFSET = 72;

type UseMultiSelectProps = {
    selectedOptions: OptionType[] | null;
};

export const useMultiSelect = ({ selectedOptions }: UseMultiSelectProps) => {
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

    const removeSingleOption = useCallback(() => {
        dispatch({
            type: Action.SelectOption,
            payload: {
                selectedOption: null,
                selectedOptionIndex: -1,
            },
        });

        const isSearchable = typeof searchValue === 'string';
        if (isSearchable) {
            dispatch({
                type: Action.SetSearchValue,
                payload: '',
            });
        }
    }, [dispatch, searchValue]);

    const removeOptionInMultipleSelect = useCallback(
        (option: OptionType, selectedOptions: OptionType[]) => {
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
                type: Action.SelectOption,
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

    const onPressRemove: OnPressRemove = useCallback(
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

            if (onRemove && removedOption.option) {
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

    const { select } = styles ?? {};

    const containerWidth = (select as ViewStyle)?.width;

    const calculatedOptionWidth = useMemo(() => {
        if (!selectedOptions) {
            return 0;
        }

        const { length } = selectedOptions;
        const initialWidth = containerWidth ?? 100;
        let calculatedWidth = 100;
        if (typeof initialWidth === 'number') {
            calculatedWidth = (initialWidth - WIDTH_OFFSET) / length;
            if (calculatedWidth < WIDTH_THRESHOLD) {
                return WIDTH_THRESHOLD;
            }
            return Math.floor(calculatedWidth);
        }
        if (typeof initialWidth === 'string') {
            const ratioToScreen = dimensionPercentageToDP(initialWidth, screenWidth);
            calculatedWidth = ratioToScreen / length;
            if (calculatedWidth - WIDTH_OFFSET < WIDTH_THRESHOLD) {
                return WIDTH_THRESHOLD;
            }
            return calculatedWidth - WIDTH_OFFSET;
        }
        return 0;
    }, [selectedOptions, containerWidth, screenWidth]);

    return {
        calculatedOptionWidth,
        onPressRemove,
    };
};
