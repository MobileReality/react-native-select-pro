import * as React from 'react';
import { useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

import { Button } from './components/button';
import { Animated } from './examples/animated';
import { Basic } from './examples/basic';
import { SelectBottomSheet } from './examples/bottom-sheet';
import { Callbacks } from './examples/callbacks';
import { CustomComponent } from './examples/custom-component';
import { CustomIcons } from './examples/custom-icons';
import { CustomOptionsData } from './examples/custom-options-data';
import { CustomStyles } from './examples/custom-styles';
import { ModalExample } from './examples/modal-example';
import { MultiSelect } from './examples/multiselect';
import { MultiSelectWithSearchable } from './examples/multiselect-with-searchable';
import { NoBackdrop } from './examples/no-backdrop';
import { Overflow } from './examples/overflow';
import { RealExample } from './examples/real-example';
import { Ref } from './examples/ref';
import { RHF } from './examples/rhf';
import { ScrollToSelectedOption } from './examples/scroll-to-selected-option';
import { Searchable } from './examples/searchable';
import { SearchableInModal } from './examples/searchable-in-modal';
import { Sections } from './examples/sections';
import { SectionsWithMultiSelect } from './examples/sections-with-multiselect';
import { SectionsWithSearchable } from './examples/sections-with-searchable';
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
        name: 'Scroll To Selected Option',
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
        name: 'MultiSelect with Searchable',
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
    {
        name: 'Sections with Searchable',
        getScreen: () => <SectionsWithSearchable />,
    },
    {
        name: 'Sections with MultiSelect',
        getScreen: () => <SectionsWithMultiSelect />,
    },
    {
        name: 'No Backdrop',
        getScreen: () => <NoBackdrop />,
    },
    {
        name: 'Bottom Sheet',
        getScreen: () => <SelectBottomSheet />,
    },
    {
        name: 'Real Example',
        getScreen: () => <RealExample />,
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
                numColumns={3}
                columnWrapperStyle={{
                    flex: 1,
                    marginHorizontal: 5,
                    justifyContent: 'space-around',
                }}
                renderItem={({ item: { getScreen, name }, index }) => (
                    <Button
                        colorIndex={index}
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
                                colorIndex={0}
                                buttonStyles={{ width: 100, height: 50 }}
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
