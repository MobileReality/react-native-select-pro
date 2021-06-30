import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

export type TestProps = {
    title: string;
};

export const Test = ({ title }: TestProps) => {
    const [number, setNumber] = useState(1);
    return (
        <View>
            <Text>{title}</Text>
            <Text>Current number: {number}</Text>
            <Button title={'Decrement'} onPress={() => setNumber((prevNumber) => prevNumber - 1)} />
            <Button title={'Increment'} onPress={() => setNumber((prevNumber) => prevNumber + 1)} />
        </View>
    );
};
