import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
};

export const Button = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#f53207',
                width: '80%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 4,
                borderRadius: 4,
                alignSelf: 'center',
            }}
            onPress={onPress}
        >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
