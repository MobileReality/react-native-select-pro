import type { SelectStyles } from '../types';

export const darkTheme: SelectStyles = {
    select: {
        multiSelectedOption: {
            container: {
                borderWidth: 0,
                marginRight: 5,
                marginVertical: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#5d5d5d',
            },
            text: {
                fontSize: 14,
                color: '#ffffff',
            },
        },
        container: {
            backgroundColor: '#3e3e3e',
            borderWidth: 0,
        },
        clear: {
            icon: {
                tintColor: '#6d6c6c',
            },
        },
        text: {
            fontSize: 14,
            color: '#ffffff',
        },
        arrow: {
            icon: {
                tintColor: '#6d6c6c',
            },
        },
    },
    optionsList: {
        borderWidth: 0,
        backgroundColor: '#4e4d4d',
    },
    sectionHeader: {
        text: {
            fontSize: 14,
            color: '#ffffff',
        },
        container: {
            backgroundColor: '#4e4d4d',
            borderBottomColor: '#8c8b8b',
            borderBottomWidth: 1,
        },
        clear: {
            icon: {
                tintColor: '#ffffff',
            },
        },
    },
    option: {
        text: {
            fontSize: 14,
            color: '#ffffff',
        },
        selected: {
            container: {
                backgroundColor: '#5d5d5d',
            },
            text: {
                color: '#9c9b9b',
            },
        },
        container: {
            backgroundColor: 'transparent',
        },
    },
};
