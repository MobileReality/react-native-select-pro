import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const Basic = () => {
    return (
        <SafeAreaViewWrapper>
            <Select options={DATA} selectControlStyle={{ width: 150 }} />
        </SafeAreaViewWrapper>
    );
};
