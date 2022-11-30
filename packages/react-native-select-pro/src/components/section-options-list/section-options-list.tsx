import React, { useCallback } from 'react';
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
    const {
        NoOptionsComponent,
        isOpened,
        scrollToSelectedOption,
        onPressOption,
        onPressSection,
        selectedOption,
        sectionListProps,
        styles,
    } = useOptionsListContext();

    const renderSectionHeader = <T,>(info: { section: SectionListData<T> }) => {
        const isSelected = isSectionSelected({
            title: info.section.title,
            selectedOptions: selectedOption,
            sectionData: resolvedData,
        });

        return (
            <SectionHeader
                title={info.section.title}
                sectionHeader={styles?.sectionHeader}
                isSelected={isSelected}
                onPressSection={onPressSection}
            />
        );
    };

    const sectionList = useCallback(
        (node: SectionList | null) => {
            if (node !== null) {
                try {
                    node.scrollToLocation({
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
        },
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onPressOption, scrollToSelectedOption, selectedOption, resolvedData],
    );

    return (
        <SectionList
            ref={sectionList}
            testID="Options list"
            accessibilityLabel="Options list"
            accessibilityState={{
                expanded: isOpened,
            }}
            bounces={false}
            sections={resolvedData}
            getItemLayout={getItemLayout}
            keyExtractor={({ value }) => value}
            keyboardShouldPersistTaps="handled"
            persistentScrollbar={true}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            {...sectionListProps}
            ListEmptyComponent={NoOptionsComponent ?? <NoOptions />}
        />
    );
};
