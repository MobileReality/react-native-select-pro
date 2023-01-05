import React, { useState } from 'react';
import { Text, View } from 'react-native';
import type { OptionType } from '@mobile-reality/react-native-select-pro';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';

// Only `value` and `label` is required, besides these fields you can add additional fields
export const DATA = [
    {
        value: '96d27ec5-e196-4577-b18d-31c74ca9145c',
        label: 'First label',
        createdAt: '2022-03-23T08:22:16.108Z',
        isValid: false,
        number: 1,
        optional: 'some text for 1',
        user: {
            name: 'Tom',
            age: 20,
            phone: '123-123-123',
        },
    },
    {
        value: '2805f95f-f712-4dc2-ae25-0910f95152b6',
        label: 'Second label in options list.',
        createdAt: '2022-03-23T08:22:18.128Z',
        isValid: true,
        number: 2,
        user: {
            name: 'Sam',
            age: 30,
            phone: null,
        },
    },
    {
        value: '84bc47cd-c8ab-4673-b428-3d96876f0a3f',
        label: 'THIRD LABEL',
        createdAt: '2022-03-24T12:12:55.248Z',
        isValid: true,
        number: 3,
        user: {
            name: 'Julia',
            age: 25,
            phone: null,
        },
    },
    {
        value: 'aee6e7cd-6f36-4e69-acae-0dbfdaa428e4',
        label: '----Fourth label----',
        createdAt: '2022-03-25T12:12:55.248Z',
        isValid: false,
        number: 4,
        optional: 'some text for 4',
        user: {
            name: 'Michael',
            age: 31,
            phone: '321-321-321',
        },
    },
    {
        value: '170dcd29-0fd5-4f8b-ac76-7d52cdeca89c',
        label: '🐈🐈🐈 Fifth label',
        createdAt: '2022-03-26T12:12:55.248Z',
        isValid: true,
        number: 5,
        user: {
            name: 'Angelina',
            age: 55,
            phone: '123-123-123',
        },
    },
    {
        value: '0b8e1c91-e6d5-487e-bac5-8e1193d2e6f7',
        label: 'Last',
        createdAt: '2022-03-27T12:12:55.248Z',
        isValid: false,
        number: 6,
        user: {
            name: 'Sandra',
            age: 40,
            phone: null,
        },
    },
];

type AdditionalFields = {
    createdAt: string;
    isValid: boolean;
    number: number;
    optional?: string;
    user: {
        name: string;
        age: number;
        phone: string | null;
    };
};

type Fields = OptionType<AdditionalFields>;

export const CustomOptionsData = () => {
    const [selected, setSelected] = useState<Fields | null>(null);

    return (
        <SafeAreaViewWrapper>
            <Select
                options={DATA}
                onSelect={(option) => {
                    setSelected(option);
                }}
            />
            <View>
                {selected && <Text>Selected item: {JSON.stringify(selected, null, 4)}</Text>}
            </View>
        </SafeAreaViewWrapper>
    );
};
