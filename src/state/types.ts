import type { Dispatch } from 'react';

import type { OptionsType, OptionType } from '../types';

export enum Action {
    Open = 'open',
    Close = 'close',
    SelectOption = 'selectOption',
    SetOptionsData = 'setOptionsData',
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
          payload: OptionType | null;
      }
    | {
          type: Action.SetOptionsData;
          payload: OptionsType;
      }
    | {
          type: Action.SetPosition;
          payload: Position;
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
};

export type DispatchType = Dispatch<ActionType>;
