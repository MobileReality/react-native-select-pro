import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { CATEGORIZED_DATA } from '../constants';

const data = [
    {
        title: 'Default',
        component: (
            <Select
                options={CATEGORIZED_DATA}
                selectControlStyle={{ width: 180 }}
            />
        ),
    },
    {
        title: 'Custom Styles',
        component: (
            <Select
                options={CATEGORIZED_DATA}
                selectControlStyle={{ width: 180 }}
            />
        ),
    },
    {
        title: 'With Counter',
        component: (
            <Select
                options={CATEGORIZED_DATA}
                selectControlStyle={{ width: 180 }}
            />
        ),
    },
];

export const Categorized = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FlatList
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                }}
                data={data}
                renderItem={({ item: { component, title } }) => {
                    return (
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                {title}
                            </Text>
                            {component}
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
};
