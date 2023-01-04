import { useCallback } from 'react';
import type { View } from 'react-native';
import { AccessibilityInfo, findNodeHandle, StyleSheet } from 'react-native';

import { ITEM_HEIGHT } from '../../constants';
import { useOptionsListContext } from '../../context';
import { selectedOptionResolver } from '../../helpers';
import type { OptionType } from '../../types';
import type { ItemLayout } from '../../types/shared';

import type { UseOptionsListProps } from './options-list.types';

export const useOptionsList = ({ optionStyles }: UseOptionsListProps) => {
    const { optionsData, searchValue, selectedOption, searchedOptions } = useOptionsListContext();

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

    const resolveData = () => {
        if (!searchValue || (searchValue.length > 0 && searchValue === selectedOptionLabel)) {
            return optionsData;
        }
        return searchedOptions;
    };

    const findSelectedOption = (item: OptionType) => {
        if (selectedOptionValue) {
            return item.value === selectedOptionValue;
        }
        if (selectedOptions) {
            return selectedOptions.some((option) => item.value === option.value);
        }
        return false;
    };

    const getItemLayout = <T>(_data: T, index: number): ItemLayout<T> => {
        const height = StyleSheet.flatten(optionStyles)?.height;
        const isNumber = typeof height === 'number';
        return {
            length: isNumber ? height : ITEM_HEIGHT,
            offset: isNumber ? height * index : ITEM_HEIGHT * index,
            index,
        };
    };

    return { getItemLayout, measuredRef, resolveData, findSelectedOption };
};
