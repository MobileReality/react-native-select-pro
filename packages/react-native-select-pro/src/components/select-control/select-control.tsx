import React, { forwardRef } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { BORDER_WIDTH, COLORS, PADDING, SHAPE } from '../../constants';
import { Arrow } from '../arrow';
import { ClearOption } from '../clear-option';
import { MultiSelectedSeparatedOptions } from '../multi-selected-separated-options/multi-selected-separated-options';
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
        separatedMultiple,
        widthThreshold,
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
                    <View {...selectLeftIconsProps} style={styles.leftIconWrapper}>
                        <Image
                            {...selectLeftIconImageProps}
                            style={[styles.leftIcon, leftIconStyles]}
                        />
                    </View>
                )}
                <SelectFieldType
                    separatedMultiple={separatedMultiple}
                    widthThreshold={widthThreshold}
                />
                <View {...selectRightIconsProps} style={[styles.buttonsContainer, buttonsStyles]}>
                    {showClearOption && clearOption}
                    {!hideArrow && <Arrow />}
                </View>
            </Pressable>
            {showClearOptionA11y && <View style={styles.a11IconWrapper}>{clearOption}</View>}
            {separatedMultiple && multiple && (
                <MultiSelectedSeparatedOptions containerStyles={containerStyles} />
            )}
        </View>
    );
});

type Styles = {
    buttonsContainer: ViewStyle;
    leftIconWrapper: ViewStyle;
    leftIcon: ImageStyle;
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
        height: '100%',
        justifyContent: 'center',
    },
    leftIcon: {
        marginRight: 8,
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
