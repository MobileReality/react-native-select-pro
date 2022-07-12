import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

export const SafeAreaViewWrapper = ({ children, style }: Props) => {
    return (
        <View
            style={[
                { flex: 1, justifyContent: 'center', alignItems: 'center' },
                style,
            ]}
        >
            {children}
        </View>
    );
};
