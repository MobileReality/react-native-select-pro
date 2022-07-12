import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { DATA } from '../constants';

export const MultiSelectWithSearchable = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                multiSelection={true}
                options={DATA}
                searchable={true}
                selectControlStyle={{ width: 300 }}
            />
        </SafeAreaViewWrapper>
    );
};
