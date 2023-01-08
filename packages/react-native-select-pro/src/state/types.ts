import type { Dispatch, RefObject } from 'react';
import type { TextInput } from 'react-native';

import type { OptionsType, OptionType } from '../types';

export enum Action {
    Open = 'open',
    Close = 'close',
    SelectOption = 'selectOption',
    SetOptionsData = 'setOptionsData',
    SetSearchInputRef = 'setSearchInputRef',
    SetSearchValue = 'setSearchValue',
    SearchOptions = 'searchOptions',
    SetOptionsListPosition = 'setOptionsListPo',
}

export type ActionType<T> =
    | {
          type: Action.Open;
      }
    | {
          type: Action.Close;
      }
    | {
          type: Action.SelectOption;
          payload: {
              selectedOption: OptionType<T> | OptionType<T>[] | null;
              selectedOptionIndex: number | number[];
          };
      }
    | {
          type: Action.SetOptionsData;
          payload: OptionsType<T>;
      }
    | {
          type: Action.SetOptionsListPosition;
          payload: Position;
      }
    | {
          type: Action.SearchOptions;
          payload: string;
          searchPattern: (payload: string) => string;
      }
    | {
          type: Action.SetSearchValue;
          payload: string;
      }
    | {
          type: Action.SetSearchInputRef;
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

export type DispatchType<T> = Dispatch<ActionType<T>>;

export type CreateInitialStateType<T> = {
    options: OptionsType<T>;
    searchable: boolean;
    animation: boolean | number;
};
