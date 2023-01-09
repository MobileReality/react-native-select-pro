import { useSelectContext } from '../../context';

export const useSelectText = () => {
    const {
        placeholderText,
        placeholderTextColor,
        selectTextProps,
        multiple,
        styles: mainStyles,
    } = useSelectContext();

    const { select } = mainStyles ?? {};
    const { text: textCustomStyles } = select ?? {};

    return {
        placeholderText,
        placeholderTextColor,
        selectTextProps,
        multiple,
        textCustomStyles,
    };
};
