import { useMemo } from 'react';
import React, { forwardRef } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { BORDER_WIDTH, COLORS, FONT_SIZE, SHAPE } from '../../constants/styles';
import { isAndroid, isSectionOptionsType } from '../../helpers';
import { useAccessibilityScreenReader } from '../../hooks';
import type { OptionType } from '../../index';
import { Action } from '../../state/types';
import { Arrow } from '../arrow';
import type { ArrowProps } from '../arrow/arrow.types';
import { ClearOption } from '../clear-option';
import { SelectFieldType } from '../select-field-type';
import type { SelectFieldTypeProps } from '../select-field-type/select-field-type.types';

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
            searchable,
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

        const isScreenReaderEnabled = useAccessibilityScreenReader();

        const removeOptionInMultiSelection = (option: OptionType) => {
            const removedSelectedOptions = (selectedOption as OptionType[]).filter(
                (selected) => selected.value !== option.value,
            );
            const foundIndex = optionsData.findIndex(
                (props) => (props as OptionType).value === option?.value,
            );
            const resolveSelectedOptionIndex = (selectedOptionIndex as number[]).filter(
                (item) => item !== foundIndex,
            );

            dispatch({
                type: Action.SelectOption,
                payload: {
                    selectedOption:
                        removedSelectedOptions.length > 0 ? removedSelectedOptions : null,
                    selectedOptionIndex:
                        resolveSelectedOptionIndex?.length > 0 ? resolveSelectedOptionIndex : -1,
                },
            });

            return { index: foundIndex, option };
        };

        const removeSingleOption = () => {
            dispatch({
                type: Action.SelectOption,
                payload: {
                    selectedOption: null,
                    selectedOptionIndex: -1,
                },
            });

            if (searchable) {
                dispatch({
                    type: Action.SetSearchValue,
                    payload: '',
                });
            }
        };

        const onPressRemove = (option: OptionType | null = null) => {
            if (disabled) {
                return;
            }

            let removedOption = null;

            if (option && multiSelection && !isSectionOptionsType(optionsData)) {
                removedOption = removeOptionInMultiSelection(option);
            } else {
                removeSingleOption();
                removedOption = {
                    option: selectedOption,
                    index: selectedOptionIndex,
                };
            }

            if (onRemove) {
                onRemove(removedOption.option, removedOption.index);
            }
        };

        const onPress = () => {
            if (disabled || (multiSelection && selectedOption)) {
                return;
            }
            onPressSelectControl();
        };

        const accessibilityHint = useMemo(() => {
            if (!selectedOption) {
                return;
            }
            if (!multiSelection) {
                const selectedOptionTyped = selectedOption as OptionType; // for proper typing
                return `Current selected item is ${selectedOptionTyped?.label}`;
            }
            return 'You have selected multiple items';
        }, [selectedOption, multiSelection]);
        const accessibilityLabel = useMemo(
            () => (isOpened ? '' : selectControlOpenDropdownA11yLabel ?? 'Open a dropdown'),
            [isOpened, selectControlOpenDropdownA11yLabel],
        );

        const Component = useMemo(
            () => (multiSelection && selectedOption ? View : Pressable),
            [multiSelection, selectedOption],
        );
        const clearOption = (
            <ClearOption
                disabled={disabled}
                selectControlClearOptionA11yLabel={selectControlClearOptionA11yLabel}
                clearOptionStyles={clearOptionStyles}
                onPressRemove={onPressRemove}
            />
        );

        const selectFieldTypeProps: SelectFieldTypeProps = {
            isOpened,
            selectedOption,
            onPressSelectControl,
            dispatch,
            disabled,
            multiSelection,
            placeholderText,
            placeholderTextColor,
            searchable,
            searchPattern,
            textInputProps,
            searchValue,
            setPosition,
            onPressRemove,
            textStyle,
            containerStyle,
            multiSelectionOptionStyle,
        };
        const arrowProps: ArrowProps = {
            isOpened,
            disabled,
            animation,
            multiSelection,
            arrowIconStyles,
            onPressSelectControl,
        };

        const clearOptionStatus = useMemo(() => {
            const result = { showClearOption: false, showClearOptionA11y: false };

            if (!multiSelection && clearable && selectedOption) {
                if (!isScreenReaderEnabled) {
                    result.showClearOption = true;
                } else if (!isAndroid) {
                    result.showClearOptionA11y = true;
                }
            }
            return result;
        }, [clearable, isScreenReaderEnabled, multiSelection, selectedOption]);
        const { showClearOption, showClearOptionA11y } = clearOptionStatus;
        const { iconStyle, iconSource } = customLeftIconStyles ?? {};

        return (
            <View style={styles.rootView}>
                <Component
                    ref={ref}
                    accessibilityHint={accessibilityHint}
                    accessibilityLabel={accessibilityLabel}
                    style={[
                        styles.container,
                        isOpened ? (aboveSelectControl ? styles.openedAbove : styles.opened) : {},
                        containerStyle,
                        disabled ? [styles.disabled, disabledStyle] : {},
                    ]}
                    onPress={onPress}
                >
                    {!!iconSource && (
                        <View style={[styles.leftIconWrapper, styles.xIconWrapper]}>
                            <Image source={iconSource} style={iconStyle} />
                        </View>
                    )}
                    <SelectFieldType {...selectFieldTypeProps} />
                    <View style={[styles.buttonsContainer, buttonsContainerStyle]}>
                        {showClearOption && clearOption}
                        {!hideSelectControlArrow && <Arrow {...arrowProps} />}
                    </View>
                </Component>
                {showClearOptionA11y && <View style={styles.a11IconWrapper}>{clearOption}</View>}
            </View>
        );
    },
);

type Styles = {
    rootView: ViewStyle;
    container: ViewStyle;
    text: TextStyle;
    opened: ViewStyle;
    openedAbove: ViewStyle;
    disabled: ViewStyle;
    buttonsContainer: ViewStyle;
    xIconWrapper: ViewStyle;
    leftIconWrapper: ViewStyle;
    a11IconWrapper: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    rootView: {
        position: 'relative',
    },
    container: {
        height: 40,
        flexDirection: 'row',
        borderRadius: SHAPE,
        borderWidth: BORDER_WIDTH,
        backgroundColor: COLORS.WHITE,
    },
    disabled: {
        backgroundColor: COLORS.DISABLED,
    },
    text: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
    },
    openedAbove: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    opened: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
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
