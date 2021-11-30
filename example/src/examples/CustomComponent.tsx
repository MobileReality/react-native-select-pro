import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { OptionComponentProps, Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

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
        <SafeAreaView>
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
        </SafeAreaView>
    );
};
