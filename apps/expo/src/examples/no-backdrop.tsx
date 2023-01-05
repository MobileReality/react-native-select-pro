import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const NoBackdrop = () => {
    return (
        <SafeAreaViewWrapper>
            <Text>Select number 1</Text>
            <Select options={DATA} />
            <Text>Select number 2</Text>
            <Select options={DATA} />
            <Text>Select number 3 with no Backdrop</Text>
            <Select options={DATA} hasBackdrop={false} />
        </SafeAreaViewWrapper>
    );
};
