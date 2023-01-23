import * as React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ROUTES } from '../constants/routes';

import { Button } from './button';

export const Home = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { navigate } = useNavigation<any>();
    return (
        <FlatList
            testID="Examples List"
            data={ROUTES}
            numColumns={3}
            columnWrapperStyle={{
                flex: 1,
                marginHorizontal: 5,
                justifyContent: 'space-around',
            }}
            renderItem={({ item: { name }, index }) => (
                <Button
                    key={index}
                    colorIndex={index}
                    title={name}
                    onPress={() => navigate(name)}
                />
            )}
        />
    );
};
