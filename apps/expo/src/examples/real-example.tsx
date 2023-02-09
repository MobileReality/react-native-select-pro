import React from 'react';
import { useController, useForm } from 'react-hook-form';
import type { TextStyle, ViewStyle } from 'react-native';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { OptionType } from '@mobile-reality/react-native-select-pro';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { PROGRAMMING_LANGUAGES } from '../constants/data';
import { SELECT_STYLES } from '../constants/styles';

export const RealExample = () => {
    const { control, handleSubmit, formState, watch, reset } = useForm<{ languages: OptionType[] }>(
        {
            defaultValues: {
                languages: [],
            },
        },
    );

    const { field } = useController({ name: 'languages', control });
    const { languages } = watch();

    const onSubmit = () => {
        Alert.alert('Your choices has been saved!');
    };

    return (
        <SafeAreaViewWrapper style={styles.container}>
            {formState.isSubmitted ? (
                <View style={styles.fullWidth}>
                    <Text style={styles.label}>Your programming languages are:</Text>
                    {languages.length > 0 &&
                        languages.map((language, index) => (
                            <Text key={index} style={styles.languageLabel}>
                                {language.label}
                            </Text>
                        ))}
                </View>
            ) : (
                <View style={styles.fullWidth}>
                    <Text style={styles.label}>Select your programming languages</Text>
                    <Select
                        styles={SELECT_STYLES}
                        options={PROGRAMMING_LANGUAGES}
                        placeholderTextColor="#f34c54"
                        multiple
                        onSelect={(option) => {
                            field.onChange([...field.value, option]);
                        }}
                        onRemove={(option) => {
                            field.onChange(
                                field.value.filter(
                                    (item) => item.value !== (option as OptionType).value,
                                ),
                            );
                        }}
                    />
                </View>
            )}
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        backgroundColor: languages.length === 0 ? '#19222f' : '#f34c54',
                    },
                ]}
                disabled={languages.length === 0}
                onPress={() => (formState.isSubmitted ? reset() : handleSubmit(onSubmit)())}
            >
                <Text style={styles.buttonText}>{formState.isSubmitted ? 'EDIT' : 'SAVE'}</Text>
            </TouchableOpacity>
        </SafeAreaViewWrapper>
    );
};

type Styles = {
    container: ViewStyle;
    fullWidth: ViewStyle;
    label: TextStyle;
    languageLabel: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    container: {
        backgroundColor: '#000a19',
        paddingTop: 200,
        justifyContent: 'space-between',
    },
    fullWidth: {
        width: '100%',
    },
    languageLabel: {
        fontSize: 16,
        color: '#04e590',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#f34c54',
        marginBottom: 10,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
