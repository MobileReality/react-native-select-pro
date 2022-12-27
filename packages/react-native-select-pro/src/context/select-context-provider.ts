import type {
    OnPressSelectControlType,
    SelectProps,
} from '@mobile-reality/react-native-select-pro';

import { createSafeContext } from '../helpers';
import type { DispatchType, Position, State } from '../state';

type SelectContextProviderTypes<T> = {
    aboveSelectControl: Position['aboveSelectControl'];
} & Pick<
    SelectProps<T>,
    | 'animation'
    | 'disabled'
    | 'hideArrow'
    | 'clearable'
    | 'multiSelection'
    | 'placeholderText'
    | 'placeholderTextColor'
    | 'searchPattern'
    | 'textInputProps'
    | 'selectControlClearOptionA11yLabel'
    | 'selectControlOpenDropdownA11yLabel'
    | 'onRemove'
    | 'styles'
> &
    Pick<
        State<T>,
        'optionsData' | 'searchValue' | 'selectedOption' | 'selectedOptionIndex' | 'isOpened'
    > & {
        onPressSelectControl: OnPressSelectControlType;
        dispatch: DispatchType<T>;
        setOptionsListPosition: () => Promise<void>;
    };

export const [useSelectContext, SelectContextProvider] =
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    createSafeContext<SelectContextProviderTypes<any>>();
