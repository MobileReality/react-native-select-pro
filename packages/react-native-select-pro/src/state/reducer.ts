import { isSectionOptionsType } from '../helpers';

import type { ActionType, State } from './types';
import { Action } from './types';

export const initialData = {
    isOpened: false,
    selectedOption: null,
    selectedOptionIndex: -1,
    searchValue: null,
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

export const reducer = <T>(state: State<T>, action: ActionType<T>): State<T> => {
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
            const regex = new RegExp(action.searchPattern(action.payload.toLowerCase()));

            if (isSectionOptionsType(state.optionsData)) {
                const filteredSections = state.optionsData
                    .map((section) => ({
                        ...section,
                        data: regex.test(section.title.toLocaleLowerCase())
                            ? section.data
                            : section.data.filter((option) =>
                                  regex.test(option.label.toLowerCase()),
                              ),
                    }))
                    .filter((section) => section.data.length > 0);

                return {
                    ...state,
                    searchedOptions: filteredSections,
                };
            }

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
        default:
            return state;
    }
};
