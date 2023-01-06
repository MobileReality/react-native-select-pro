import React, { forwardRef, useCallback } from 'react';
import type { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { BORDER_WIDTH, COLORS, OPTIONS_LIST_HEIGHT, SHAPE } from '../../constants';
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
        aboveSelectControl,
        sectionListProps,
        flatListProps,
        width,
        top,
        left,
        selectedOption,
        optionsListStyles,
        isSectionedOptions,
        initialScrollIndex,
        accessibilityState,
        disabled,
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

            return (
                <Option
                    key={value}
                    ref={index === 0 ? measuredRef : undefined}
                    option={{ ...item, section: sectionObject }}
                    isSelected={isSelected}
                    optionIndex={optionIndex}
                    disabled={disabled}
                />
            );
        },
        [
            disabled,
            findSelectedOption,
            findSelectedOptionIndex,
            isSectionedOptions,
            measuredRef,
            resolvedData,
        ],
    );

    return (
        <OptionsListWrapper
            ref={optionsListRef}
            wrapperStyles={[
                styles.optionsList,
                optionsListStyles,
                { top, left, width },
                aboveSelectControl ? styles.overflown : styles.notOverflown,
            ]}
        >
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

type Styles = {
    optionsList: ViewStyle;
    notOverflown: ViewStyle;
    overflown: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    optionsList: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: COLORS.WHITE,
        borderWidth: BORDER_WIDTH,
        maxHeight: OPTIONS_LIST_HEIGHT,
        elevation: 5,
    },
    notOverflown: {
        borderTopWidth: 0,
        borderBottomRightRadius: SHAPE,
        borderBottomLeftRadius: SHAPE,
    },
    overflown: {
        borderBottomWidth: 0,
        borderTopRightRadius: SHAPE,
        borderTopLeftRadius: SHAPE,
    },
});

OptionsList.displayName = 'OptionsList';
