import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const Overflow = () => {
    return (
        <SafeAreaViewWrapper style={{ justifyContent: 'flex-end' }}>
            <Select options={DATA} selectControlStyle={{ width: 300 }} />
        </SafeAreaViewWrapper>
    );
};
