import type { ReactNode } from 'react';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

const KeyboardAware = ({ children }: { children: ReactNode }) => (
    <KeyboardAvoidingView
        style={{
            flex: 1,
            justifyContent: 'space-between',
            width: '100%',
        }}
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
    >
        {children}
    </KeyboardAvoidingView>
);

export const SearchableWithKeyboardAvoidView = () => {
    return (
        <SafeAreaViewWrapper>
            <KeyboardAware>
                <Text>Some content...</Text>
                <Text>Some content...</Text>
                <Text>Some content...</Text>
                <Select options={DATA} searchable={true} />
                <Text>Some content...</Text>
            </KeyboardAware>
        </SafeAreaViewWrapper>
    );
};
