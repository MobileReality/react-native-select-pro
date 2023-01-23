import React, { useState } from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const TextInputProps = () => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <SafeAreaViewWrapper>
            <Text style={{ marginBottom: 20 }}>isFocused: {isFocused.toString()}</Text>
            <Select
                options={DATA}
                searchable={true}
                selectInputProps={{
                    onFocus: () => {
                        setIsFocused(true);
                    },
                    onBlur: () => {
                        setIsFocused(false);
                    },
                }}
            />
        </SafeAreaViewWrapper>
    );
};
