import type { ActionType, State } from './types';
import { Action } from './types';

export const initialData: State = {
    isOpened: false,
    selectedOption: null,
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
                selectedOption: action.payload,
            };
        case Action.SetOptionsData:
            return {
                ...state,
                optionsData: action.payload,
            };
        case Action.SetPosition:
            return {
                ...state,
                openedPosition: { ...state.openedPosition, ...action.payload },
            };
    }
};
