import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const Animated = () => {
    return (
        <SafeAreaViewWrapper>
            <Text style={{ marginBottom: 10 }}>With default animation duration (200 ms)</Text>
            <Select animated options={DATA} selectControlStyle={{ width: 280, marginBottom: 20 }} />
            <Text style={{ marginBottom: 10 }}>With custom animation duration (500 ms)</Text>
            <Select
                animated
                animationDuration={500}
                options={DATA}
                selectControlStyle={{ width: 280 }}
            />
        </SafeAreaViewWrapper>
    );
};
