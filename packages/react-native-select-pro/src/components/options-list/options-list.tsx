import React, { forwardRef, useCallback } from 'react';
import type { View } from 'react-native';

import { getReducedSectionData } from '../../helpers';
import type { OptionType } from '../../types';
import type { RenderItemProps } from '../../types/shared';
import { FlatOptionsList } from '../flat-options-list';
import { Option } from '../option';
import { OptionsListWrapper } from '../options-list-wrapper';
import { SectionOptionsList } from '../section-options-list';

import { useOptionsList } from './options-list.hooks';

export const OptionsList = forwardRef<View>((_, optionsListRef) => {
    const {
        getItemLayout,
        measuredRef,
        findSelectedOption,
        findSelectedOptionIndex,
        resolvedData,
        scrollToSelectedOption,
        sectionListProps,
        flatListProps,
        selectedOption,
        optionCustomStyles,
        isSectionedOptions,
        initialScrollIndex,
        accessibilityState,
        disabled,
        onPressOption,
        optionButtonProps,
        optionTextProps,
        pressableSelectedOption,
    } = useOptionsList();

    const renderItem = useCallback(
        <T,>({ item, index, section }: RenderItemProps<T>) => {
            const { value } = item;
            const isSelected = findSelectedOption(item);
            let optionIndex = findSelectedOptionIndex(item) ?? index;
            const sectionTitle = section?.title;
            let sectionObject;
            if (isSectionedOptions) {
                optionIndex = getReducedSectionData(resolvedData).indexOf(item);
                sectionObject = {
                    title: sectionTitle,
                    index: resolvedData.findIndex((el) => el.title === sectionTitle),
                };
            }

            const isDisabled = disabled ?? (pressableSelectedOption ? false : isSelected);

            return (
                <Option
                    key={value}
                    ref={index === 0 ? measuredRef : undefined}
                    option={{ ...item, section: sectionObject }}
                    isSelected={isSelected}
                    optionIndex={optionIndex}
                    disabled={disabled}
                    optionButtonProps={optionButtonProps}
                    optionTextProps={optionTextProps}
                    optionCustomStyles={optionCustomStyles}
                    isDisabled={isDisabled}
                    onPressOption={onPressOption}
                />
            );
        },
        [
            disabled,
            findSelectedOption,
            findSelectedOptionIndex,
            isSectionedOptions,
            measuredRef,
            onPressOption,
            optionButtonProps,
            optionCustomStyles,
            optionTextProps,
            pressableSelectedOption,
            resolvedData,
        ],
    );

    return (
        <OptionsListWrapper ref={optionsListRef}>
            {isSectionedOptions ? (
                <SectionOptionsList
                    resolvedData={resolvedData}
                    getItemLayout={getItemLayout}
                    renderItem={renderItem}
                    accessibilityState={accessibilityState}
                    selectedOption={selectedOption}
                    scrollToSelectedOption={scrollToSelectedOption}
                    sectionListProps={sectionListProps}
                    disabled={disabled}
                />
            ) : (
                <FlatOptionsList
                    initialScrollIndex={initialScrollIndex}
                    getItemLayout={getItemLayout}
                    renderItem={renderItem}
                    accessibilityState={accessibilityState}
                    resolvedData={resolvedData as OptionType[]}
                    flatListProps={flatListProps}
                    disabled={disabled}
                />
            )}
        </OptionsListWrapper>
    );
});

OptionsList.displayName = 'OptionsList';
