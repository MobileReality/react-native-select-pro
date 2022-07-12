import { Action, ActionType, State } from './types';

export const initialData: State = {
    isOpened: false,
    selectedOption: null,
    selectedOptionIndex: -1,
    searchValue: '',
    searchedOptions: [],
    searchInputRef: null,
    openedPosition: {
        width: 0,
        top: 0,
        left: 0,
        aboveSelectControl: false,
    },
    optionsData: [],
};

export const reducer = (state: State, action: ActionType): State => {
    switch (action.type) {
        case Action.Open:
            return {
                ...state,
                isOpened: true,
            };
        case Action.Close:
            return {
                ...state,
                isOpened: false,
            };
        case Action.SelectOption:
            return {
                ...state,
                selectedOption: action.payload.selectedOption,
                selectedOptionIndex: action.payload.selectedOptionIndex,
            };
        case Action.SetOptionsData:
            return {
                ...state,
                optionsData: action.payload,
            };
        case Action.SetSearchValue:
            return {
                ...state,
                searchValue: action.payload,
            };
        case Action.SearchOptions: {
            if (action.payload === '') {
                return {
                    ...state,
                    searchedOptions: [],
                };
            }
            const regex = new RegExp(
                action.searchPattern(action.payload.toLowerCase()),
            );
            return {
                ...state,
                searchedOptions: state.optionsData.filter((option) =>
                    regex.test(option.label.toLowerCase()),
                ),
            };
        }
        case Action.SetSearchInputRef:
            return {
                ...state,
                searchInputRef: action.payload,
            };
        case Action.SetPosition:
            return {
                ...state,
                openedPosition: { ...state.openedPosition, ...action.payload },
            };
    }
};
