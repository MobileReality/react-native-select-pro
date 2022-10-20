import * as React from 'react';
import { useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

import { Button } from './components/button';
import { Animated } from './examples/animated';
import { Basic } from './examples/basic';
import { Callbacks } from './examples/callbacks';
import { CustomComponent } from './examples/custom-component';
import { CustomIcons } from './examples/custom-icons';
import { CustomOptionsData } from './examples/custom-options-data';
import { CustomStyles } from './examples/custom-styles';
import { ModalExample } from './examples/modal-example';
import { MultiSelect } from './examples/multiselect';
import { MultiSelectWithSearchable } from './examples/multiselect-with-searchable';
import { Overflow } from './examples/overflow';
import { Ref } from './examples/ref';
import { RHF } from './examples/rhf';
import { ScrollToSelectedOption } from './examples/scroll-to-selected-option';
import { Searchable } from './examples/searchable';
import { SearchableInModal } from './examples/searchable-in-modal';
import { Sections } from './examples/sections';
import { Selects } from './examples/selects';
import { TextInputProps } from './examples/text-input-props';

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
        name: 'Custom Options Data',
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
        name: 'MultiSelect',
        getScreen: () => <MultiSelect />,
    },
    {
        name: 'MultiSelect with searchable',
        getScreen: () => <MultiSelectWithSearchable />,
    },
    {
        name: 'TextInputProps',
        getScreen: () => <TextInputProps />,
    },
    {
        name: 'Sections',
        getScreen: () => <Sections />,
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
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{screen.title}</Text>
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
                            height: Dimensions.get('screen').height,
                            width: Dimensions.get('screen').width,
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