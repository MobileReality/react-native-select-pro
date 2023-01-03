import React, { useRef } from 'react';
import type { SectionListData } from 'react-native';
import { SectionList } from 'react-native';

import { useOptionsListContext } from '../../context';
import { ERRORS, isSectionSelected, logError } from '../../helpers';
import { getSectionLocation } from '../../helpers/get-section-location';
import { NoOptions } from '../no-options';
import { SectionHeader } from '../section-header';

import type { SectionOptionsListProps } from './section-options-list.types';

export const SectionOptionsList = ({
    resolvedData,
    getItemLayout,
    renderItem,
}: SectionOptionsListProps) => {
    const sectionOptionsListRef = useRef<SectionList>(null);

    const { isOpened, scrollToSelectedOption, selectedOption, sectionListProps } =
        useOptionsListContext();

    const renderSectionHeader = <T,>(info: { section: SectionListData<T> }) => {
        if (Array.isArray(selectedOption)) {
            const isSelected = isSectionSelected({
                title: info.section.title,
                selectedOptions: selectedOption,
                sectionData: resolvedData,
            });

            return <SectionHeader title={info.section.title} isSelected={isSelected} />;
        }

        return null;
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

    const accessibilityState = {
        expanded: isOpened,
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
};
