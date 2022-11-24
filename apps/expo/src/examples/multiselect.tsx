import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

export const MultiSelect = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                multiSelection={true}
                options={DATA}
                styles={{ width: 200 }}
                animation={false}
            />
        </SafeAreaViewWrapper>
    );
};
