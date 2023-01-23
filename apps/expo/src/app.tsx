import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './components/home';
import { ROUTES } from './constants/routes';

const Stack = createNativeStackNavigator();

export const App = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f3e8' }}>
            <SelectProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name="Home"
                            component={Home}
                        />
                        {ROUTES.sort((a, b) => a.name.localeCompare(b.name)).map(
                            ({ name, screen }, index) => (
                                <Stack.Screen
                                    key={index}
                                    name={name}
                                    component={screen}
                                    options={{
                                        headerStyle: {
                                            backgroundColor: '#f0f3e8',
                                        },
                                    }}
                                />
                            ),
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </SelectProvider>
        </SafeAreaView>
    );
};
