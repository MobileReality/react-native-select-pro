import React from 'react';
import { SafeAreaView } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const Overflow = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Select options={DATA} selectControlStyle={{ width: 300 }} />
        </SafeAreaView>
    );
};
