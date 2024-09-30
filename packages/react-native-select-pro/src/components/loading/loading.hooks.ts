import { useOptionsListContext } from '../../context';

export const useLoading = () => {
    const {
        loadingText,
        loadingProps,
        loadingTextProps,
        styles: mainStyles,
    } = useOptionsListContext();

    const { noOptions } = mainStyles ?? {};
    const { text: textCustomStyles, container: containerCustomStyles } = noOptions ?? {};

    return {
        loadingText,
        loadingProps,
        loadingTextProps,
        textCustomStyles,
        containerCustomStyles,
    };
};
