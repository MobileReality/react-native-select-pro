import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { useOptionsListContext } from '../../context';
import { ERRORS, logError } from '../../helpers';
import { NoOptions } from '../no-options';

import type { FlatOptionsListProps } from './flat-options-list.types';

export const FlatOptionsList = ({
    resolvedData,
    getItemLayout,
    renderItem,
}: FlatOptionsListProps) => {
    const {
        NoOptionsComponent,
        flatListProps,
        isOpened,
        scrollToSelectedOption,
        onPressOption,
        selectedOptionIndex,
    } = useOptionsListContext();

    const flatList = useCallback(
        (node: FlatList | null) => {
            if (node !== null) {
                const index =
                    scrollToSelectedOption &&
                    selectedOptionIndex >= 0 &&
                    typeof selectedOptionIndex === 'number'
                        ? selectedOptionIndex
                        : 0;
                if (index < resolvedData.length) {
                    try {
                        node.scrollToIndex({
                            index,
                            animated: false,
                        });
                    } catch {
                        logError(ERRORS.SCROLL_TO_INDEX);
                    }
                }
            }
        },
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [scrollToSelectedOption, selectedOptionIndex, onPressOption, resolvedData],
    );

    return (
        <FlatList
            ref={flatList}
            testID="Options list"
            accessibilityLabel="Options list"
            accessibilityState={{
                expanded: isOpened,
            }}
            bounces={false}
            data={resolvedData}
            getItemLayout={getItemLayout}
            keyExtractor={({ value }) => value}
            keyboardShouldPersistTaps="handled"
            persistentScrollbar={true}
            renderItem={renderItem}
            {...flatListProps}
            ListEmptyComponent={NoOptionsComponent ?? <NoOptions />}
        />
    );
};