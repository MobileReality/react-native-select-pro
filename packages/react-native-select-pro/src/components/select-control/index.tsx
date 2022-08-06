import React, {
    ComponentPropsWithRef,
    forwardRef,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    AccessibilityInfo,
    Animated,
    Image,
    ImageStyle,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
    TextInputProps,
} from 'react-native';

import {
    BORDER_WIDTH,
    COLORS,
    FONT_SIZE,
    PADDING,
    SHAPE,
} from '../../constants/styles';
import { isAndroid } from '../../helpers';
import type { OptionalToRequired } from '../../helpers/types/OptionalToRequired';
import type { OptionType, Select } from '../../index';
import { Action, DispatchType, Position, State } from '../../state/types';
import type { OnPressSelectControlType, OnSetPosition } from '../../types';
import { ClearOption } from '../clear-option';
import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'selectControlStyle'
    | 'clearable'
    | 'animated'
    | 'animationDuration'
    | 'options'
    | 'disabled'
    | 'searchable'
    | 'searchPattern'
    | 'placeholderText'
    | 'placeholderTextColor'
    | 'selectControlDisabledStyle'
    | 'selectControlButtonsContainerStyle'
    | 'hideSelectControlArrow'
    | 'multiSelection'
    | 'onSelect'
    | 'selectControlArrowImageStyle'
    | 'selectControlClearOptionA11yLabel'
    | 'selectControlOpenDropdownA11yLabel'
    | 'selectControlTextStyle'
    | 'selectControlClearOptionButtonStyle'
    | 'selectControlClearOptionButtonHitSlop'
    | 'selectControlClearOptionImageStyle'
    | 'customLeftIconSource'
    | 'customLeftIconStyles'
    | 'multiSelectionOptionStyle'
>;

type SelectControlProps = OptionalToRequired<
    {
        onPressSelectControl: OnPressSelectControlType;
    } & FromSelectComponentProps &
        Pick<
            State,
            | 'isOpened'
            | 'selectedOption'
            | 'searchValue'
            | 'selectedOptionIndex'
        > & {
            dispatch: DispatchType;
        } & Pick<Position, 'aboveSelectControl'> & {
            setPosition: OnSetPosition;
        } & {inputProps?: TextInputProps}
>;

const arrowImage = require('./../../assets/icons/chevron-down.png');

