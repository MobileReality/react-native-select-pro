import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

export const Basic = () => {
    return (
        <SafeAreaViewWrapper>
            <Select options={DATA} containerStyle={{ width: 250 }} />
        </SafeAreaViewWrapper>
    );
};
