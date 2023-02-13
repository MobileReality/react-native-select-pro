import { LayoutAnimation } from 'react-native';

import { ANIMATION_DURATION } from '../constants';
import { ERRORS, searchNormalize } from '../helpers';
import { isSectionOptionsType } from '../types';

import type { ActionType, CreateInitialStateType, State } from './types';

export const reducer = <T>(state: State<T>, action: ActionType<T>): State<T> => {
    switch (action.type) {
        case 'open':
            if (state.searchValue !== null) {
                state.searchInputRef?.current?.focus();
            }
            return {
                ...state,
                isOpened: true,
            };
        case 'close':
            state.animationDuration > 0 &&
                LayoutAnimation.configureNext({
                    duration: state.animationDuration,
                    delete: {
                        type: LayoutAnimation.Types.linear,
                        property: LayoutAnimation.Properties.opacity,
                    },
                });
            return {
                ...state,
                isOpened: false,
            };
        case 'selectOption':
            return {
                ...state,
                selectedOption: action.payload.selectedOption,
                selectedOptionIndex: action.payload.selectedOptionIndex,
            };
        case 'setOptionsData':
            return {
                ...state,
                optionsData: action.payload,
            };
        case 'setSearchValue':
            return {
                ...state,
                searchValue: action.payload,
            };
        case 'searchOptions': {
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
                        data: searchNormalize(regex, section.title)
                            ? section.data
                            : section.data.filter((option) => searchNormalize(regex, option.label)),
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
                    searchNormalize(regex, option.label),
                ),
            };
        }
        case 'setSearchInputRef':
            return {
                ...state,
                searchInputRef: action.payload,
            };
        case 'setOptionsListPosition':
            return {
                ...state,
                openedPosition: { ...state.openedPosition, ...action.payload },
            };
        default:
            return state;
    }
};

export const createInitialState = <T>({
    options,
    searchable,
    animation,
}: CreateInitialStateType<T>) => {
    if (!Array.isArray(options)) {
        throw new TypeError(ERRORS.NO_ARRAY_OPTIONS);
    }

    return {
        isOpened: false,
        selectedOption: null,
        selectedOptionIndex: -1,
        searchedOptions: [],
        searchInputRef: null,
        openedPosition: {
            width: 0,
            top: 0,
            left: 0,
            aboveSelectControl: false,
        },
        optionsData: options,
        searchValue: searchable ? '' : null,
        animationDuration:
            typeof animation === 'boolean' ? (animation ? ANIMATION_DURATION : 0) : animation,
    };
};
