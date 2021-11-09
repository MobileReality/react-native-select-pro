import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { OptionType, Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const Callbacks = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [selected, setSelected] = useState<OptionType | null>(null);
    return (
        <SafeAreaView>
            <Text>isOpened: {isOpened.toString()}</Text>
            {selected && <Text>Selected item: {JSON.stringify(selected)}</Text>}
            <Select
                onDropdownClosed={() => {
                    setIsOpened(false);
                }}
                onDropdownOpened={() => {
                    setIsOpened(true);
                }}
                onSelect={(option) => {
                    setSelected(option);
                }}
                options={DATA}
                selectControlStyle={{ width: 250 }}
            />
        </SafeAreaView>
    );
};
