import React, { useCallback } from 'react';
import type { SectionListData } from 'react-native';
import { SectionList } from 'react-native';

import { getSectionLocation } from '../../helpers/get-section-location';
import { ERRORS, logError } from '../../helpers/log-error';
import { NoOptions } from '../no-options';
import { SectionHeader } from '../section-header/section-header';

import type { SectionOptionsListProps } from './section-options-list.types';

export const SectionOptionsList = ({
    isOpened,
    resolvedData,
    noOptionsText,
    NoOptionsComponent,
    sectionListProps,
    sectionHeaderTextStyle,
    sectionHeaderContainerStyle,
    getItemLayout,
    renderItem,
    onPressOption,
    selectedOption,
    scrollToSelectedOption,
}: SectionOptionsListProps) => {
    const renderSectionHeader = <T,>(info: { section: SectionListData<T> }) => (
        <SectionHeader
            title={info.section.title}
            {...{ sectionHeaderContainerStyle, sectionHeaderTextStyle }}
        />
    );

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
            ListEmptyComponent={NoOptionsComponent ?? <NoOptions noOptionsText={noOptionsText} />}
        />
    );
};
