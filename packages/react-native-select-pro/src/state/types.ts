import type { RefObject } from 'react';
import type { TextInput } from 'react-native';

import type { OptionsType, OptionType } from '../types';

export type Action =
    | 'open'
    | 'close'
    | 'selectOption'
    | 'setOptionsData'
    | 'setSearchInputRef'
    | 'setSearchValue'
    | 'searchOptions'
    | 'setOptionsListPosition';

export type ActionType<T> =
    | {
          type: Extract<Action, 'open'>;
      }
    | {
          type: Extract<Action, 'close'>;
      }
    | {
          type: Extract<Action, 'selectOption'>;
          payload: {
              selectedOption: OptionType<T> | OptionType<T>[] | null;
              selectedOptionIndex: number | number[];
          };
      }
    | {
          type: Extract<Action, 'setOptionsData'>;
          payload: OptionsType<T>;
      }
    | {
          type: Extract<Action, 'setOptionsListPosition'>;
          payload: Position;
      }
    | {
          type: Extract<Action, 'searchOptions'>;
          payload: string;
          searchPattern: (payload: string) => string;
      }
    | {
          type: Extract<Action, 'setSearchValue'>;
          payload: string;
      }
    | {
          type: Extract<Action, 'setSearchInputRef'>;
          payload: RefObject<TextInput> | null;
      };

export type Position = {
    width: number;
    top: number;
    left: number;
    aboveSelectControl: boolean;
};

export type State<T = unknown> = {
    isOpened: boolean;
    selectedOption: OptionType<T> | OptionType<T>[] | null;
    selectedOptionIndex: number | number[];
    optionsData: OptionsType<T>;
    openedPosition: Position;
    searchValue: string | null;
    searchedOptions: OptionsType<T>;
    searchInputRef: RefObject<TextInput> | null;
    animationDuration: number;
};

export type CreateInitialStateType<T> = {
    options: OptionsType<T>;
    searchable: boolean;
    animation: boolean | number;

    defaultOption: OptionType<T> | undefined;
};
