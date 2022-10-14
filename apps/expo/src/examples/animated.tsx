import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

export const Animated = () => {
    return (
        <SafeAreaViewWrapper>
            <Text style={{ marginBottom: 10 }}>With default animation duration (200 ms)</Text>
            <Select
                options={DATA}
                selectControlStyle={{ width: 280, marginBottom: 20 }}
                animation
            />
            <Text style={{ marginBottom: 10 }}>With custom animation duration (500 ms)</Text>
            <Select options={DATA} selectControlStyle={{ width: 280 }} animation={500} />
        </SafeAreaViewWrapper>
    );
};
