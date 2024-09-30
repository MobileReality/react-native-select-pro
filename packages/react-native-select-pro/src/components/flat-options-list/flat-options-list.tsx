import React, { memo, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { FlatList } from 'react-native';

import { Loading } from '../../components/loading';
import { ERRORS, logError } from '../../helpers';
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
        loading,
    }: FlatOptionsListProps<T>) => {
        const flatListRef = useRef<FlatList>(null);

        const scrollToIndex = () => {
            if (
                flatListRef.current &&
                initialScrollIndex >= 0 &&
                initialScrollIndex < resolvedData.length
            ) {
                try {
                    flatListRef.current.scrollToIndex({
                        animated: false,
                        index: initialScrollIndex,
                    });
                } catch {
                    logError(ERRORS.SCROLL_TO_LOCATION);
                }
            }
        };

        return (
            <FlatList
                ref={flatListRef}
                testID="Options list"
                accessibilityLabel="Options list"
                accessibilityState={accessibilityState}
                bounces={false}
                keyboardShouldPersistTaps="handled"
                persistentScrollbar={true}
                ListEmptyComponent={loading ? <Loading /> : <NoOptions />}
                scrollEnabled={!disabled}
                {...flatListProps}
                data={resolvedData}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={({ value }) => value}
                onLayout={scrollToIndex}
            />
        );
    },
    isEqual,
);

FlatOptionsList.displayName = 'FlatOptionsList';
