import React, { forwardRef, Fragment } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';

import { useSelectContext } from '../../context';
import { Arrow } from '../arrow';
import { ClearOption } from '../clear-option';
import { SelectControlWrapper } from '../select-control-wrapper';
import { SelectFieldType } from '../select-field-type';

import { useSelectControl } from './select-control.hooks';

export const SelectControl = forwardRef<View>((_, ref) => {
    const { hideArrow, styles: mainStyles } = useSelectContext();
    const { select: selectStyles } = mainStyles ?? {};
    const { buttons, leftIcon } = selectStyles ?? {};

    const { accessibilityHint, accessibilityLabel, clearOptionStatus, onPressRemove, onPress } =
        useSelectControl();

    const clearOption = (
        <ClearOption
            {...{
                onPressRemove,
            }}
        />
    );

    const { showClearOption, showClearOptionA11y } = clearOptionStatus;

    return (
        <Fragment>
            <SelectControlWrapper
                {...{
                    accessibilityHint,
                    accessibilityLabel,
                    selectStyles,
                    onPress,
                    ref,
                }}
            >
                {!!leftIcon?.source && (
                    <View style={[styles.leftIconWrapper, styles.xIconWrapper]}>
                        <Image source={leftIcon?.source} style={leftIcon?.icon} />
                    </View>
                )}
                <SelectFieldType
                    {...{
                        onPressRemove,
                        selectStyles,
                    }}
                />
                <View style={[styles.buttonsContainer, buttons]}>
                    {showClearOption && clearOption}
                    {!hideArrow && <Arrow />}
                </View>
            </SelectControlWrapper>
            {showClearOptionA11y && <View style={styles.a11IconWrapper}>{clearOption}</View>}
        </Fragment>
    );
});

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
