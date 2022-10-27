import React from 'react';
import type { SectionListData } from 'react-native';
import { SectionList } from 'react-native';

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
}: SectionOptionsListProps) => {
    const renderSectionHeader = <T,>(info: { section: SectionListData<T> }) => (
        <SectionHeader
            title={info.section.title}
            {...{ sectionHeaderContainerStyle, sectionHeaderTextStyle }}
        />
    );

    return (
        <SectionList
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
