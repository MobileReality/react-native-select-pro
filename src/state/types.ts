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

export type ActionType =
    | {
          type: Action.Open;
      }
    | {
          type: Action.Close;
      }
    | {
          type: Action.SelectOption;
          payload: {
              selectedOption: OptionType | OptionType[] | null;
              selectedOptionIndex: number | number[];
          };
      }
    | {
          type: Action.SetOptionsData;
          payload: OptionsType;
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

export type State = {
    isOpened: boolean;
    selectedOption: OptionType | null | OptionType[];
    selectedOptionIndex: number | number[];
    optionsData: OptionsType;
    openedPosition: Position;
    searchValue: string;
    searchedOptions: OptionType[];
    searchInputRef: Ref<TextInput> | null;
};

export type DispatchType = Dispatch<ActionType>;
