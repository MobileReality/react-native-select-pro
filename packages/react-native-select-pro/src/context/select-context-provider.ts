import type {
    OnPressSelectControlType,
    SelectProps,
} from '@mobile-reality/react-native-select-pro';

import { createSafeContext } from '../helpers';
import type { DispatchType, Position, State } from '../state/types';

type SelectContextProviderTypes = {
    aboveSelectControl: Position['aboveSelectControl'];
} & Pick<
    SelectProps,
    | 'arrowIconStyles'
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
    | 'clearOptionStyles'
    | 'onRemove'
    | 'customLeftIconStyles'
    | 'selectControlStyles'
> &
    Pick<
        State,
        'optionsData' | 'searchValue' | 'selectedOption' | 'selectedOptionIndex' | 'isOpened'
    > & {
        onPressSelectControl: OnPressSelectControlType;
        dispatch: DispatchType;
        setPosition: () => void;
    };

const [useSelectContext, SelectContextProvider] = createSafeContext<SelectContextProviderTypes>();

export { SelectContextProvider, useSelectContext };
