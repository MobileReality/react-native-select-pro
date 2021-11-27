import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const ScrollToSelectedOption = () => {
    return (
        <SafeAreaView>
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
        </SafeAreaView>
    );
};
