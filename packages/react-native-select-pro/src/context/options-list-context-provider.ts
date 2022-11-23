import { createSafeContext } from '../helpers';
import type { Position, State } from '../state/types';
import type { OnPressOptionType, SelectProps } from '../types';

type OptionsListContextProviderTypes = Pick<
    SelectProps,
    | 'animation'
    | 'NoOptionsComponent'
    | 'OptionComponent'
    | 'flatListProps'
    | 'noOptionsText'
    | 'scrollToSelectedOption'
    | 'onSelect'
    | 'sectionListProps'
    | 'styles'
> & {
    aboveSelectControl: Position['aboveSelectControl'];
    openedPosition: Position;
    onPressOption: OnPressOptionType;
} & Pick<
        State,
        | 'optionsData'
        | 'searchValue'
        | 'selectedOption'
        | 'searchedOptions'
        | 'selectedOptionIndex'
        | 'isOpened'
    >;

export const [useOptionsListContext, OptionsListContextProvider] =
    createSafeContext<OptionsListContextProviderTypes>();
