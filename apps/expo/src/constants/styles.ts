import type { SelectStyles } from 'packages/react-native-select-pro/src/types/styles';

export const SELECT_STYLES: SelectStyles = {
    select: {
        multiSelectedOption: {
            container: {
                borderRadius: 10,
                margin: 5,
                maxWidth: 120,
                paddingHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#19222f',
            },
            text: {
                fontSize: 14,
                color: '#04e590',
            },
        },
        container: {
            width: '100%',
            borderRadius: 5,
            backgroundColor: 'transparent',
            borderColor: '#f34c54',
            borderWidth: 1,
        },
        text: {
            fontSize: 14,
            color: '#f34c54',
        },
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
        container: {
            backgroundColor: 'transparent',
            borderBottomColor: '#464e58',
            borderBottomWidth: 1,
        },

        text: {
            fontSize: 14,
            color: '#04e590',
        },
        selected: {
            container: {
                backgroundColor: 'transparent',
            },
            text: {
                color: '#611e21',
            },
        },
    },
};
