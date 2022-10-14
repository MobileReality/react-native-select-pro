import type { ComponentPropsWithRef, ReactElement } from 'react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import {
    AccessibilityInfo,
    Animated,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { BORDER_WIDTH, COLORS, FONT_SIZE, PADDING, SHAPE } from '../../constants/styles';
import { isAndroid } from '../../helpers';
import { isSectionOptionsType } from '../../helpers/is-section-options-type';
import type { OptionalToRequired } from '../../helpers/types/optional-to-required';
import type { OptionType, Select } from '../../index';
import type { DispatchType, Position, State } from '../../state/types';
import { Action } from '../../state/types';
import type { OnPressSelectControlType, OnSetPosition } from '../../types';
import type { SelectControlStyles, SelectStyles } from '../../types/styles';
import { ClearOption } from '../clear-option';
import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';

const arrowImage = require('./../../assets/icons/chevron-down.png');

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'clearable'
    | 'animated'
    | 'animationDuration'
    | 'disabled'
    | 'searchable'
    | 'searchPattern'
    | 'textInputProps'
    | 'placeholderText'
    | 'placeholderTextColor'
    | 'hideSelectControlArrow'
    | 'multiSelection'
    | 'onSelect'
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
    SelectControlStyles &
    Pick<SelectStyles, 'arrowIconStyles' | 'clearOptionStyles' | 'customLeftIconStyles'>;

export const SelectControl = forwardRef<View, SelectControlProps>(
    // TODO
    // eslint-disable-next-line complexity
    (
        {
            isOpened,
            animated,
            animationDuration,
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
            onSelect,
            onRemove,
            aboveSelectControl,
            selectedOptionIndex,
            textStyle,
            containerStyle,
            multiSelectionOptionStyle,
            disabledStyle,
            customLeftIconStyles,
            arrowIconStyles,
            buttonsContainerStyle,
            clearOptionStyles,
        },
        ref,
    ) => {
        const rotateAnimation = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            if (animated) {
                Animated.timing(rotateAnimation, {
                    toValue: isOpened ? 1 : 0,
                    duration: animationDuration,
                    useNativeDriver: true,
                }).start();
            }
            // TODO
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [rotateAnimation, isOpened, animated]);

        const rotate = rotateAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });

        const onPressRemove = (option: OptionType | null = null) => {
            if (!disabled) {
                let removedOption = selectedOption;
                let removedOptionIndex = selectedOptionIndex;
                if (multiSelection && !isSectionOptionsType(optionsData)) {
                    let removedSelectedOptions: null | OptionType[] = [];
                    removedSelectedOptions = (selectedOption as OptionType[]).filter(
                        (selected) => selected.value !== (option as OptionType).value,
                    );
                    if (removedSelectedOptions.length === 0) {
                        removedSelectedOptions = null;
                    }
                    const foundIndex = optionsData.findIndex(
                        ({ value }) => value === option?.value,
                    );
                    removedOptionIndex = foundIndex;
                    removedOption = option;
                    const resolveSelectedOptionIndex = (selectedOptionIndex as number[]).filter(
                        (item) => item !== foundIndex,
                    );

                    dispatch({
                        type: Action.SelectOption,
                        payload: {
                            selectedOption: removedSelectedOptions,
                            selectedOptionIndex:
                                resolveSelectedOptionIndex?.length > 0
                                    ? resolveSelectedOptionIndex
                                    : -1,
                        },
                    });
                } else {
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
                }
                if (onSelect) {
                    onSelect(null, -1);
                }
                if (onRemove) {
                    onRemove(removedOption, removedOptionIndex);
                }
            }
        };

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

        const isShowClearOptionButton = clearable && selectedOption && !isScreenReaderEnabled;
        const isShowClearOptionButtonA11y =
            clearable && selectedOption && isScreenReaderEnabled && !isAndroid;

        const renderArrowImage = (): ReactElement => {
            const accessibilityLabel = 'Arrow for opening dropdown';
            const { iconSource, iconStyle } = arrowIconStyles ?? {};
            const arrowSource = iconSource ?? arrowImage;
            const arrow: ReactElement = animated ? (
                <Animated.Image
                    source={arrowSource}
                    style={[styles.arrowIcon, { transform: [{ rotate }] }, iconStyle]}
                />
            ) : (
                <Image
                    source={arrowSource}
                    style={[
                        styles.arrowIcon,
                        isOpened ? styles.arrowIconOpened : styles.arrowIconClosed,
                        iconStyle,
                    ]}
                />
            );
            if (multiSelection) {
                return (
                    <Pressable
                        accessibilityLabel={accessibilityLabel}
                        onPress={disabled ? undefined : onPressSelectControl}
                    >
                        {arrow}
                    </Pressable>
                );
            }
            return arrow;
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
            const selectedOptionTyped = selectedOption as OptionType; // for proper typing
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

        const resolveContainer = () => {
            if (multiSelection && selectedOption) {
                return { Component: View };
            }
            return { Component: Pressable };
        };

        const { Component } = resolveContainer();

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
                    onPress={
                        disabled || (multiSelection && selectedOption)
                            ? undefined
                            : onPressSelectControl
                    }
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
                                onPressRemove={onPressRemove}
                                {...clearOptionStyles}
                            />
                        )}
                        {!hideSelectControlArrow && renderArrowImage()}
                    </View>
                </Component>
                {shouldRenderClearButtonA11y && (
                    <View style={styles.a11IconWrapper}>
                        <ClearOption
                            disabled={disabled}
                            selectControlClearOptionA11yLabel={selectControlClearOptionA11yLabel}
                            onPressRemove={onPressRemove}
                            {...clearOptionStyles}
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
    arrowIcon: ImageStyle;
    arrowIconOpened: ImageStyle;
    arrowIconClosed: ImageStyle;
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
    arrowIcon: {
        width: 25,
        height: 25,
        zIndex: -1,
    },
    leftIconWrapper: {
        paddingLeft: 8,
    },
    xIconWrapper: {
        height: '100%',
        justifyContent: 'center',
    },
    arrowIconOpened: {
        transform: [{ rotate: '180deg' }],
    },
    arrowIconClosed: {
        transform: [{ rotate: '0deg' }],
    },
    a11IconWrapper: {
        position: 'absolute',
        right: -20,
        borderWidth: 1,
        height: '100%',
    },
});

SelectControl.displayName = 'SelectControl';
