import { useCallback } from 'react';
import type { View } from 'react-native';
import { AccessibilityInfo, findNodeHandle, StyleSheet } from 'react-native';

import { ITEM_HEIGHT } from '../../constants';
import { useOptionsListContext } from '../../context';
import { isSectionOptionsType, selectedOptionResolver } from '../../helpers';
import type { OptionType } from '../../types';
import type { ItemLayout } from '../../types/shared';

export const useOptionsList = () => {
    const {
        optionsData,
        searchValue,
        searchedOptions,
        styles,
        aboveSelectControl,
        openedPosition: { width, top, left },
        isOpened,
        selectedOptionIndex,
        scrollToSelectedOption,
        flatListProps,
        selectedOption,
        sectionListProps,
        disabled,
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
        (item: OptionType) => {
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
        (item: OptionType) => {
            return optionsData.findIndex((option) => option.value === item.value);
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

    return {
        getItemLayout,
        measuredRef,
        resolvedData,
        findSelectedOption,
        findSelectedOptionIndex,
        aboveSelectControl,
        width,
        top,
        left,
        scrollToSelectedOption,
        flatListProps,
        sectionListProps,
        selectedOption,
        optionsListStyles: styles?.optionsList,
        isSectionedOptions,
        initialScrollIndex,
        accessibilityState,
        disabled,
    };
};
