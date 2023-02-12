import type { Dispatch } from 'react';
import { createContext, useContext } from 'react';

import type { ActionType, Position, State } from '../state';
import type { OnPressSelectControlType, OptionalToRequired, SelectProps } from '../types';

type SelectContextProviderTypes<T> = OptionalToRequired<
    {
        aboveSelectControl: Position['aboveSelectControl'];
    } & Pick<
        SelectProps<T>,
        | 'animation'
        | 'disabled'
        | 'hideArrow'
        | 'clearable'
        | 'multiple'
        | 'placeholderText'
        | 'placeholderTextColor'
        | 'searchPattern'
        | 'selectInputProps'
        | 'onRemove'
        | 'styles'
        | 'clearOptionButtonProps'
        | 'clearOptionImageProps'
        | 'arrowContainerProps'
        | 'arrowImageProps'
        | 'selectRightIconsProps'
        | 'selectLeftIconsProps'
        | 'selectLeftIconImageProps'
        | 'selectTextProps'
        | 'selectContainerProps'
        | 'onSelectChangeText'
    > &
        Pick<
            State<T>,
            'optionsData' | 'searchValue' | 'selectedOption' | 'selectedOptionIndex' | 'isOpened'
        > & {
            onPressSelectControl: OnPressSelectControlType;
            dispatch: Dispatch<ActionType<unknown>>;
            setOptionsListPosition: () => Promise<void>;
        }
>;

const createSafeContext = <T>() => {
    const context = createContext<SelectContextProviderTypes<T> | undefined>(undefined);

    const useHookContext = () => {
        const value = useContext(context);
        if (value === undefined) {
            throw new Error('useContext must be inside a Provider with a value');
        }
        return value;
    };

    return [useHookContext, context.Provider] as const;
};

export const [useSelectContext, SelectContextProvider] = createSafeContext();
