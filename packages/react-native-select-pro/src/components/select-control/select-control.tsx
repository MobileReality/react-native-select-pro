import React, { forwardRef, Fragment } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';

import { Arrow } from '../arrow';
import { ClearOption } from '../clear-option';
import { SelectControlWrapper } from '../select-control-wrapper';
import { SelectFieldType } from '../select-field-type';

import { useSelectControl } from './select-control.hooks';
import type { SelectControlProps } from './select-control.types';

export const SelectControl = forwardRef<View, SelectControlProps>(
    (
        {
            isOpened,
            animation,
            selectedOption,
            onPressSelectControl,
            dispatch,
            clearable,
            optionsData,
            disabled,
            multiSelection,
            placeholderText,
            placeholderTextColor,
            searchPattern,
            textInputProps,
            searchValue,
            setPosition,
            selectControlClearOptionA11yLabel,
            selectControlOpenDropdownA11yLabel,
            hideSelectControlArrow,
            onRemove,
            aboveSelectControl,
            selectedOptionIndex,
            customLeftIconStyles,
            arrowIconStyles,
            clearOptionStyles,
            selectControlStyles,
        },
        ref,
    ) => {
        const {
            textStyle,
            containerStyle,
            multiSelectionOptionStyle,
            disabledStyle,
            buttonsContainerStyle,
        } = selectControlStyles ?? {};

        const { accessibilityHint, accessibilityLabel, clearOptionStatus, onPressRemove, onPress } =
            useSelectControl({
                searchValue,
                dispatch,
                multiSelection,
                selectControlOpenDropdownA11yLabel,
                isOpened,
                selectedOption,
                clearable,
                disabled,
                onRemove,
                selectedOptionIndex,
                optionsData,
                onPressSelectControl,
            });

        const clearOption = (
            <ClearOption
                {...{
                    disabled,
                    selectControlClearOptionA11yLabel,
                    clearOptionStyles,
                    onPressRemove,
                }}
            />
        );

        const { showClearOption, showClearOptionA11y } = clearOptionStatus;
        const { iconStyle, iconSource } = customLeftIconStyles ?? {};

        return (
            <Fragment>
                <SelectControlWrapper
                    {...{
                        multiSelection,
                        selectedOption,
                        accessibilityHint,
                        accessibilityLabel,
                        aboveSelectControl,
                        isOpened,
                        disabled,
                        containerStyle,
                        disabledStyle,
                        onPress,
                        ref,
                    }}
                >
                    {!!iconSource && (
                        <View style={[styles.leftIconWrapper, styles.xIconWrapper]}>
                            <Image source={iconSource} style={iconStyle} />
                        </View>
                    )}
                    <SelectFieldType
                        {...{
                            isOpened,
                            selectedOption,
                            onPressSelectControl,
                            dispatch,
                            disabled,
                            multiSelection,
                            placeholderText,
                            placeholderTextColor,
                            searchPattern,
                            textInputProps,
                            searchValue,
                            setPosition,
                            onPressRemove,
                            textStyle,
                            containerStyle,
                            multiSelectionOptionStyle,
                        }}
                    />
                    <View style={[styles.buttonsContainer, buttonsContainerStyle]}>
                        {showClearOption && clearOption}
                        {!hideSelectControlArrow && (
                            <Arrow
                                {...{
                                    isOpened,
                                    disabled,
                                    animation,
                                    multiSelection,
                                    arrowIconStyles,
                                    onPressSelectControl,
                                }}
                            />
                        )}
                    </View>
                </SelectControlWrapper>
                {showClearOptionA11y && <View style={styles.a11IconWrapper}>{clearOption}</View>}
            </Fragment>
        );
    },
);

type Styles = {
    buttonsContainer: ViewStyle;
    xIconWrapper: ViewStyle;
    leftIconWrapper: ViewStyle;
    a11IconWrapper: ViewStyle;
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
});

SelectControl.displayName = 'SelectControl';
