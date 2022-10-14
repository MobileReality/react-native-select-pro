import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { OptionComponentProps } from '@mobile-reality/react-native-select-pro';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

const MyOption = ({ option, onPressOption }: OptionComponentProps) => {
    return (
        <TouchableOpacity onPress={onPressOption}>
            <Text>{option.label}</Text>
        </TouchableOpacity>
    );
};

const NoOptions = () => {
    return (
        <View>
            <Text>Custom component no options</Text>
        </View>
    );
};

export const CustomComponent = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                OptionComponent={(props) => <MyOption {...props} />}
                options={DATA}
                selectControlStyle={{ width: 200 }}
            />
            <Select
                NoOptionsComponent={<NoOptions />}
                options={[]}
                selectControlStyle={{ width: 200 }}
            />
        </SafeAreaViewWrapper>
    );
};
