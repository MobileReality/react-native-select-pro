import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

export const Overflow = () => {
    return (
        <SafeAreaViewWrapper style={{ justifyContent: 'flex-end' }}>
            <Select options={DATA} selectControlStyle={{ width: 300 }} />
        </SafeAreaViewWrapper>
    );
};
