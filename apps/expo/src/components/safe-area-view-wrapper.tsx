import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';

type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

export const SafeAreaViewWrapper = ({ children, style }: Props) => {
    return (
        <View
            style={[
                { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 25 },
                style,
            ]}
        >
            {children}
        </View>
    );
};
