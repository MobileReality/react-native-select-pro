import type { SelectStyles } from 'packages/react-native-select-pro/src/types/styles';

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

export const SECTIONS_DATA = [
    {
        title: 'North America',
        data: [
            {
                value: 'us',
                label: 'United States of America',
            },
            {
                value: 'ca',
                label: 'Canada',
            },
        ],
    },
    {
        title: 'Europe',
        data: [
            {
                value: 'pl',
                label: 'Poland',
            },
            {
                value: 'es',
                label: 'Spain',
            },
            {
                value: 'fr',
                label: 'France',
            },
        ],
    },
];

export const SELECT_STYLES: SelectStyles = {
    select: {
        multiSelectedOption: {
            borderRadius: 10,
            margin: 5,
            maxWidth: 120,
            paddingHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#19222f',
            text: {
                fontSize: 14,
                color: '#04e590',
            },
        },
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'transparent',
        borderColor: '#f34c54',
        borderWidth: 1,
        text: { fontWeight: 'bold' },
        arrow: {
            icon: {
                tintColor: '#04e590',
            },
        },
    },
    optionsList: {
        borderWidth: 1,
        borderColor: '#464e58',
        backgroundColor: 'transparent',
    },
    option: {
        backgroundColor: 'transparent',
        borderBottomColor: '#464e58',
        borderBottomWidth: 1,
        text: {
            fontSize: 14,
            color: '#04e590',
        },
        selected: {
            backgroundColor: 'transparent',
        },
        selectedText: {
            color: '#611e21',
        },
    },
};

export const PROGRAMMING_LANGUAGES = [
    {
        value: 'javascript',
        label: 'JavaScript',
    },
    {
        value: 'typescript',
        label: 'TypeScript',
    },
    {
        value: 'java',
        label: 'Java',
    },
    {
        value: 'python',
        label: 'Python',
    },
    {
        value: 'c#',
        label: 'C#',
    },
    {
        value: 'c',
        label: 'C',
    },
    {
        value: 'c++',
        label: 'C++',
    },
];
