import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

export const ScrollToSelectedOption = () => {
    return (
        <SafeAreaViewWrapper>
            <Text>Scroll to selected option</Text>
            <Select options={DATA} containerStyle={{ width: 150 }} />
            <Text>Scroll to selected option with default option</Text>
            <Select defaultOption={DATA[4]} options={DATA} containerStyle={{ width: 150 }} />
            <Text>Scroll to selected option is disabled</Text>
            <Select options={DATA} scrollToSelectedOption={false} containerStyle={{ width: 150 }} />
            <Text>Scroll to selected option with changed height of the option</Text>
            <Select
                optionsListStyles={{
                    optionStyle: {
                        height: 60,
                    },
                }}
                options={DATA}
                containerStyle={{ width: 150 }}
            />
        </SafeAreaViewWrapper>
    );
};
