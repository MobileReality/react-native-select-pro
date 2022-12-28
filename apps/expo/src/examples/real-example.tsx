import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import type { OptionType } from '@mobile-reality/react-native-select-pro';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';

export const PROGRAMMING_LANGUAGES = [
    {
        value: 'javascript',
        label: 'Javascript',
    },
    {
        value: 'typescript',
        label: 'Typescript',
    },
    {
        value: 'java',
        label: 'Java',
    },
    {
        value: 'python',
        label: 'Python',
    },
    {
        value: 'c#',
        label: 'C#',
    },
    {
        value: 'c',
        label: 'C',
    },
    {
        value: 'c++',
        label: 'C++',
    },
];

export const RealExample = () => {
    const { control, handleSubmit, formState, watch, reset } = useForm<{ languages: OptionType[] }>(
        {
            defaultValues: {
                languages: [],
            },
        },
    );

    const { languages } = watch();

    const onSubmit = () => {
        Alert.alert('Your choices has been saved!');
    };

    return (
        <SafeAreaViewWrapper
            style={{
                backgroundColor: '#000a19',
                padding: 25,
                flex: 1,
                paddingTop: 200,
                justifyContent: 'space-between',
            }}
        >
            {formState.isSubmitted ? (
                <View style={{ width: '100%' }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#f34c54',
                            marginBottom: 10,
                        }}
                    >
                        Your programming languages are:
                    </Text>
                    {languages.length > 0 &&
                        languages.map((language, index) => (
                            <Text
                                key={index}
                                style={{ fontSize: 16, color: '#04e590', marginBottom: 10 }}
                            >
                                {language.label}
                            </Text>
                        ))}
                </View>
            ) : (
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 16, color: '#f34c54', marginBottom: 10 }}>
                        Select your programming languages
                    </Text>
                    <Controller
                        control={control}
                        name="languages"
                        render={({ field }) => {
                            return (
                                <Select
                                    styles={{
                                        select: {
                                            multiSelectedOption: {
                                                borderRadius: 10,
                                                margin: 5,
                                                maxWidth: 120,
                                                paddingHorizontal: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#19222f',
                                                text: {
                                                    fontSize: 14,
                                                    color: '#04e590',
                                                },
                                            },
                                            width: '100%',
                                            borderRadius: 5,
                                            backgroundColor: 'transparent',
                                            borderColor: '#f34c54',
                                            borderWidth: 1,
                                            text: { fontWeight: 'bold' },
                                            arrow: {
                                                icon: {
                                                    tintColor: '#04e590',
                                                },
                                            },
                                        },
                                        optionsList: {
                                            borderWidth: 1,
                                            borderColor: '#464e58',
                                            backgroundColor: 'transparent',
                                        },
                                        option: {
                                            backgroundColor: 'transparent',
                                            borderBottomColor: '#464e58',
                                            borderBottomWidth: 1,
                                            text: {
                                                fontSize: 14,
                                                color: '#04e590',
                                            },
                                            selected: {
                                                backgroundColor: 'transparent',
                                            },
                                            selectedText: {
                                                color: '#611e21',
                                            },
                                        },
                                    }}
                                    options={PROGRAMMING_LANGUAGES}
                                    placeholderTextColor="#f34c54"
                                    multiSelection
                                    onSelect={(option) => {
                                        field.onChange([...field.value, option]);
                                    }}
                                    onRemove={(option) => {
                                        field.onChange(
                                            field.value.filter((item) => item !== option),
                                        );
                                    }}
                                />
                            );
                        }}
                    />
                </View>
            )}
            <TouchableOpacity
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: languages.length === 0 ? '#19222f' : '#f34c54',
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                disabled={languages.length === 0}
                onPress={() => (formState.isSubmitted ? reset() : handleSubmit(onSubmit)())}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {formState.isSubmitted ? 'EDIT' : 'SAVE'}
                </Text>
            </TouchableOpacity>
        </SafeAreaViewWrapper>
    );
};
