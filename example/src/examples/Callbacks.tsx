import React, { useState } from 'react';
import { Text } from 'react-native';
import { OptionType, Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const Callbacks = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [selected, setSelected] = useState<OptionType | null>(null);

    return (
        <SafeAreaViewWrapper>
            <Text>isOpened: {isOpened.toString()}</Text>
            {selected && <Text>Selected item: {JSON.stringify(selected)}</Text>}
            <Select
                options={DATA}
                selectControlStyle={{ width: 250 }}
                onDropdownClosed={() => {
                    setIsOpened(false);
                }}
                onDropdownOpened={() => {
                    setIsOpened(true);
                }}
                onSelect={(option) => {
                    setSelected(option);
                }}
            />
        </SafeAreaViewWrapper>
    );
};
