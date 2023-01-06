import { useSelectContext } from '../../context';

export const useClearOption = () => {
    const {
        styles: mainStyles,
        disabled,
        clearOptionButtonProps,
        clearOptionImageProps,
    } = useSelectContext();

    const { clear } = mainStyles?.select ?? {};
    const { icon: iconCustomStyles, container: containerCustomStyles } = clear ?? {};

    return {
        disabled,
        clearOptionButtonProps,
        clearOptionImageProps,
        iconCustomStyles,
        containerCustomStyles,
    };
};
