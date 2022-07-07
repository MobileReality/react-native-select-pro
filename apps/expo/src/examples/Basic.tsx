import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { DATA } from '../constants';

export const Basic = () => {
    return (
        <SafeAreaViewWrapper>
            <Select options={DATA} selectControlStyle={{ width: 150 }} />
        </SafeAreaViewWrapper>
    );
};
