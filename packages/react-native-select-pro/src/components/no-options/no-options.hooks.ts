import { useOptionsListContext } from '../../context';

export const useNoOptions = () => {
    const {
        noOptionsText,
        noOptionsProps,
        noOptionsTextProps,
        styles: mainStyles,
    } = useOptionsListContext();

    const { noOptions } = mainStyles ?? {};
    const { text: textCustomStyles, container: containerCustomStyles } = noOptions ?? {};

    return {
        noOptionsText,
        noOptionsProps,
        noOptionsTextProps,
        textCustomStyles,
        containerCustomStyles,
    };
};
