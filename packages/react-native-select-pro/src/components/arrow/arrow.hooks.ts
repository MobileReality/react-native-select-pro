import { useSelectContext } from '../../context';
import { useAnimation } from '../../hooks';

export const useArrow = () => {
    const {
        isOpened,
        styles: mainStyles,
        animation,
        arrowImageProps,
        arrowContainerProps,
    } = useSelectContext();

    const { arrow: arrowStyles } = mainStyles?.select ?? {};
    const { icon: iconCustomStyles, container: containerCustomStyles } = arrowStyles ?? {};

    const rotateAnimation = useAnimation({ isOpened, animation });

    return {
        arrowImageProps,
        arrowContainerProps,
        rotateAnimation,
        iconCustomStyles,
        containerCustomStyles,
        isOpened,
    };
};