export const SelectControl = forwardRef<View, SelectControlProps>(
    (
        {
            isOpened,
            animated,
            animationDuration,
            selectControlStyle,
            selectedOption,
            onPressSelectControl,
            dispatch,
            clearable,
            options,
            disabled,
            multiSelection,
            placeholderText,
            placeholderTextColor,
            searchable,
            searchPattern,
            searchValue,
            setPosition,
            selectControlArrowImageStyle,
            selectControlDisabledStyle,
            selectControlClearOptionButtonHitSlop,
            selectControlClearOptionButtonStyle,
            selectControlClearOptionImageStyle,
            selectControlClearOptionA11yLabel,
            selectControlOpenDropdownA11yLabel,
            selectControlButtonsContainerStyle,
            multiSelectionOptionStyle,
            hideSelectControlArrow,
            onSelect,
            selectControlTextStyle,
            aboveSelectControl,
            customLeftIconSource,
            customLeftIconStyles,
            selectedOptionIndex,
            inputProps,
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
        }, [rotateAnimation, isOpened, animated]);

        const rotate = rotateAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });

        const onPressRemove = (option: OptionType | null = null) => {
            if (!disabled) {
                if (multiSelection) {
                    let removedSelectedOptions: null | OptionType[] = [];
                    removedSelectedOptions = (
                        selectedOption as OptionType[]
                    ).filter(
                        (selected) =>
                            selected.value !== (option as OptionType).value,
                    );
                    if (removedSelectedOptions.length === 0) {
                        removedSelectedOptions = null;
                    }

                    const foundIndex = options.findIndex(
                        ({ value }) => value === option?.value,
                    );

                    const resolveSelectedOptionIndex = (
                        selectedOptionIndex as number[]
                    ).filter((item) => item !== foundIndex);

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
                    dispatch({
                        type: Action.SetOptionsData,
                        payload: options,
                    });
                    if (onSelect) {
                        onSelect(null, -1);
                    }
                }
            }
        };

        const [isScreenReaderEnabled, setIsScreenReaderEnabled] =
            useState(false);

        useEffect(() => {
            if (!isAndroid) {
                AccessibilityInfo.isScreenReaderEnabled().then((e) => {
                    setIsScreenReaderEnabled(e);
                });
                AccessibilityInfo.addEventListener('change', (e) => {
                    setIsScreenReaderEnabled(e);
                });
            }
        }, []);

        const isShowClearOptionButton =
            clearable && selectedOption && !isScreenReaderEnabled;
        const isShowClearOptionButtonA11y =
            clearable && selectedOption && isScreenReaderEnabled && !isAndroid;

        const renderArrowImage = (): ReactElement => {
            const accessibilityLabel = 'Arrow for opening dropdown';
            const arrow: ReactElement = animated ? (
                <Animated.Image
                    source={arrowImage}
                    style={[
                        styles.arrowIcon,
                        { transform: [{ rotate }] },
                        selectControlArrowImageStyle,
                    ]}
                />
            ) : (
                <Image
                    source={arrowImage}
                    style={[
                        styles.arrowIcon,
                        isOpened
                            ? styles.arrowIconOpened
                            : styles.arrowIconClosed,
                        selectControlArrowImageStyle,
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
                    searchValue={searchValue}
                    searchable={searchable}
                    selectControlStyle={selectControlStyle}
                    selectControlTextStyle={selectControlTextStyle}
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
                        searchValue={searchValue}
                        selectControlTextStyle={selectControlTextStyle}
                        selectedOption={selectedOption}
                        setPosition={setPosition}
                        onPressSelectControl={onPressSelectControl}
                        inputProps={inputProps}
                    />
                );
            }
            return (
                <Text
                    numberOfLines={1}
                    style={[
                        styles.text,
                        selectControlTextStyle,
                        {
                            color: selectedOptionTyped?.label
                                ? StyleSheet.flatten(selectControlTextStyle)
                                      ?.color || COLORS.BLACK
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
                return undefined;
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

        const shouldRenderClearButton =
            isShowClearOptionButton && !multiSelection;
        const shouldRenderClearButtonA11y =
            isShowClearOptionButtonA11y && !multiSelection;

        return (
            <View style={styles.rootView}>
                <Component
                    ref={ref}
                    accessibilityHint={resolveAccessibilityHint()}
                    accessibilityLabel={
                        isOpened
                            ? ''
                            : selectControlOpenDropdownA11yLabel ||
                              'Open a dropdown'
                    }
                    style={[
                        styles.container,
                        isOpened
                            ? aboveSelectControl
                                ? styles.openedAbove
                                : styles.opened
                            : {},
                        selectControlStyle,
                        disabled
                            ? [styles.disabled, selectControlDisabledStyle]
                            : {},
                    ]}
                    onPress={
                        disabled || (multiSelection && selectedOption)
                            ? undefined
                            : onPressSelectControl
                    }
                >
                    {!!customLeftIconSource && (
                        <View
                            style={[
                                styles.leftIconWrapper,
                                styles.xIconWrapper,
                            ]}
                        >
                            <Image
                                source={customLeftIconSource}
                                style={customLeftIconStyles}
                            />
                        </View>
                    )}
                    <View
                        style={[
                            styles.press,
                            multiSelection
                                ? styles.pressMultiSelection
                                : styles.pressNormal,
                        ]}
                    >
                        {multiSelection
                            ? renderMultiselect()
                            : renderSelection()}
                    </View>
                    <View
                        style={[
                            styles.iconsContainer,
                            selectControlButtonsContainerStyle,
                        ]}
                    >
                        {shouldRenderClearButton && (
                            <ClearOption
                                disabled={disabled}
                                selectControlClearOptionA11yLabel={
                                    selectControlClearOptionA11yLabel
                                }
                                selectControlClearOptionButtonHitSlop={
                                    selectControlClearOptionButtonHitSlop
                                }
                                selectControlClearOptionButtonStyle={
                                    selectControlClearOptionButtonStyle
                                }
                                selectControlClearOptionImageStyle={
                                    selectControlClearOptionImageStyle
                                }
                                onPressRemove={onPressRemove}
                            />
                        )}
                        {!hideSelectControlArrow && renderArrowImage()}
                    </View>
                </Component>
                {shouldRenderClearButtonA11y && (
                    <View style={styles.a11IconWrapper}>
                        <ClearOption
                            disabled={disabled}
                            selectControlClearOptionA11yLabel={
                                selectControlClearOptionA11yLabel
                            }
                            selectControlClearOptionButtonHitSlop={
                                selectControlClearOptionButtonHitSlop
                            }
                            selectControlClearOptionButtonStyle={
                                selectControlClearOptionButtonStyle
                            }
                            selectControlClearOptionImageStyle={
                                selectControlClearOptionImageStyle
                            }
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
