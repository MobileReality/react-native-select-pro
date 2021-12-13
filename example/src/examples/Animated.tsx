import React from 'react';
import { SafeAreaView } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const Animated = () => {
    return (
        <SafeAreaView>
            <Select
                animated
                animationDuration={500}
                options={DATA}
                selectControlStyle={{ width: 280 }}
            />
        </SafeAreaView>
    );
};
