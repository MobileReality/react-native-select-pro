import { useMemo } from 'react';

import { useSelectContext } from '../../context';
import { isAndroid, selectedOptionResolver } from '../../helpers';
import { useAccessibilityScreenReader } from '../../hooks';

export const useSelectControl = () => {
    const {
        isOpened,
        clearable,
        disabled,
        multiple,
        selectedOption,
        selectContainerProps,
        hideArrow,
        selectLeftIconsProps,
        selectLeftIconImageProps,
        selectRightIconsProps,
        styles,
        aboveSelectControl,
        onPressSelectControl,
    } = useSelectContext();

    const { selectedOptionLabel } = selectedOptionResolver(selectedOption);

    const isScreenReaderEnabled = useAccessibilityScreenReader();

    const accessibilityHint = useMemo(() => {
        if (!selectedOptionLabel) {
            return;
        }
        if (!multiple) {
            return `Current selected item is ${selectedOptionLabel}`;
        }
        return 'You have selected multiple items';
    }, [selectedOptionLabel, multiple]);

    const accessibilityLabel = useMemo(
        () => (isOpened ? '' : selectContainerProps?.accessibilityLabel ?? 'Open a dropdown'),
        [isOpened, selectContainerProps?.accessibilityLabel],
    );

    const clearOptionStatus = useMemo(() => {
        const result = { showClearOption: false, showClearOptionA11y: false };

        if (!multiple && clearable && selectedOption) {
            if (!isScreenReaderEnabled) {
                result.showClearOption = true;
            } else if (!isAndroid) {
                result.showClearOptionA11y = true;
            }
        }
        return result;
    }, [clearable, isScreenReaderEnabled, multiple, selectedOption]);

    const { showClearOption, showClearOptionA11y } = clearOptionStatus;

    const { select: selectStyles } = styles ?? {};
    const {
        buttons: buttonsStyles,
        leftIcon: leftIconStyles,
        container: containerStyles,
        disabled: disabledStyles,
    } = selectStyles ?? {};

    return {
        accessibilityHint,
        accessibilityLabel,
        hideArrow,
        selectLeftIconsProps,
        selectLeftIconImageProps,
        selectRightIconsProps,
        aboveSelectControl,
        onPressSelectControl,
        selectContainerProps,
        isOpened,
        disabled,
        showClearOption,
        showClearOptionA11y,
        buttonsStyles,
        leftIconStyles,
        containerStyles,
        disabledStyles,
        multiple,
    };
};
