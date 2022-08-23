import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { CATEGORIZED_DATA } from '../constants';

const data = [
    {
        title: 'Default:',
        component: (
            <Select
                options={CATEGORIZED_DATA}
                selectControlStyle={{ width: 180 }}
            />
        ),
    },
    {
        title: 'Custom Categories:',
        component: (
            <Select
                options={CATEGORIZED_DATA}
                selectControlStyle={{ width: 180 }}
                parentOptionStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                parentOptionTextStyle={{
                    color: 'green',
                    textTransform: 'capitalize',
                    fontWeight: '700',
                    fontSize: 18,
                    fontStyle: 'italic',
                    textDecorationLine: 'underline',
                }}
            />
        ),
    },
    {
        title: 'With Counter:',
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
        <SafeAreaView style={{ alignItems: 'center' }}>
            <FlatList
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                }}
                data={data}
                renderItem={({ item: { component, title } }) => {
                    return (
                        <View style={{ marginVertical: 60 }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    marginBottom: 6,
                                }}
                            >
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
