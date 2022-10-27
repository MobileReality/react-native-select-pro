import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { NoOptions } from '../no-options';

import type { FlatOptionsListProps } from './flat-options-list.types';

export const FlatOptionsList = ({
    flatListProps,
    isOpened,
    noOptionsText,
    scrollToSelectedOption,
    NoOptionsComponent,
    selectedOptionIndex,
    onPressOption,
    resolveData,
    getItemLayout,
    renderItem,
}: FlatOptionsListProps) => {
    const flatList = useCallback(
        (node: FlatList | null) => {
            if (node !== null) {
                const isScrollToSelectedOption =
                    scrollToSelectedOption &&
                    selectedOptionIndex >= 0 &&
                    typeof selectedOptionIndex === 'number';

                if (isScrollToSelectedOption) {
                    try {
                        node.scrollToIndex({
                            index: selectedOptionIndex,
                            animated: false,
                        });
                        // eslint-disable-next-line no-empty
                    } catch {}
                }
            }
        },
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [scrollToSelectedOption, selectedOptionIndex, onPressOption],
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
            data={resolveData()}
            getItemLayout={getItemLayout}
            keyExtractor={({ value }) => value}
            keyboardShouldPersistTaps="handled"
            persistentScrollbar={true}
            renderItem={renderItem}
            {...flatListProps}
            ListEmptyComponent={NoOptionsComponent ?? <NoOptions noOptionsText={noOptionsText} />}
        />
    );
};
