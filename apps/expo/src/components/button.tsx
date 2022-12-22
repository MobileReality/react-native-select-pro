import * as React from 'react';
import type { ViewStyle } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    colorIndex: number;
    buttonStyles?: ViewStyle;
};

const MAX_COLOR_INTENSITY = 255;

const getPrimaryColor = (colorIndex: number, multiplier: number) =>
    Math.min(colorIndex * multiplier, MAX_COLOR_INTENSITY);

export const Button = ({ title, onPress, colorIndex, buttonStyles }: Props) => {
    return (
        <TouchableOpacity
            style={[
                {
                    backgroundColor: `rgb(
                        ${MAX_COLOR_INTENSITY - getPrimaryColor(colorIndex, 10)}, ${getPrimaryColor(
                        colorIndex,
                        5,
                    )}, ${getPrimaryColor(colorIndex, 15)})`,
                    width: '31%',
                    height: 100,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 4,
                    borderRadius: 4,
                    alignSelf: 'center',
                },
                buttonStyles,
            ]}
            onPress={onPress}
        >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{title}</Text>
        </TouchableOpacity>
    );
};
