import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const RHF = () => {
    const { watch, control } = useForm();
    return (
        <SafeAreaView>
            <Text style={{ margin: 20 }}>Chosen: {watch()['select-name']?.label}</Text>
            <Controller
                control={control}
                name={'select-name'}
                render={({ field }) => {
                    return (
                        <Select
                            onSelect={field.onChange}
                            options={DATA}
                            selectControlStyle={{ width: 300 }}
                        />
                    );
                }}
            />
        </SafeAreaView>
    );
};
