import type { ComponentPropsWithRef } from 'react';
import { useMemo } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { AccessibilityInfo, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BORDER_WIDTH, COLORS, FONT_SIZE, PADDING, SHAPE } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import { isAndroid, isSectionOptionsType } from '../../helpers';
import type { OptionType, Select } from '../../index';
import type { DispatchType, Position, State } from '../../state/types';
import { Action } from '../../state/types';
import type { OnPressSelectControlType, OnSetPosition } from '../../types';
import type { SelectStyles } from '../../types/styles';
import { Arrow } from '../arrow';
import { ClearOption } from '../clear-option';
import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'clearable'
    | 'animation'
    | 'disabled'
    | 'searchable'
    | 'searchPattern'
    | 'textInputProps'
    | 'placeholderText'
    | 'placeholderTextColor'
    | 'hideSelectControlArrow'
    | 'multiSelection'
    | 'onRemove'
    | 'selectControlClearOptionA11yLabel'
    | 'selectControlOpenDropdownA11yLabel'
> &
    Pick<State, 'optionsData'>;

type SelectControlProps = OptionalToRequired<
    {
        onPressSelectControl: OnPressSelectControlType;
    } & FromSelectComponentProps &
        Pick<State, 'isOpened' | 'selectedOption' | 'searchValue' | 'selectedOptionIndex'> & {
            dispatch: DispatchType;
        } & Pick<Position, 'aboveSelectControl'> & {
            setPosition: OnSetPosition;
        }
> &
    Pick<
        SelectStyles,
        'arrowIconStyles' | 'clearOptionStyles' | 'customLeftIconStyles' | 'selectControlStyles'
    >;

