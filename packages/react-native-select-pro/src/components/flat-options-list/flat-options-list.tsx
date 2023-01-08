import React, { memo } from 'react';
import { FlatList } from 'react-native';
import isEqual from 'lodash.isequal';

import { NoOptions } from '../no-options';

import type { FlatOptionsListProps } from './flat-options-list.types';

export const FlatOptionsList = memo(
    <T,>({
        renderItem,
        getItemLayout,
        resolvedData,
        flatListProps,
        initialScrollIndex,
        accessibilityState,
        disabled,
    }: FlatOptionsListProps<T>) => {
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
                scrollEnabled={!disabled}
                {...flatListProps}
                data={resolvedData}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={({ value }) => value}
            />
        );
    },
    (prevProps, newProps) => isEqual(prevProps, newProps),
);

FlatOptionsList.displayName = 'FlatOptionsList';
