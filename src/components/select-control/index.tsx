import React, { ComponentPropsWithRef, forwardRef } from 'react';
import {
    Image,
    ImageStyle,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { BORDER_WIDTH, COLORS, FONT_SIZE, PADDING, SHAPE } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { Select } from '../../index';
import { Action, DispatchType, Position, State } from '../../state/types';
import type { OnPressSelectControlType } from '../../types';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'selectControlStyle'
    | 'clearable'
    | 'options'
    | 'disabled'
    | 'placeholderText'
    | 'selectControlDisabledStyle'
    | 'selectControlButtonsContainerStyle'
    | 'hideSelectControlArrow'
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
        Pick<State, 'isOpened' | 'selectedOption'> & { dispatch: DispatchType } & Pick<
            Position,
            'aboveSelectControl'
        >
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
            placeholderText,
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
                dispatch({
                    type: Action.SetOptionsData,
                    payload: options,
                });
                if (onSelect) {
                    onSelect(null);
                }
            }
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
                <View style={styles.press}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.text,
                            { color: selectedOption?.label ? COLORS.BLACK : COLORS.GRAY },
                            selectControlTextStyle,
                        ]}>
                        {selectedOption?.label || placeholderText}
                    </Text>
                </View>
                <View style={[styles.iconsContainer, selectControlButtonsContainerStyle]}>
                    {clearable && selectedOption && (
                        <TouchableOpacity
                            accessibilityLabel={
                                selectControlClearOptionA11yLabel || 'Clear a chosen option'
                            }
                            disabled={disabled}
                            hitSlop={
                                selectControlClearOptionButtonHitSlop
                                    ? selectControlClearOptionButtonHitSlop
                                    : { right: 3, left: 3 }
                            }
                            onPress={onPressRemove}
                            style={[styles.xIconWrapper, selectControlClearOptionButtonStyle]}>
                            <Image
                                source={require('./../../assets/icons/x.png')}
                                style={[styles.xIcon, selectControlClearOptionImageStyle]}
                            />
                        </TouchableOpacity>
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
    text: TextStyle;
    opened: ViewStyle;
    openedAbove: ViewStyle;
    disabled: ViewStyle;
    iconsContainer: ViewStyle;
    arrowIcon: ImageStyle;
    arrowIconOpened: ImageStyle;
    arrowIconClosed: ImageStyle;
    xIcon: ImageStyle;
    xIconWrapper: ViewStyle;
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
        paddingHorizontal: PADDING,
        justifyContent: 'center',
        paddingRight: 55,
    },
    disabled: {
        backgroundColor: COLORS.DISABLED,
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
    xIconWrapper: {
        height: '100%',
        justifyContent: 'center',
    },
    xIcon: {
        width: 20,
        height: 20,
        zIndex: 1,
    },
    arrowIconOpened: {
        transform: [{ rotate: '180deg' }],
    },
    arrowIconClosed: {
        transform: [{ rotate: '0deg' }],
    },
});
