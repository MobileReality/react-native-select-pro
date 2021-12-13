import React, { ComponentPropsWithRef, forwardRef } from 'react';
import {
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
import type { Select } from '../../index';
import { Action, DispatchType, Position, State } from '../../state/types';
import type { OnPressSelectControlType, OnSetPosition } from '../../types';
import { RemoveOptionButton } from '../remove-option-button';
import { SelectInput } from '../select-input';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'selectControlStyle'
    | 'clearable'
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
    | 'selectControlCloseDropdownA11yLabel'
    | 'selectControlTextStyle'
    | 'selectControlClearOptionButtonStyle'
    | 'selectControlClearOptionButtonHitSlop'
    | 'selectControlClearOptionImageStyle'
>;

type SelectControlProps = OptionalToRequired<
    {
        onPressSelectControl: OnPressSelectControlType;
    } & FromSelectComponentProps &
        Pick<State, 'isOpened' | 'selectedOption' | 'searchValue'> & {
            dispatch: DispatchType;
        } & Pick<Position, 'aboveSelectControl'> & { setPosition: OnSetPosition }
>;

export const SelectControl = forwardRef<View, SelectControlProps>(
    (
        {
            isOpened,
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
            selectControlCloseDropdownA11yLabel,
            selectControlButtonsContainerStyle,
            hideSelectControlArrow,
            onSelect,
            selectControlTextStyle,
            aboveSelectControl,
        },
        ref,
    ) => {
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

        const resolveOptions = () => {
            if (multiSelection) {
                return (
                    <View style={styles.multiSelectionWrapper}>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.text,
                                { color: selectedOption?.label ? COLORS.BLACK : COLORS.GRAY },
                                selectControlTextStyle,
                                styles.multiSelectionOption,
                            ]}>
                            {selectedOption?.label || placeholderText}
                        </Text>
                        <RemoveOptionButton
                            disabled={disabled}
                            dispatch={dispatch}
                            onSelect={onSelect}
                            options={options}
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
                );
            }
            return (
                <Text
                    numberOfLines={1}
                    style={[
                        styles.text,
                        { color: selectedOption?.label ? COLORS.BLACK : COLORS.GRAY },
                        selectControlTextStyle,
                    ]}>
                    {selectedOption?.label || placeholderText}
                </Text>
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
                        { color: selectedOption?.label ? COLORS.BLACK : COLORS.GRAY },
                        selectControlTextStyle,
                    ]}>
                    {selectedOption?.label || placeholderText}
                </Text>
            );
        };

        return (
            <Pressable
                accessibilityLabel={
                    isOpened
                        ? selectControlCloseDropdownA11yLabel || 'Close a dropdown'
                        : selectControlOpenDropdownA11yLabel || 'Open a dropdown'
                }
                onPress={disabled ? undefined : onPressSelectControl}
                ref={ref}
                style={[
                    styles.container,
                    isOpened ? (aboveSelectControl ? styles.openedAbove : styles.opened) : {},
                    selectControlStyle,
                    disabled ? [styles.disabled, selectControlDisabledStyle] : {},
                ]}>
                <View
                    style={[
                        styles.press,
                        multiSelection ? styles.pressMultiSelect : styles.pressSingleSelect,
                    ]}>
                    {multiSelection ? resolveOptions() : renderSelection()}
                </View>
                <View style={[styles.iconsContainer, selectControlButtonsContainerStyle]}>
                    {clearable && selectedOption && !multiSelection && (
                        <RemoveOptionButton
                            disabled={disabled}
                            dispatch={dispatch}
                            onSelect={onPressRemove}
                            options={options}
                            selectControlClearOptionA11yLabel={selectControlClearOptionA11yLabel}
                            selectControlClearOptionButtonHitSlop={
                                selectControlClearOptionButtonHitSlop
                            }
                            selectControlClearOptionButtonStyle={
                                selectControlClearOptionButtonStyle
                            }
                            selectControlClearOptionImageStyle={selectControlClearOptionImageStyle}
                        />
                    )}
                    {!hideSelectControlArrow && (
                        <Image
                            source={require('./../../assets/icons/chevron-down.png')}
                            style={[
                                styles.arrowIcon,
                                isOpened ? styles.arrowIconOpened : styles.arrowIconClosed,
                            ]}
                        />
                    )}
                </View>
            </Pressable>
        );
    },
);

type Styles = {
    container: ViewStyle;
    press: ViewStyle;
    pressMultiSelect: ViewStyle;
    pressSingleSelect: ViewStyle;
    text: TextStyle;
    multiSelectionOption: TextStyle;
    multiSelectionWrapper: ViewStyle;
    opened: ViewStyle;
    openedAbove: ViewStyle;
    disabled: ViewStyle;
    iconsContainer: ViewStyle;
    arrowIcon: ImageStyle;
    arrowIconOpened: ImageStyle;
    arrowIconClosed: ImageStyle;
};

const styles = StyleSheet.create<Styles>({
    container: {
        height: 40,
        borderRadius: SHAPE,
        borderWidth: BORDER_WIDTH,
        backgroundColor: COLORS.WHITE,
    },

    press: {
        width: '100%',
        height: '100%',
    },
    pressSingleSelect: {
        justifyContent: 'center',
        paddingHorizontal: PADDING,
        paddingRight: 55,
    },
    pressMultiSelect: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    disabled: {
        backgroundColor: COLORS.DISABLED,
    },
    multiSelectionOption: {
        backgroundColor: 'transparent',
        padding: 5,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    multiSelectionWrapper: {
        borderRadius: SHAPE,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.GRAY,
    },
    text: {
        fontSize: FONT_SIZE,
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
    arrowIconOpened: {
        transform: [{ rotate: '180deg' }],
    },
    arrowIconClosed: {
        transform: [{ rotate: '0deg' }],
    },
});
