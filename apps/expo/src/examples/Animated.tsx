import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { DATA } from '../constants';

export const Animated = () => {
    return (
        <SafeAreaViewWrapper>
            <Text style={{ marginBottom: 10 }}>
                With default animation duration (200 ms)
            </Text>
            <Select
                options={DATA}
                selectControlStyle={{ width: 280, marginBottom: 20 }}
                animated
            />
            <Text style={{ marginBottom: 10 }}>
                With custom animation duration (500 ms)
            </Text>
            <Select
                animationDuration={500}
                options={DATA}
                selectControlStyle={{ width: 280 }}
                animated
            />
        </SafeAreaViewWrapper>
    );
};
