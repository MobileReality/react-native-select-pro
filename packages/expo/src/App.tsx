import * as React from 'react';
import { useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

import { Button } from './components/Button';
import { Animated } from './examples/Animated';
import { Basic } from './examples/Basic';
import { Callbacks } from './examples/Callbacks';
import { CustomComponent } from './examples/CustomComponent';
import { CustomLeftIcon } from './examples/CustomLeftIcon';
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

export const DATA = [
    {
        value: '96d27ec5-e196-4577-b18d-31c74ca9145c',
        label: 'First label',
    },
    {
        value: '2805f95f-f712-4dc2-ae25-0910f95152b6',
        label: 'Second label in options list.',
    },
    {
        value: '84bc47cd-c8ab-4673-b428-3d96876f0a3f',
        label: 'THIRD LABEL',
    },
    {
        value: 'aee6e7cd-6f36-4e69-acae-0dbfdaa428e4',
        label: '----Fourth label----',
    },
    {
        value: '170dcd29-0fd5-4f8b-ac76-7d52cdeca89c',
        label: '🐈🐈🐈 Fifth label',
    },
    {
        value: '0b8e1c91-e6d5-487e-bac5-8e1193d2e6f7',
        label: 'Last',
    },
];

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
        name: 'Custom Left Icon',
        getScreen: () => <CustomLeftIcon />,
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
        name: 'Custom Options Data',
        getScreen: () => <CustomOptionsData />,
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
