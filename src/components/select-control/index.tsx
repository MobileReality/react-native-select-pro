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
} from 'react-native';

import { BORDER_WIDTH, COLORS, FONT_SIZE, PADDING, SHAPE } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import { isAndroid } from '../../helpers/isAndroid';
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
    | 'selectControlDisabledStyle'
    | 'selectControlButtonsContainerStyle'
    | 'hideSelectControlArrow'
    | 'multiSelection'
    | 'onSelect'
    | 'selectControlClearOptionA11yLabel'
    | 'selectControlOpenDropdownA11yLabel'
    | 'selectControlTextStyle'
    | 'selectControlClearOptionButtonStyle'
    | 'selectControlClearOptionButtonHitSlop'
    | 'selectControlClearOptionImageStyle'
    | 'customLeftIconSource'
    | 'customLeftIconStyles'
>;

type SelectControlProps = OptionalToRequired<
    {
        onPressSelectControl: OnPressSelectControlType;
    } & FromSelectComponentProps &
        Pick<State, 'isOpened' | 'selectedOption' | 'searchValue'> & {
            dispatch: DispatchType;
        } & Pick<Position, 'aboveSelectControl'> & { setPosition: OnSetPosition }
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
            searchable,
            searchPattern,
            searchValue,
            setPosition,
            selectControlDisabledStyle,
            selectControlClearOptionButtonHitSlop,
            selectControlClearOptionButtonStyle,
            selectControlClearOptionImageStyle,
            selectControlClearOptionA11yLabel,
            selectControlOpenDropdownA11yLabel,
            selectControlButtonsContainerStyle,
            hideSelectControlArrow,
            onSelect,
            selectControlTextStyle,
            aboveSelectControl,
            customLeftIconSource,
            customLeftIconStyles,
        },
        ref,
    ) => {
        const selectedOptionTyped = selectedOption as OptionType; // for proper typing
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

        const onPressRemove = () => {
            if (!disabled) {
                dispatch({
                    type: Action.SelectOption,
                    payload: null,
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
                    onSelect(null);
                }
            }
        };

        const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

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

        const isShowClearOptionButton = clearable && selectedOption && !isScreenReaderEnabled;
        const isShowClearOptionButtonA11y =
            clearable && selectedOption && isScreenReaderEnabled && !isAndroid;

        const renderArrowImage = (): ReactElement =>
            animated ? (
                <Animated.Image
                    source={arrowImage}
                    style={[styles.arrowIcon, { transform: [{ rotate }] }]}
                />
            ) : (
                <Image
                    source={arrowImage}
                    style={[
                        styles.arrowIcon,
                        isOpened ? styles.arrowIconOpened : styles.arrowIconClosed,
                    ]}
                />
            );

        const renderMultiselect = () => {
            return (
                <MultiSelect
                    placeholderText={placeholderText}
                    selectControlTextStyle={selectControlTextStyle}
                    selectedOption={selectedOption}
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
                        onPressSelectControl={onPressSelectControl}
                        placeholderText={placeholderText}
                        searchPattern={searchPattern}
                        searchValue={searchValue}
                        setPosition={setPosition}
                    />
                );
            }
            return (
                <Text
                    numberOfLines={1}
                    style={[
                        styles.text,
                        { color: selectedOptionTyped?.label ? COLORS.BLACK : COLORS.GRAY },
                        selectControlTextStyle,
                    ]}>
                    {selectedOptionTyped?.label || placeholderText}
                </Text>
            );
        };

        return (
            <View style={styles.rootView}>
                <Pressable
                    accessibilityHint={
                        selectedOptionTyped?.label
                            ? `Current selected item is ${selectedOptionTyped?.label}`
                            : undefined
                    }
                    accessibilityLabel={
                        isOpened ? '' : selectControlOpenDropdownA11yLabel || 'Open a dropdown'
                    }
                    onPress={disabled ? undefined : onPressSelectControl}
                    ref={ref}
                    style={[
                        styles.container,
                        isOpened ? (aboveSelectControl ? styles.openedAbove : styles.opened) : {},
                        selectControlStyle,
                        disabled ? [styles.disabled, selectControlDisabledStyle] : {},
                    ]}>
                    {!!customLeftIconSource && (
                        <View style={[styles.leftIconWrapper, styles.xIconWrapper]}>
                            <Image source={customLeftIconSource} style={customLeftIconStyles} />
                        </View>
                    )}
                    <View style={styles.press}>
                        {multiSelection ? renderMultiselect() : renderSelection()}
                    </View>
                    <View style={[styles.iconsContainer, selectControlButtonsContainerStyle]}>
                        {isShowClearOptionButton && (
                            <ClearOption
                                disabled={disabled}
                                onPressRemove={onPressRemove}
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
                            />
                        )}
                        {!hideSelectControlArrow && renderArrowImage()}
                    </View>
                </Pressable>
                {isShowClearOptionButtonA11y && (
                    <View style={styles.a11IconWrapper}>
                        <ClearOption
                            disabled={disabled}
                            onPressRemove={onPressRemove}
                            selectControlClearOptionA11yLabel={selectControlClearOptionA11yLabel}
                            selectControlClearOptionButtonHitSlop={
                                selectControlClearOptionButtonHitSlop
                            }
                            selectControlClearOptionButtonStyle={
                                selectControlClearOptionButtonStyle
                            }
                            selectControlClearOptionImageStyle={selectControlClearOptionImageStyle}
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
