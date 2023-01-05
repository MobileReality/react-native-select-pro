import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const Selects = () => {
    return (
        <SafeAreaViewWrapper>
            <Text>Select number 1</Text>
            <Select options={DATA} />
            <Text>Select number 2</Text>
            <Select options={DATA} />
            <Text>Select number 3</Text>
            <Select options={DATA} />
            <Text>Select number 4</Text>
            <Select options={DATA} />
            <Text>Select number 5</Text>
            <Select options={DATA} />
        </SafeAreaViewWrapper>
    );
};
