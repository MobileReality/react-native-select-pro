import React, { ReactNode } from 'react';
import { SafeAreaView, StyleProp, ViewStyle } from 'react-native';

type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

export const SafeAreaViewWrapper = ({ children, style }: Props) => {
    return (
        <SafeAreaView style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, style]}>
            {children}
        </SafeAreaView>
    );
};
