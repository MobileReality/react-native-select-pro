import React, { ComponentPropsWithRef, forwardRef } from 'react';
import {
    Image,
    ImageStyle,
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
            <>
                <View
                    collapsable={false}
                    ref={ref}
                    style={[
                        styles.container,
                        isOpened ? (aboveSelectControl ? styles.openedAbove : styles.opened) : {},
                        selectControlStyle,
                        disabled ? [styles.disabled, selectControlDisabledStyle] : {},
                    ]}>
                    <TouchableOpacity
                        accessibilityLabel={
                            isOpened
                                ? selectControlCloseDropdownA11yLabel || 'Close a dropdown'
                                : selectControlOpenDropdownA11yLabel || 'Open a dropdown'
                        }
                        activeOpacity={disabled ? 1 : 0.8}
                        onPress={disabled ? undefined : onPressSelectControl}
                        style={[styles.press]}>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.text,
                                { color: selectedOption?.label ? COLORS.BLACK : COLORS.GRAY },
                                selectControlTextStyle,
                            ]}>
                            {selectedOption?.label || placeholderText}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={disabled ? undefined : onPressSelectControl}
                        style={[styles.iconsContainer, selectControlButtonsContainerStyle]}>
                        {clearable && selectedOption && (
                            <TouchableOpacity
                                accessibilityLabel={
                                    selectControlClearOptionA11yLabel || 'Clear a chosen option'
                                }
                                disabled={disabled}
                                onPress={onPressRemove}>
                                <Image
                                    source={require('./../../assets/icons/x.png')}
                                    style={styles.xIcon}
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
                    </TouchableOpacity>
                </View>
            </>
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
