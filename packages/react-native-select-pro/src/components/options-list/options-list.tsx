import React, { forwardRef, useCallback } from 'react';
import type { ListRenderItem, SectionListRenderItem, View } from 'react-native';
import type { OptionType } from '@mobile-reality/react-native-select-pro';

import { getReducedSectionData, isSectionOptionsType } from '../../helpers';
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
        initialScrollIndex,
        accessibilityState,
        disabled,
        onPressOption,
        optionButtonProps,
        optionTextProps,
        isDisabledResolveOption,
    } = useOptionsList();

    const isSectionedOptions = isSectionOptionsType(resolvedData);

    const renderSection: SectionListRenderItem<OptionType> = useCallback(
        ({ item, index, section }) => {
            const { value } = item;
            const isSelected = findSelectedOption(item);
            const sectionTitle = section?.title;
            const optionIndex = getReducedSectionData(resolvedData).indexOf(item);
            const sectionObject = {
                title: sectionTitle,
                index: resolvedData.findIndex((el) => el.title === sectionTitle),
            };

            const isDisabledOption = isDisabledResolveOption(isSelected);

            return (
                <Option
                    key={value}
                    ref={index === 0 ? measuredRef : undefined}
                    option={{ ...item, section: sectionObject }}
                    isSelected={isSelected}
                    optionIndex={optionIndex}
                    overrideWithDisabledStyle={!!disabled}
                    optionButtonProps={optionButtonProps}
                    optionTextProps={optionTextProps}
                    optionCustomStyles={optionCustomStyles}
                    isDisabled={isDisabledOption}
                    onPressOption={onPressOption}
                />
            );
        },
        [
            disabled,
            findSelectedOption,
            isDisabledResolveOption,
            measuredRef,
            onPressOption,
            optionButtonProps,
            optionCustomStyles,
            optionTextProps,
            resolvedData,
        ],
    );

    const renderFlatItem: ListRenderItem<OptionType> = useCallback(
        ({ item, index }) => {
            const { value } = item;
            const isSelected = findSelectedOption(item);
            const optionIndex = findSelectedOptionIndex(item) ?? index;
            const isDisabledOption = isDisabledResolveOption(isSelected);

            return (
                <Option
                    key={value}
                    ref={index === 0 ? measuredRef : undefined}
                    option={{ ...item }}
                    isSelected={isSelected}
                    optionIndex={optionIndex}
                    overrideWithDisabledStyle={!!disabled}
                    optionButtonProps={optionButtonProps}
                    optionTextProps={optionTextProps}
                    optionCustomStyles={optionCustomStyles}
                    isDisabled={isDisabledOption}
                    onPressOption={onPressOption}
                />
            );
        },
        [
            disabled,
            findSelectedOption,
            findSelectedOptionIndex,
            isDisabledResolveOption,
            measuredRef,
            onPressOption,
            optionButtonProps,
            optionCustomStyles,
            optionTextProps,
        ],
    );

    return (
        <OptionsListWrapper ref={optionsListRef}>
            {isSectionedOptions ? (
                <SectionOptionsList
                    resolvedData={resolvedData}
                    getItemLayout={getItemLayout}
                    renderItem={renderSection}
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
                    renderItem={renderFlatItem}
                    accessibilityState={accessibilityState}
                    resolvedData={resolvedData}
                    flatListProps={flatListProps}
                    disabled={disabled}
                />
            )}
        </OptionsListWrapper>
    );
});

OptionsList.displayName = 'OptionsList';
