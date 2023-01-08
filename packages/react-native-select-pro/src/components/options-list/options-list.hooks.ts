import { useCallback } from 'react';
import type { View } from 'react-native';
import { AccessibilityInfo, findNodeHandle, StyleSheet } from 'react-native';

import { ITEM_HEIGHT } from '../../constants';
import { useOptionsListContext } from '../../context';
import { selectedOptionResolver } from '../../helpers';
import type { ItemLayout, OptionType } from '../../types';
import { isFlatOptionsType, isSectionOptionsType } from '../../types';

export const useOptionsList = <T>() => {
    const {
        optionsData,
        searchValue,
        searchedOptions,
        styles,
        isOpened,
        selectedOptionIndex,
        scrollToSelectedOption,
        flatListProps,
        selectedOption,
        sectionListProps,
        disabled,
        onPressOption,
        optionButtonProps,
        optionTextProps,
        pressableSelectedOption,
    } = useOptionsListContext();

    const { selectedOptionValue, selectedOptionLabel, selectedOptions } =
        selectedOptionResolver(selectedOption);

    const measuredRef = useCallback((node: View | null) => {
        if (node !== null) {
            const reactTag = findNodeHandle(node);
            if (reactTag) {
                AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
        }
    }, []);

    const resolveData = useCallback(() => {
        if (!searchValue || (searchValue.length > 0 && searchValue === selectedOptionLabel)) {
            return optionsData;
        }
        return searchedOptions;
    }, [optionsData, searchValue, searchedOptions, selectedOptionLabel]);

    const findSelectedOption = useCallback(
        (item: OptionType<T>) => {
            if (selectedOptionValue) {
                return item.value === selectedOptionValue;
            }
            if (selectedOptions) {
                return selectedOptions.some((option) => item.value === option.value);
            }
            return false;
        },
        [selectedOptionValue, selectedOptions],
    );

    const findSelectedOptionIndex = useCallback(
        (item: OptionType<T>) => {
            if (isFlatOptionsType(optionsData)) {
                return optionsData.findIndex((option) => option.value === item.value);
            }

            return -1;
        },
        [optionsData],
    );

    const getItemLayout = useCallback(
        <T>(_data: T, index: number): ItemLayout<T> => {
            const height = StyleSheet.flatten(styles?.option?.container)?.height;
            const isNumber = typeof height === 'number';
            return {
                length: isNumber ? height : ITEM_HEIGHT,
                offset: isNumber ? height * index : ITEM_HEIGHT * index,
                index,
            };
        },
        [styles?.option?.container],
    );

    const resolvedData = resolveData();

    const isSectionedOptions = isSectionOptionsType(resolvedData);

    const initialScrollIndex =
        typeof selectedOptionIndex === 'number' && scrollToSelectedOption
            ? selectedOptionIndex
            : -1;

    const accessibilityState = {
        expanded: isOpened,
    };

    const { option: optionCustomStyles } = styles ?? {};

    const isDisabledResolveOption = useCallback(
        (isSelected: boolean) => {
            let isDisabledOption = false;

            if (disabled) {
                isDisabledOption = disabled;
            } else if (pressableSelectedOption) {
                isDisabledOption = false;
            } else if (isSelected) {
                isDisabledOption = true;
            }

            return isDisabledOption;
        },
        [disabled, pressableSelectedOption],
    );

    return {
        getItemLayout,
        measuredRef,
        resolvedData,
        findSelectedOption,
        findSelectedOptionIndex,
        scrollToSelectedOption,
        flatListProps,
        sectionListProps,
        selectedOption,
        optionCustomStyles,
        isSectionedOptions,
        initialScrollIndex,
        accessibilityState,
        disabled,
        onPressOption,
        optionButtonProps,
        optionTextProps,
        isDisabledResolveOption,
    };
};
