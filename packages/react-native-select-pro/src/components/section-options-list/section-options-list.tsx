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
    const { isOpened, scrollToSelectedOption, onPressOption, selectedOption, sectionListProps } =
        useOptionsListContext();

    const renderSectionHeader = <T,>(info: { section: SectionListData<T> }) => {
        const isSelected = isSectionSelected({
            title: info.section.title,
            selectedOptions: selectedOption,
            sectionData: resolvedData,
        });

        return <SectionHeader title={info.section.title} isSelected={isSelected} />;
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
            testID="Options list"
            accessibilityLabel="Options list"
            accessibilityState={{
                expanded: isOpened,
            }}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            persistentScrollbar={true}
            ListEmptyComponent={<NoOptions />}
            {...sectionListProps}
            ref={sectionList}
            renderSectionHeader={renderSectionHeader}
            sections={resolvedData}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            keyExtractor={({ value }) => value}
        />
    );
};
