import * as React from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

import { Animated } from './examples/Animated';
import { Basic } from './examples/Basic';
import { Callbacks } from './examples/Callbacks';
import { CustomComponent } from './examples/CustomComponent';
import { CustomStyles } from './examples/CustomStyles';
import { ModalExample } from './examples/ModalExample';
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

const examples = [
    'Basic',
    'Overflow',
    'React Hook Form',
    'Modal',
    'Selects',
    'Custom Styles',
    'Ref',
    'Callbacks',
    'Custom Component',
    'Scroll To Selected Option',
    'Searchable',
    'Searchable In Modal',
    'Animated',
];

export default function App() {
    const [example, setExample] = useState(examples[0]);

    const renderExamplesButtons = examples.map((item) => (
        <TouchableOpacity
            key={item}
            onPress={() => setExample(item)}
            style={{ padding: 10, borderWidth: 1 }}>
            <Text style={{ textTransform: 'capitalize' }}>{item}</Text>
        </TouchableOpacity>
    ));

    const renderExample = () => {
        switch (example) {
            case 'Basic':
                return <Basic />;
            case 'Overflow':
                return <Overflow />;
            case 'Modal':
                return <ModalExample />;
            case 'React Hook Form':
                return <RHF />;
            case 'Selects':
                return <Selects />;
            case 'Custom Styles':
                return <CustomStyles />;
            case 'Ref':
                return <Ref />;
            case 'Callbacks':
                return <Callbacks />;
            case 'Custom Component':
                return <CustomComponent />;
            case 'Scroll To Selected Option':
                return <ScrollToSelectedOption />;
            case 'Searchable':
                return <Searchable />;
            case 'Searchable In Modal':
                return <SearchableInModal />;
            case 'Animated':
                return <Animated />;
            default:
                return null;
        }
    };

    return (
        <SelectProvider>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 80,
                    flexWrap: 'wrap',
                    marginBottom: 20,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {renderExamplesButtons}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>{renderExample()}</View>
        </SelectProvider>
    );
}
