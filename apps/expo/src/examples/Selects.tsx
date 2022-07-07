import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { DATA } from '../constants';

export const Selects = () => {
    return (
        <SafeAreaViewWrapper>
            <Text>Select number 1</Text>
            <Select options={DATA} selectControlStyle={{ width: 300 }} />
            <Text>Select number 2</Text>
            <Select options={DATA} selectControlStyle={{ width: 300 }} />
            <Text>Select number 3</Text>
            <Select options={DATA} selectControlStyle={{ width: 300 }} />
            <Text>Select number 4</Text>
            <Select options={DATA} selectControlStyle={{ width: 300 }} />
            <Text>Select number 5</Text>
            <Select options={DATA} selectControlStyle={{ width: 300 }} />
        </SafeAreaViewWrapper>
    );
};
