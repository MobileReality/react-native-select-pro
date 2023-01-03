import React from 'react';
import { FlatList } from 'react-native';

import { useOptionsListContext } from '../../context';
import { NoOptions } from '../no-options';

import type { FlatOptionsListProps } from './flat-options-list.types';

export const FlatOptionsList = ({
    resolvedData,
    getItemLayout,
    renderItem,
}: FlatOptionsListProps) => {
    const { flatListProps, isOpened, selectedOptionIndex, scrollToSelectedOption } =
        useOptionsListContext();

    const initialScrollIndex =
        typeof selectedOptionIndex === 'number' && scrollToSelectedOption
            ? selectedOptionIndex
            : -1;

    const accessibilityState = {
        expanded: isOpened,
    };

    return (
        <FlatList
            testID="Options list"
            accessibilityLabel="Options list"
            accessibilityState={accessibilityState}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            persistentScrollbar={true}
            ListEmptyComponent={<NoOptions />}
            initialScrollIndex={initialScrollIndex}
            {...flatListProps}
            data={resolvedData}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            keyExtractor={({ value }) => value}
        />
    );
};
