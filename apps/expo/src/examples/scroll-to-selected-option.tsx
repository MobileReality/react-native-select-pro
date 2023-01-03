import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const ScrollToSelectedOption = () => {
    return (
        <SafeAreaViewWrapper>
            <Text>Scroll to selected option</Text>
            <Select animation={false} options={DATA} styles={{ width: 150 }} />
            <Text>Scroll to selected option with default option</Text>
            <Select
                animation={false}
                defaultOption={DATA[4]}
                options={DATA}
                styles={{ width: 150 }}
            />
            <Text>Scroll to selected option is disabled</Text>
            <Select
                animation={false}
                options={DATA}
                scrollToSelectedOption={false}
                styles={{ width: 150 }}
            />
            <Text>Scroll to selected option with changed height of the option</Text>
            <Select
                animation={false}
                options={DATA}
                styles={{ width: 150, option: { height: 60 } }}
            />
        </SafeAreaViewWrapper>
    );
};
