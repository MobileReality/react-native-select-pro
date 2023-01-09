import { useSelectContext } from '../../context';
import { selectedOptionResolver } from '../../helpers';

export const useSelectFieldType = () => {
    const { multiple, searchValue, selectedOption } = useSelectContext();

    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);

    const isSearchable = typeof searchValue === 'string';

    return {
        multiple,
        searchValue,
        selectedOptionLabel,
        selectedOptions,
        isSearchable,
    };
};
