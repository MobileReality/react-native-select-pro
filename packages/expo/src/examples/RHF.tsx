import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const RHF = () => {
    const { watch, control } = useForm();
    return (
        <SafeAreaViewWrapper>
            <Text style={{ margin: 20 }}>
                Chosen: {watch()['select-name']?.label}
            </Text>
            <Controller
                control={control}
                name="select-name"
                render={({ field }) => {
                    return (
                        <Select
                            options={DATA}
                            selectControlStyle={{ width: 300 }}
                            onSelect={field.onChange}
                        />
                    );
                }}
            />
        </SafeAreaViewWrapper>
    );
};
