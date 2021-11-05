import React from 'react';
import { SafeAreaView } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const Basic = () => {
    return (
        <SafeAreaView>
            <Select options={DATA} selectControlStyle={{ width: 150 }} />
        </SafeAreaView>
    );
};
