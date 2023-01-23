import React, { useState } from 'react';
import { Text } from 'react-native';
import type { OptionType } from '@mobile-reality/react-native-select-pro';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const Callbacks = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [selected, setSelected] = useState<OptionType | null>(null);

    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

    const [removed, setRemoved] = useState<OptionType | OptionType[] | null>(null);
    const [removedIndex, setRemovedIndex] = useState<number | number[]>(-1);

    return (
        <SafeAreaViewWrapper>
            <Text style={{ marginBottom: 20 }}>isOpened: {isOpened.toString()}</Text>
            {selected && (
                <>
                    <Text style={{ marginBottom: 20 }}>
                        Selected item: {JSON.stringify(selected, null, 4)}
                    </Text>
                    <Text style={{ marginBottom: 20 }}>Selected index: {selectedItemIndex}</Text>
                </>
            )}
            {removed && (
                <>
                    <Text style={{ marginBottom: 20 }}>
                        Removed item: {JSON.stringify(removed, null, 4)}
                    </Text>
                    <Text style={{ marginBottom: 20 }}>Removed index: {removedIndex}</Text>
                </>
            )}
            <Select
                options={DATA}
                styles={{ select: { container: { width: 250 } } }}
                onSelectClosed={() => {
                    setIsOpened(false);
                }}
                onSelectOpened={() => {
                    setIsOpened(true);
                }}
                onSelect={(option, optionIndex) => {
                    setSelected(option);
                    setSelectedItemIndex(optionIndex);
                }}
                onRemove={(option, optionIndex) => {
                    setRemoved(option);
                    setRemovedIndex(optionIndex);
                    setSelected(null);
                    setSelectedItemIndex(-1);
                }}
            />
        </SafeAreaViewWrapper>
    );
};
