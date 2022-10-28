import React, { useCallback } from 'react';
import type { SectionListData } from 'react-native';
import { SectionList } from 'react-native';

import { getSectionLocation } from '../../helpers/get-section-location';
import { NoOptions } from '../no-options';
import { SectionHeader } from '../section-header/section-header';

import type { SectionOptionsListProps } from './section-options-list.types';

export const SectionOptionsList = ({
    isOpened,
    optionsData,
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
                            data: optionsData,
                            selectedOption,
                            scrollToSelectedOption,
                        }),
                        animated: false,
                    });
                    // eslint-disable-next-line no-empty
                } catch {}
            }
        },
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onPressOption, scrollToSelectedOption, selectedOption, optionsData],
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
            sections={optionsData} // search and multiselect are disabled
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