export const SelectControl = forwardRef<View, SelectControlProps>(
    // TODO
    // eslint-disable-next-line complexity
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

        const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

        useEffect(() => {
            if (!isAndroid) {
                AccessibilityInfo.isScreenReaderEnabled()
                    .then((e) => {
                        setIsScreenReaderEnabled(e);
                    }) // eslint-disable-next-line no-console
                    .catch(() => console.error('isScreenReaderEnabled error'));
                AccessibilityInfo.addEventListener('change', (e) => {
                    setIsScreenReaderEnabled(e);
                });
            }
        }, []);

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

        const renderMultiselect = () => {
            return (
                <MultiSelect
                    disabled={disabled}
                    dispatch={dispatch}
                    isOpened={isOpened}
                    multiSelection={multiSelection}
                    placeholderText={placeholderText}
                    placeholderTextColor={placeholderTextColor}
                    searchPattern={searchPattern}
                    textInputProps={textInputProps}
                    searchValue={searchValue}
                    searchable={searchable}
                    containerStyle={containerStyle}
                    textStyle={textStyle}
                    multiSelectionOptionStyle={multiSelectionOptionStyle}
                    selectedOption={selectedOption as OptionType[]}
                    setPosition={setPosition}
                    onPressRemove={onPressRemove}
                    onPressSelectControl={onPressSelectControl}
                />
            );
        };

        const renderSelection = () => {
            if (searchable) {
                return (
                    <SelectInput
                        disabled={disabled}
                        dispatch={dispatch}
                        isOpened={isOpened}
                        multiSelection={multiSelection}
                        placeholderText={placeholderText}
                        placeholderTextColor={placeholderTextColor}
                        searchPattern={searchPattern}
                        textInputProps={textInputProps}
                        searchValue={searchValue}
                        textStyle={textStyle}
                        selectedOption={selectedOption}
                        setPosition={setPosition}
                        onPressSelectControl={onPressSelectControl}
                    />
                );
            }

            const selectedOptionTyped = selectedOption as OptionType; // for proper typing
            return (
                <Text
                    numberOfLines={1}
                    style={[
                        styles.text,
                        textStyle,
                        {
                            color: selectedOptionTyped?.label
                                ? StyleSheet.flatten(textStyle)?.color ?? COLORS.BLACK
                                : placeholderTextColor,
                        },
                    ]}
                >
                    {selectedOptionTyped?.label || placeholderText}
                </Text>
            );
        };

        const resolveAccessibilityHint = () => {
            if (!selectedOption) {
                return;
            }
            if (!multiSelection) {
                const selectedOptionTyped = selectedOption as OptionType; // for proper typing
                return `Current selected item is ${selectedOptionTyped?.label}`;
            }
            return 'You have selected multiple items';
        };

        const handleOnPress = () => {
            if (disabled || (multiSelection && selectedOption)) {
                return;
            }
            onPressSelectControl();
        };

        const Component = useMemo(
            () => (multiSelection && selectedOption ? View : Pressable),
            [multiSelection, selectedOption],
        );

        const isShowClearOptionButton = clearable && selectedOption && !isScreenReaderEnabled;
        const isShowClearOptionButtonA11y =
            clearable && selectedOption && isScreenReaderEnabled && !isAndroid;
        const shouldRenderClearButton = isShowClearOptionButton && !multiSelection;
        const shouldRenderClearButtonA11y = isShowClearOptionButtonA11y && !multiSelection;
        const { iconStyle, iconSource } = customLeftIconStyles ?? {};

        return (
            <View style={styles.rootView}>
                <Component
                    ref={ref}
                    accessibilityHint={resolveAccessibilityHint()}
                    accessibilityLabel={
                        isOpened ? '' : selectControlOpenDropdownA11yLabel ?? 'Open a dropdown'
                    }
                    style={[
                        styles.container,
                        isOpened ? (aboveSelectControl ? styles.openedAbove : styles.opened) : {},
                        containerStyle,
                        disabled ? [styles.disabled, disabledStyle] : {},
                    ]}
                    onPress={handleOnPress}
                >
                    {!!iconSource && (
                        <View style={[styles.leftIconWrapper, styles.xIconWrapper]}>
                            <Image source={iconSource} style={iconStyle} />
                        </View>
                    )}
                    <View
                        style={[
                            styles.press,
                            multiSelection ? styles.pressMultiSelection : styles.pressNormal,
                        ]}
                    >
                        {multiSelection ? renderMultiselect() : renderSelection()}
                    </View>
                    <View style={[styles.iconsContainer, buttonsContainerStyle]}>
                        {shouldRenderClearButton && (
                            <ClearOption
                                disabled={disabled}
                                selectControlClearOptionA11yLabel={
                                    selectControlClearOptionA11yLabel
                                }
                                clearOptionStyles={clearOptionStyles}
                                onPressRemove={onPressRemove}
                            />
                        )}
                        {!hideSelectControlArrow && (
                            <Arrow
                                isOpened={isOpened}
                                disabled={disabled}
                                animation={animation}
                                multiSelection={multiSelection}
                                arrowIconStyles={arrowIconStyles}
                                onPressSelectControl={onPressSelectControl}
                            />
                        )}
                    </View>
                </Component>
                {shouldRenderClearButtonA11y && (
                    <View style={styles.a11IconWrapper}>
                        <ClearOption
                            disabled={disabled}
                            selectControlClearOptionA11yLabel={selectControlClearOptionA11yLabel}
                            clearOptionStyles={clearOptionStyles}
                            onPressRemove={onPressRemove}
                        />
                    </View>
                )}
            </View>
        );
    },
);

type Styles = {
    rootView: ViewStyle;
    container: ViewStyle;
    press: ViewStyle;
    pressMultiSelection: ViewStyle;
    pressNormal: ViewStyle;
    text: TextStyle;
    opened: ViewStyle;
    openedAbove: ViewStyle;
    disabled: ViewStyle;
    iconsContainer: ViewStyle;
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
    press: {
        flex: 1,
        height: '100%',
        paddingHorizontal: PADDING,
        justifyContent: 'center',
    },
    pressMultiSelection: {
        paddingRight: 40,
    },
    pressNormal: {
        paddingRight: 55,
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
    iconsContainer: {
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
