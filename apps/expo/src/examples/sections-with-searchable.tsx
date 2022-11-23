import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { SECTIONS_DATA } from '../constants';

export const SectionsWithSearchable = () => {
    return (
        <SafeAreaViewWrapper>
            <Select options={SECTIONS_DATA} searchable={true} styles={{ width: 200 }} />
        </SafeAreaViewWrapper>
    );
};
