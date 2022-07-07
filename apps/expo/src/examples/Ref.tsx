import React, { useRef, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { Select, SelectRef } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { DATA } from '../constants';

export const Ref = () => {
    const [currentState, setCurrentState] = useState<any>(null);
    const ref = useRef<SelectRef>(null);

    const onPress = () => {
        if (ref.current) {
            ref.current.open();
        }
    };

    const onClear = () => {
        if (ref.current) {
            ref.current.clear();
        }
    };

    const onGetState = () => {
        if (ref.current) {
            setCurrentState(ref.current.getState());
        }
    };

    return (
        <SafeAreaViewWrapper>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button title="Open" onPress={onPress} />
                <Button title="Reset" onPress={onClear} />
                <Button title="Get current Select state" onPress={onGetState} />
                <Select
                    ref={ref}
                    options={DATA}
                    selectControlStyle={{ width: 300 }}
                />
            </View>

            <ScrollView style={{ flex: 1 }}>
                <Text style={{ marginTop: 20 }}>
                    State: {JSON.stringify(currentState, null, 4)}
                </Text>
            </ScrollView>
        </SafeAreaViewWrapper>
    );
};
