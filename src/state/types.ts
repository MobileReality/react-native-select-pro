import type { Dispatch } from 'react';

import type { OptionsType, OptionType } from '../types';

export enum Action {
    Open = 'open',
    Close = 'close',
    SelectOption = 'selectOption',
    SetOptionsData = 'setOptionsData',
    SetPosition = 'SetPosition',
    SetSearchValue = 'setSearchValue',
    SearchOptions = 'searchOptions',
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
          payload: OptionType | null;
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
      };

export type Position = {
    width: number;
    top: number;
    left: number;
    aboveSelectControl: boolean;
};

export type State = {
    isOpened: boolean;
    selectedOption: OptionType | null;
    optionsData: OptionsType;
    openedPosition: Position;
    searchValue: string;
    searchedOptions: OptionType[];
};

export type DispatchType = Dispatch<ActionType>;
