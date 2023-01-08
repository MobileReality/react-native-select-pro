import React, { memo, useRef } from 'react';
import isEqual from 'react-fast-compare';
import type { SectionListData } from 'react-native';
import { SectionList } from 'react-native';

import { ERRORS, isSectionSelected, logError } from '../../helpers';
import { getSectionLocation } from '../../helpers/get-section-location';
import type { OptionType, SectionOptionType } from '../../types';
import { NoOptions } from '../no-options';
import { SectionHeader } from '../section-header';

import type { SectionOptionsListProps } from './section-options-list.types';

export const SectionOptionsList = memo(
    <T,>({
        resolvedData,
        getItemLayout,
        renderItem,
        accessibilityState,
        selectedOption,
        scrollToSelectedOption,
        sectionListProps,
        disabled,
    }: SectionOptionsListProps<T>) => {
        const sectionOptionsListRef = useRef<SectionList>(null);

        const renderSectionHeader = <T,>(info: { section: SectionListData<T> }) => {
            const isSelected = isSectionSelected({
                title: info.section.title,
                selectedOptions: selectedOption as OptionType<T>[],
                sectionData: resolvedData as unknown as SectionOptionType<T>[],
            });

            return <SectionHeader title={info.section.title} isSelected={isSelected} />;
        };

        const scrollToIndex = () => {
            if (sectionOptionsListRef.current) {
                try {
                    sectionOptionsListRef.current.scrollToLocation({
                        ...getSectionLocation({
                            data: resolvedData,
                            selectedOption,
                            scrollToSelectedOption,
                        }),
                        animated: false,
                    });
                } catch {
                    logError(ERRORS.SCROLL_TO_LOCATION);
                }
            }
        };

        return (
            <SectionList
                testID="Options list"
                accessibilityLabel="Options list"
                accessibilityState={accessibilityState}
                bounces={false}
                keyboardShouldPersistTaps="handled"
                persistentScrollbar={true}
                ListEmptyComponent={<NoOptions />}
                scrollEnabled={!disabled}
                {...sectionListProps}
                ref={sectionOptionsListRef}
                renderSectionHeader={renderSectionHeader}
                sections={resolvedData}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={({ value }) => value}
                onLayout={scrollToIndex}
            />
        );
    },
    isEqual,
);

SectionOptionsList.displayName = 'SectionOptionsList';
