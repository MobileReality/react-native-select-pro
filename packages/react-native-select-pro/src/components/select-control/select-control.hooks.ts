import { useMemo } from 'react';
import type { OptionType } from '@mobile-reality/react-native-select-pro';

import {
    getReducedSectionData,
    isAndroid,
    isSectionOptionsType,
    selectedOptionResolver,
} from '../../helpers';
import { useAccessibilityScreenReader } from '../../hooks';
import { Action } from '../../state/types';

import type { UseSelectControl } from './select-control.types';

export const useSelectControl = ({
    dispatch,
    searchValue,
    multiSelection,
    isOpened,
    selectControlOpenDropdownA11yLabel,
    clearable,
    selectedOption,
    disabled,
    optionsData,
    selectedOptionIndex,
    onRemove,
    onPressSelectControl,
}: UseSelectControl) => {
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
        if (!multiSelection) {
            return `Current selected item is ${selectedOptionLabel}`;
        }
        return 'You have selected multiple items';
    }, [selectedOptionLabel, multiSelection]);

    const accessibilityLabel = useMemo(
        () => (isOpened ? '' : selectControlOpenDropdownA11yLabel ?? 'Open a dropdown'),
        [isOpened, selectControlOpenDropdownA11yLabel],
    );

    const clearOptionStatus = useMemo(() => {
        const result = { showClearOption: false, showClearOptionA11y: false };

        if (!multiSelection && clearable && selectedOption) {
            if (!isScreenReaderEnabled) {
                result.showClearOption = true;
            } else if (!isAndroid) {
                result.showClearOptionA11y = true;
            }
        }
        return result;
    }, [clearable, isScreenReaderEnabled, multiSelection, selectedOption]);

    const removeOptionInMultiSelection = (option: OptionType, selectedOptions: OptionType[]) => {
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

    const onPressRemove = (option: OptionType | null = null) => {
        if (disabled) {
            return;
        }
        let removedOption = null;
        if (option && multiSelection && selectedOptions) {
            removedOption = removeOptionInMultiSelection(option, selectedOptions);
        } else {
            removeSingleOption();
            removedOption = {
                option: selectedOption,
                index: selectedOptionIndex,
            };
        }

        if (onRemove) {
            onRemove(removedOption.option, removedOption.index);
        }
    };

    const onPress = () => {
        if (disabled || (multiSelection && selectedOption)) {
            return;
        }
        onPressSelectControl();
    };

    return {
        accessibilityHint,
        accessibilityLabel,
        clearOptionStatus,
        onPressRemove,
        onPress,
    };
};
