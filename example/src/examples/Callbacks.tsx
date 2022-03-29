import React, { useState } from 'react';
import { Text } from 'react-native';
import { OptionType, Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const Callbacks = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [selected, setSelected] = useState<OptionType | null>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

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
            />
        </SafeAreaViewWrapper>
    );
};
