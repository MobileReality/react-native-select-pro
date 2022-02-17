import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const ScrollToSelectedOption = () => {
    return (
        <SafeAreaViewWrapper>
            <Text>Scroll to selected option</Text>
            <Select options={DATA} selectControlStyle={{ width: 150 }} />
            <Text>Scroll to selected option with default option</Text>
            <Select defaultOption={DATA[4]} options={DATA} selectControlStyle={{ width: 150 }} />
            <Text>Scroll to selected option is disabled</Text>
            <Select
                options={DATA}
                scrollToSelectedOption={false}
                selectControlStyle={{ width: 150 }}
            />
            <Text>Scroll to selected option with changed height of the option</Text>
            <Select
                optionStyle={{
                    height: 60,
                }}
                options={DATA}
                selectControlStyle={{ width: 150 }}
            />
        </SafeAreaViewWrapper>
    );
};
