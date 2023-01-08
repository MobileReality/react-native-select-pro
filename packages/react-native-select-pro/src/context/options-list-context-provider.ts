import { createContext, useContext } from 'react';

import type { Position, State } from '../state';
import type { OptionalToRequired } from '../types';
import type { SelectProps } from '../types';
import type { OnPressOptionType } from '../types/shared';

export type OptionsListContextProviderTypes<T> = OptionalToRequired<
    Pick<
        SelectProps<T>,
        | 'animation'
        | 'flatListProps'
        | 'noOptionsText'
        | 'scrollToSelectedOption'
        | 'sectionListProps'
        | 'styles'
        | 'optionButtonProps'
        | 'optionTextProps'
        | 'noOptionsProps'
        | 'noOptionsTextProps'
        | 'sectionHeaderButtonProps'
        | 'sectionHeaderTextProps'
        | 'sectionHeaderImageProps'
        | 'pressableSelectedOption'
        | 'multiple'
        | 'disabled'
    > & {
        aboveSelectControl: Position['aboveSelectControl'];
        openedPosition: Position;
        onPressOption: OnPressOptionType<T>;
        onPressSection: (title: string) => void;
    } & Pick<
            State<T>,
            | 'optionsData'
            | 'searchValue'
            | 'selectedOption'
            | 'searchedOptions'
            | 'selectedOptionIndex'
            | 'isOpened'
        >
>;

const createSafeContext = <T>() => {
    const context = createContext<OptionsListContextProviderTypes<T> | undefined>(undefined);

    const useHookContext = () => {
        const value = useContext(context);
        if (value === undefined) {
            throw new Error('useContext must be inside a Provider with a value');
        }
        return value;
    };

    return [useHookContext, context.Provider] as const;
};

export const [useOptionsListContext, OptionsListContextProvider] = createSafeContext();
