import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const Animated = () => {
    return (
        <SafeAreaView>
            <Text style={{ marginBottom: 10 }}>With default animation duration (200 ms)</Text>
            <Select animated options={DATA} selectControlStyle={{ width: 280, marginBottom: 20 }} />
            <Text style={{ marginBottom: 10 }}>With custom animation duration (500 ms)</Text>
            <Select
                animated
                animationDuration={500}
                options={DATA}
                selectControlStyle={{ width: 280 }}
            />
        </SafeAreaView>
    );
};
