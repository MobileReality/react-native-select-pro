import { useOptionsListContext } from '../../context';

export const useSectionHeader = () => {
    const {
        styles,
        onPressSection,
        sectionHeaderButtonProps,
        sectionHeaderTextProps,
        sectionHeaderImageProps,
        multiple,
        disabled,
    } = useOptionsListContext();

    const { sectionHeader: sectionHeaderCustomStyles } = styles ?? {};

    const isDisabled = disabled ?? !multiple;

    return {
        onPressSection,
        sectionHeaderButtonProps,
        sectionHeaderTextProps,
        sectionHeaderImageProps,
        multiple,
        disabled,
        sectionHeaderCustomStyles,
        isDisabled,
    };
};
