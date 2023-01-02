import type { ForwardedRef } from 'react';
import React, { forwardRef } from 'react';
import type { ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { BORDER_WIDTH, COLORS, SHAPE } from '../../constants';
import { useSelectContext } from '../../context';

import type { SelectControlWrapperProps } from './select-control-wrapper.types';

export const SelectControlWrapper = forwardRef(
    (
        {
            accessibilityHint,
            accessibilityLabel,
            children,
            selectStyles,
        }: SelectControlWrapperProps,
        ref: ForwardedRef<View>,
    ) => {
        const { isOpened, disabled, aboveSelectControl, onPressSelectControl } = useSelectContext();

        return (
            <View style={styles.rootView}>
                <Pressable
                    ref={ref}
                    accessibilityHint={accessibilityHint}
                    accessibilityLabel={accessibilityLabel}
                    style={[
                        styles.container,
                        isOpened && (aboveSelectControl ? styles.openedAbove : styles.opened),
                        selectStyles,
                        disabled && [styles.disabled, selectStyles?.disabled],
                    ]}
                    onPress={onPressSelectControl}
                >
                    {children}
                </Pressable>
            </View>
        );
    },
);

type Styles = {
    rootView: ViewStyle;
    container: ViewStyle;
    disabled: ViewStyle;
    openedAbove: ViewStyle;
    opened: ViewStyle;
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
    openedAbove: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    opened: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
});

SelectControlWrapper.displayName = 'SelectControlWrapper';
