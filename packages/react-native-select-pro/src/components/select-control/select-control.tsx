import React, { forwardRef } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { BORDER_WIDTH, COLORS, PADDING, SHAPE } from '../../constants';
import { Arrow } from '../arrow';
import { ClearOption } from '../clear-option';
import { SelectFieldType } from '../select-field-type';

import { useSelectControl } from './select-control.hooks';

export const SelectControl = forwardRef<View>((_, ref) => {
    const {
        accessibilityHint,
        accessibilityLabel,
        onPressSelectControl,
        aboveSelectControl,
        selectLeftIconImageProps,
        selectRightIconsProps,
        selectLeftIconsProps,
        hideArrow,
        selectContainerProps,
        isOpened,
        disabled,
        showClearOptionA11y,
        showClearOption,
        buttonsStyles,
        leftIconStyles,
        containerStyles,
        disabledStyles,
        multiple,
    } = useSelectControl();

    const clearOption = <ClearOption />;

    return (
        <View style={styles.rootView}>
            <Pressable
                accessibilityHint={accessibilityHint}
                disabled={disabled}
                accessibilityState={{ disabled }}
                {...selectContainerProps}
                ref={ref}
                accessibilityLabel={accessibilityLabel}
                style={[
                    styles.container,
                    multiple ? styles.multiSelect : styles.singleSelect,
                    isOpened && (aboveSelectControl ? styles.openedAbove : styles.opened),
                    containerStyles,
                    disabled && [styles.disabled, disabledStyles],
                ]}
                onPress={onPressSelectControl}
            >
                {!!selectLeftIconImageProps?.source && (
                    <View
                        {...selectLeftIconsProps}
                        style={[styles.leftIconWrapper, styles.xIconWrapper]}
                    >
                        <Image {...selectLeftIconImageProps} style={leftIconStyles} />
                    </View>
                )}
                <SelectFieldType />
                <View {...selectRightIconsProps} style={[styles.buttonsContainer, buttonsStyles]}>
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
    multiSelect: ViewStyle;
    singleSelect: ViewStyle;
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
        paddingHorizontal: PADDING,
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
    multiSelect: {
        paddingRight: 40,
    },
    singleSelect: {
        paddingRight: 55,
    },
});

SelectControl.displayName = 'SelectControl';
