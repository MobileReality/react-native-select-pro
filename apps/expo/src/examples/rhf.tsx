import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const RHF = () => {
    const { watch, control } = useForm();
    return (
        <SafeAreaViewWrapper>
            <Text style={{ margin: 20 }}>Chosen: {watch()['select-name']?.label}</Text>
            <Controller
                control={control}
                name="select-name"
                render={({ field }) => {
                    return <Select options={DATA} onSelect={field.onChange} />;
                }}
            />
        </SafeAreaViewWrapper>
    );
};
