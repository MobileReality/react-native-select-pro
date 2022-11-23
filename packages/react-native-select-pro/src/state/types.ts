import type { Dispatch, Ref } from 'react';
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
    SetPosition = 'setPosition',
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
          type: Action.SetPosition;
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
          payload: Ref<TextInput>;
      };

export type Position = {
    width: number;
    top: number;
    left: number;
    aboveSelectControl: boolean;
};

export type State<T = unknown> = {
    isOpened: boolean;
    selectedOption: OptionType<T> | null | OptionType<T>[];
    selectedOptionIndex: number | number[];
    optionsData: OptionsType<T>;
    openedPosition: Position;
    searchValue: string | null;
    searchedOptions: OptionsType<T>;
    searchInputRef: Ref<TextInput> | null;
};

export type DispatchType<T> = Dispatch<ActionType<T>>;
