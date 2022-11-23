import { createSafeContext } from '../helpers';
import type { Position, State } from '../state/types';
import type { OnPressOptionType, SelectProps } from '../types';

type OptionsListContextProviderTypes<T> = Pick<
    SelectProps<T>,
    | 'animation'
    | 'NoOptionsComponent'
    | 'OptionComponent'
    | 'flatListProps'
    | 'noOptionsText'
    | 'scrollToSelectedOption'
    | 'onSelect'
    | 'sectionListProps'
    | 'optionsListStyles'
> & {
    aboveSelectControl: Position['aboveSelectControl'];
    openedPosition: Position;
    onPressOption: OnPressOptionType<T>;
} & Pick<
        State<T>,
        | 'optionsData'
        | 'searchValue'
        | 'selectedOption'
        | 'searchedOptions'
        | 'selectedOptionIndex'
        | 'isOpened'
    >;

export const [useOptionsListContext, OptionsListContextProvider] =
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    createSafeContext<OptionsListContextProviderTypes<any>>();
