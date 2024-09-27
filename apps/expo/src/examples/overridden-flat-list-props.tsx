import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const OverriddenFlatListProps = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    };

    const handleEndReached = () => {
        setIsAtEnd(true);
    };

    const handleScroll = () => {
        setIsScrolling(true);
        setTimeout(() => {
            setIsScrolling(false);
        }, 500);
    };

    return (
        <SafeAreaViewWrapper style={styles.container}>
            <Select
                options={DATA}
                flatListProps={{
                    horizontal: false,
                    initialNumToRender: 10,
                    maxToRenderPerBatch: 5,
                    windowSize: 21,
                    refreshing: isRefreshing,
                    onRefresh: handleRefresh,
                    ListEmptyComponent: () => <Text>No options available</Text>,
                    ItemSeparatorComponent: () => <View style={styles.separator} />,
                    ListFooterComponent: () => (
                        <View style={styles.footer}>
                            <Text>End of the list</Text>
                        </View>
                    ),
                    ListHeaderComponent: () => (
                        <View style={styles.header}>
                            <Text>Start of the list</Text>
                        </View>
                    ),
                    onEndReached: handleEndReached,
                    onEndReachedThreshold: 0.5,
                    onScroll: handleScroll,
                    ListFooterComponentStyle: styles.footerBackground,
                    scrollEnabled: true,
                    bounces: true,
                    persistentScrollbar: true,
                    keyboardShouldPersistTaps: 'handled',
                }}
            />
            <View>
                {isScrolling && (
                    <View style={styles.scrollIndicator}>
                        <Text>The list is being scrolled...</Text>
                    </View>
                )}

                {isAtEnd && (
                    <View style={styles.endIndicator}>
                        <Text>The end of the list has been reached</Text>
                    </View>
                )}
            </View>
        </SafeAreaViewWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingTop: 100,
    },
    scrollIndicator: {
        padding: 10,
        backgroundColor: 'lightyellow',
    },
    endIndicator: {
        padding: 10,
        backgroundColor: 'lightgreen',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
    footer: {
        padding: 20,
    },
    header: {
        padding: 20,
    },
    footerBackground: {
        backgroundColor: 'lightgray',
    },
});
