import { useMemo } from 'react';

import { useSelectContext } from '../../context';
import {
    getReducedSectionData,
    isAndroid,
    isSectionOptionsType,
    selectedOptionResolver,
} from '../../helpers';
import { useAccessibilityScreenReader } from '../../hooks';
import { Action } from '../../state';
import type { OptionType } from '../../types';
import type { OnPressRemove } from '../../types/shared';

export const useSelectControl = () => {
    const {
        isOpened,
        clearable,
        disabled,
        multiple,
        optionsData,
        searchValue,
        onRemove,
        dispatch,
        selectedOption,
        selectedOptionIndex,
        selectContainerProps,
    } = useSelectContext();
    const { selectedOptions, selectedOptionLabel } = selectedOptionResolver(selectedOption);

    const isScreenReaderEnabled = useAccessibilityScreenReader();

    const removeSingleOption = () => {
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
    };

    const accessibilityHint = useMemo(() => {
        if (!selectedOptionLabel) {
            return;
        }
        if (!multiple) {
            return `Current selected item is ${selectedOptionLabel}`;
        }
        return 'You have selected multiple items';
    }, [selectedOptionLabel, multiple]);

    const accessibilityLabel = useMemo(
        () => (isOpened ? '' : selectContainerProps?.accessibilityLabel ?? 'Open a dropdown'),
        [isOpened, selectContainerProps?.accessibilityLabel],
    );

    const clearOptionStatus = useMemo(() => {
        const result = { showClearOption: false, showClearOptionA11y: false };

        if (!multiple && clearable && selectedOption) {
            if (!isScreenReaderEnabled) {
                result.showClearOption = true;
            } else if (!isAndroid) {
                result.showClearOptionA11y = true;
            }
        }
        return result;
    }, [clearable, isScreenReaderEnabled, multiple, selectedOption]);

    const removeOptionInMultipleSelect = (option: OptionType, selectedOptions: OptionType[]) => {
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
                selectedOption: removedSelectedOptions.length > 0 ? removedSelectedOptions : null,
                selectedOptionIndex: resolveSelectedOptionsIndexes,
            },
        });

        return { index: foundIndex, option };
    };

    const onPressRemove: OnPressRemove = (option = null) => {
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
    };

    return {
        accessibilityHint,
        accessibilityLabel,
        clearOptionStatus,
        onPressRemove,
    };
};
