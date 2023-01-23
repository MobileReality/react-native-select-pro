import { useOptionsListContext } from '../../context';
import { useAnimation } from '../../hooks';

export const useOptionListWrapper = () => {
    const {
        animation,
        isOpened,
        styles,
        aboveSelectControl,
        openedPosition: { top, left, width },
    } = useOptionsListContext();

    const { optionsList: optionsListCustomStyles } = styles ?? {};

    const fadeAnimation = useAnimation({ isOpened, animation });

    return {
        animation,
        isOpened,
        fadeAnimation,
        optionsListCustomStyles,
        aboveSelectControl,
        top,
        left,
        width,
    };
};
