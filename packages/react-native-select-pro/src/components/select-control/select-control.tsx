import React, { forwardRef } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { BORDER_WIDTH, COLORS, SHAPE } from '../../constants';
import { useSelectContext } from '../../context';
import { Arrow } from '../arrow';
import { ClearOption } from '../clear-option';
import { SelectFieldType } from '../select-field-type';

import { useSelectControl } from './select-control.hooks';

export const SelectControl = forwardRef<View>((_, ref) => {
    const {
        hideArrow,
        selectContainerProps,
        selectLeftIconsProps,
        selectLeftIconImageProps,
        selectRightIconsProps,
        styles: mainStyles,
        isOpened,
        aboveSelectControl,
        disabled,
        onPressSelectControl,
    } = useSelectContext();

    const { accessibilityHint, accessibilityLabel, clearOptionStatus, onPressRemove } =
        useSelectControl();

    const clearOption = <ClearOption onPressRemove={onPressRemove} />;

    const { showClearOption, showClearOptionA11y } = clearOptionStatus;
    const { select: selectStyles } = mainStyles ?? {};
    const { buttons, leftIcon } = selectStyles ?? {};

    return (
        <View style={styles.rootView}>
            <Pressable
                accessibilityHint={accessibilityHint}
                {...selectContainerProps}
                ref={ref}
                accessibilityLabel={accessibilityLabel}
                style={[
                    styles.container,
                    isOpened && (aboveSelectControl ? styles.openedAbove : styles.opened),
                    selectStyles?.container,
                    disabled && [styles.disabled, selectStyles?.disabled],
                ]}
                onPress={onPressSelectControl}
            >
                {!!selectLeftIconImageProps?.source && (
                    <View
                        {...selectLeftIconsProps}
                        style={[styles.leftIconWrapper, styles.xIconWrapper]}
                    >
                        <Image {...selectLeftIconImageProps} style={leftIcon} />
                    </View>
                )}
                <SelectFieldType
                    {...{
                        onPressRemove,
                        selectStyles,
                    }}
                />
                <View {...selectRightIconsProps} style={[styles.buttonsContainer, buttons]}>
                    {showClearOption && clearOption}
                    {!hideArrow && <Arrow />}
                </View>
            </Pressable>
            {showClearOptionA11y && <View style={styles.a11IconWrapper}>{clearOption}</View>}
        </View>
    );
});

type Styles = {
    buttonsContainer: ViewStyle;
    xIconWrapper: ViewStyle;
    leftIconWrapper: ViewStyle;
    a11IconWrapper: ViewStyle;
    rootView: ViewStyle;
    container: ViewStyle;
    disabled: ViewStyle;
    openedAbove: ViewStyle;
    opened: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    buttonsContainer: {
        position: 'absolute',
        right: 8,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '100%',
    },
    leftIconWrapper: {
        paddingLeft: 8,
    },
    xIconWrapper: {
        height: '100%',
        justifyContent: 'center',
    },
    a11IconWrapper: {
        position: 'absolute',
        right: -20,
        borderWidth: 1,
        height: '100%',
    },
    rootView: {
        position: 'relative',
        width: '100%',
    },
    container: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        borderRadius: SHAPE,
        borderWidth: BORDER_WIDTH,
        backgroundColor: COLORS.WHITE,
    },
    disabled: {
        backgroundColor: COLORS.DISABLED,
    },
    openedAbove: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    opened: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
});

SelectControl.displayName = 'SelectControl';
