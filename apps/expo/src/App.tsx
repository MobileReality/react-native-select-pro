import * as React from 'react';
import { useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

import { Button } from './components/Button';
import { Animated } from './examples/Animated';
import { Basic } from './examples/Basic';
import { Callbacks } from './examples/Callbacks';
import { CustomComponent } from './examples/CustomComponent';
import { CustomIcons } from './examples/CustomIcons';
import { CustomOptionsData } from './examples/CustomOptionsData';
import { CustomStyles } from './examples/CustomStyles';
import { ModalExample } from './examples/ModalExample';
import { MultiSelect } from './examples/MultiSelect';
import { MultiSelectWithSearchable } from './examples/MultiSelectWithSearchable';
import { Overflow } from './examples/Overflow';
import { Ref } from './examples/Ref';
import { RHF } from './examples/RHF';
import { ScrollToSelectedOption } from './examples/ScrollToSelectedOption';
import { Searchable } from './examples/Searchable';
import { SearchableInModal } from './examples/SearchableInModal';
import { Selects } from './examples/Selects';
import { TextInputProps } from './examples/TextInputProps';

const data = [
    {
        name: 'Basic',
        getScreen: () => <Basic />,
    },
    {
        name: 'Overflow',
        getScreen: () => <Overflow />,
    },
    {
        name: 'With React Hook Form',
        // eslint-disable-next-line react/jsx-pascal-case
        getScreen: () => <RHF />,
    },
    {
        name: 'Modal',
        getScreen: () => <ModalExample />,
    },
    {
        name: 'Selects',
        getScreen: () => <Selects />,
    },
    {
        name: 'Custom Styles',
        getScreen: () => <CustomStyles />,
    },
    {
        name: 'Ref',
        getScreen: () => <Ref />,
    },
    {
        name: 'Callbacks',
        getScreen: () => <Callbacks />,
    },
    {
        name: 'Custom Component',
        getScreen: () => <CustomComponent />,
    },
    {
        name: 'Custom Options Data 3',
        getScreen: () => <CustomOptionsData />,
    },
    {
        name: 'Scroll To The Selected Option',
        getScreen: () => <ScrollToSelectedOption />,
    },
    {
        name: 'Searchable',
        getScreen: () => <Searchable />,
    },
    {
        name: 'Searchable In Modal',
        getScreen: () => <SearchableInModal />,
    },
    {
        name: 'Animated',
        getScreen: () => <Animated />,
    },
    {
        name: 'Custom Icons',
        getScreen: () => <CustomIcons />,
    },
    {
        name: 'Multi Select',
        getScreen: () => <MultiSelect />,
    },
    {
        name: 'Multi Select with searchable',
        getScreen: () => <MultiSelectWithSearchable />,
    },
    {
        name: 'TextInputProps',
        getScreen: () => <TextInputProps />,
    },
];

export const App = () => {
    const [screen, setScreen] = useState<{
        screen?: () => JSX.Element;
        title: string;
    }>({
        screen: undefined,
        title: '',
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f3e8' }}>
            <FlatList
                testID="Examples List"
                data={data}
                renderItem={({ item: { getScreen, name } }) => (
                    <Button
                        title={name}
                        onPress={() =>
                            setScreen({
                                screen: getScreen,
                                title: name,
                            })
                        }
                    />
                )}
            />
            {!!screen.screen && (
                <>
                    <View
                        style={{
                            top: 50,

                            position: 'absolute',
                            zIndex: 1,
                            width: '100%',
                        }}
                    >
                        <View
                            style={{
                                width: '50%',
                                left: 20,
                                position: 'absolute',
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                {screen.title}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '30%',
                                right: 0,
                                position: 'absolute',
                            }}
                        >
                            <Button
                                title="Close"
                                onPress={() =>
                                    setScreen({
                                        screen: undefined,
                                        title: '',
                                    })
                                }
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            flex: 1,
                            height: Dimensions.get('window').height,
                            width: Dimensions.get('window').width,
                            backgroundColor: '#f0f3e8',
                        }}
                    >
                        <SelectProvider>{screen?.screen()}</SelectProvider>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};
