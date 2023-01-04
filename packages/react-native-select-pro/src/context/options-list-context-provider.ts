import { createSafeContext } from '../helpers';
import type { Position, State } from '../state';
import type { OptionalToRequired } from '../types';
import type { SelectProps } from '../types';
import type { OnPressOptionType } from '../types/shared';

type OptionsListContextProviderTypes<T> = OptionalToRequired<
    Pick<
        SelectProps<T>,
        | 'animation'
        | 'OptionComponent'
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
        | 'multiSelection'
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

export const [useOptionsListContext, OptionsListContextProvider] =
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    createSafeContext<OptionsListContextProviderTypes<any>>();
