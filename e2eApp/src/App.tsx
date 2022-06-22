import * as React from 'react';
import { ShowcaseApp } from '@gorhom/showcase-template';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

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
        title: 'Examples',
        data: [
            {
                name: 'Basic',
                slug: 'basic',
                getScreen: () => Basic,
            },
            {
                name: 'Overflow',
                slug: 'overflow',
                getScreen: () => Overflow,
            },
            {
                name: 'React Hook Form',
                slug: 'rhf',
                getScreen: () => RHF,
            },
            {
                name: 'Modal',
                slug: 'modal',
                getScreen: () => ModalExample,
            },
            {
                name: 'Selects',
                slug: 'selects',
                getScreen: () => Selects,
            },
            {
                name: 'Custom Styles',
                slug: 'customStyles',
                getScreen: () => CustomStyles,
            },
            {
                name: 'Ref',
                slug: 'ref',
                getScreen: () => Ref,
            },
            {
                name: 'Callbacks',
                slug: 'callbacks',
                getScreen: () => Callbacks,
            },
            {
                name: 'Custom Component',
                slug: 'customComponent',
                getScreen: () => CustomComponent,
            },
            {
                name: 'Scroll To The Selected Option',
                slug: 'scrollToTheSelectedOption',
                getScreen: () => ScrollToSelectedOption,
            },
            {
                name: 'Searchable',
                slug: 'searchable',
                getScreen: () => Searchable,
            },
            {
                name: 'Searchable In Modal',
                slug: 'searchableInModal',
                getScreen: () => SearchableInModal,
            },
            {
                name: 'Animated',
                slug: 'animated',
                getScreen: () => Animated,
            },
            {
                name: 'Custom Left Icon',
                slug: 'customLeftIcon',
                getScreen: () => CustomLeftIcon,
            },
            {
                name: 'Multi Select',
                slug: 'multiSelection',
                getScreen: () => MultiSelect,
            },
            {
                name: 'Multi Select with searchable',
                slug: 'multiSelectionWithSearchable',
                getScreen: () => MultiSelectWithSearchable,
            },
            {
                name: 'Custom Options Data',
                slug: 'customOptionsData',
                getScreen: () => CustomOptionsData,
            },
        ],
    },
];

export default function App() {
    return (
        <SelectProvider>
            <ShowcaseApp
                author={{
                    username: 'Mobile Reality',
                    url: 'https://mobilereality.pl/en',
                }}
                data={data}
                description="Choose an example"
                name="React Native Select Pro"
                version="1.9.0"
            />
        </SelectProvider>
    );
}
