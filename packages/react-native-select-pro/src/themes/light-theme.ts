import type { SelectStyles } from '../types';

export const lightTheme: SelectStyles = {
    select: {
        multiSelectedOption: {
            container: {
                borderWidth: 0,
                marginRight: 5,
                marginVertical: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#eeeeee',
            },
            text: {
                fontSize: 14,
                color: '#3e3e3e',
            },
        },
        container: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        clear: {
            icon: {
                tintColor: '#9c9b9b',
            },
        },
        text: {
            fontSize: 14,
        },
        arrow: {
            icon: {
                tintColor: '#9c9b9b',
            },
        },
    },
    optionsList: {
        borderColor: '#cccccc',
    },
    sectionHeader: {
        text: {
            fontSize: 14,
        },
        container: {
            borderBottomColor: '#cccccc',
            borderBottomWidth: 1,
        },
    },
    option: {
        text: {
            fontSize: 14,
        },
        selected: {
            text: {
                color: '#a5a5a5',
            },
        },
    },
};
