import React, { useState } from 'react';
import { Text } from 'react-native';
import { OptionType, Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { DATA } from '../constants';

export const Callbacks = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [selected, setSelected] = useState<OptionType | null>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

    const [removed, setRemoved] = useState<OptionType | OptionType[] | null>(
        null,
    );
    const [removedIndex, setRemovedIndex] = useState<number | number[]>(-1);

    return (
        <SafeAreaViewWrapper>
            <Text style={{ marginBottom: 20 }}>
                isOpened: {isOpened.toString()}
            </Text>
            {selected && (
                <>
                    <Text style={{ marginBottom: 20 }}>
                        Selected item: {JSON.stringify(selected, null, 4)}
                    </Text>
                    <Text style={{ marginBottom: 20 }}>
                        Selected index: {selectedItemIndex}
                    </Text>
                </>
            )}
            {removed && (
                <>
                    <Text style={{ marginBottom: 20 }}>
                        Removed item: {JSON.stringify(removed, null, 4)}
                    </Text>
                    <Text style={{ marginBottom: 20 }}>
                        Removed index: {removedIndex}
                    </Text>
                </>
            )}
            <Select
                options={DATA}
                selectControlStyle={{ width: 250 }}
                onDropdownClosed={() => {
                    setIsOpened(false);
                }}
                onDropdownOpened={() => {
                    setIsOpened(true);
                }}
                onSelect={(option, optionIndex) => {
                    setSelected(option);
                    setSelectedItemIndex(optionIndex);
                }}
                onRemove={(option, optionIndex) => {
                    setRemoved(option);
                    setRemovedIndex(optionIndex);
                }}
            />
        </SafeAreaViewWrapper>
    );
};
