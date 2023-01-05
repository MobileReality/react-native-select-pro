import type { ForwardedRef, NamedExoticComponent, ReactElement, Reducer } from 'react';
import React, { forwardRef, useReducer, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { UIManager } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Portal } from '@gorhom/portal';

import { COLORS, Portals } from '../../constants';
import { OptionsListContextProvider, SelectContextProvider } from '../../context';
import { isAndroid } from '../../helpers';
import type { ActionType, CreateInitialStateType, State } from '../../state';
import { createInitialState, reducer } from '../../state';
import type { SelectProps, SelectRef } from '../../types';
import { Backdrop } from '../backdrop';
import { OptionsList } from '../options-list';
import { SelectControl } from '../select-control';

import { useSelect } from './select.hooks';

if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const SelectComp = <T,>(props: SelectProps<T>, ref: ForwardedRef<SelectRef<T>>) => {
    const {
        // Required
        options,
        // Basic
        animation = true,
        clearable = true,
        closeOptionsListOnSelect = true,
        defaultOption,
        disabled = false,
        hasBackdrop = true,
        hideArrow = false,
        multiple = false,
        noOptionsText = 'No options',
        placeholderText = 'Select...',
        placeholderTextColor = COLORS.GRAY,
        pressableSelectedOption = true,
        scrollToSelectedOption = true,
        searchable = false,
        searchPattern = (payload: string) => `(${payload})`,
        styles: mainStyles,
        // Callbacks
        onSelectChangeText,
        onSectionSelect,
        onSectionRemove,
        onSelect,
        onSelectOpened,
        onSelectClosed,
        onRemove,
        // Customized
        arrowContainerProps,
        arrowImageProps,
        backdropChildProps,
        backdropProps,
        clearOptionButtonProps,
        clearOptionImageProps,
        flatListProps,
        noOptionsProps,
        noOptionsTextProps,
        optionButtonProps,
        optionTextProps,
        selectContainerProps,
        selectInputProps,
        selectLeftIconImageProps,
        selectLeftIconsProps,
        selectRightIconsProps,
        selectTextProps,
        sectionHeaderButtonProps,
        sectionHeaderImageProps,
        sectionHeaderTextProps,
        sectionListProps,
        // Styles
    } = props;

    const [state, dispatch] = useReducer<
        Reducer<State<T>, ActionType<T>>,
        CreateInitialStateType<T>
    >(reducer, { options, searchable, animation }, createInitialState);

    const {
        isOpened,
        selectedOption,
        optionsData,
        openedPosition,
        searchValue,
        searchedOptions,
        selectedOptionIndex,
    } = state;

    const { aboveSelectControl } = openedPosition;

    const selectControlRef = useRef<View>(null);
    const optionsListRef = useRef<View>(null);

    const {
        setOptionsListPosition,
        onPressOption,
        onOutsidePress,
        onPressSelectControl,
        onPressSection,
    } = useSelect<T>({
        selectControlRef,
        optionsListRef,
        dispatch,
        defaultOption,
        onRemove,
        disabled,
        closeOptionsListOnSelect,
        searchable,
        multiple,
        onSelectOpened,
        onSelectClosed,
        ref,
        state,
        onSectionSelect,
        onSectionRemove,
        onSelect,
    });

    return (
        <View style={styles.relative}>
            <SelectContextProvider
                value={{
                    isOpened,
                    animation,
                    aboveSelectControl,
                    clearable,
                    disabled,
                    hideArrow,
                    multiple,
                    optionsData,
                    placeholderText,
                    placeholderTextColor,
                    searchPattern,
                    searchValue,
                    onPressSelectControl,
                    selectInputProps,
                    onRemove,
                    dispatch,
                    setOptionsListPosition,
                    selectedOption,
                    selectedOptionIndex,
                    styles: mainStyles,
                    clearOptionButtonProps,
                    clearOptionImageProps,
                    arrowContainerProps,
                    arrowImageProps,
                    selectRightIconsProps,
                    selectLeftIconsProps,
                    selectLeftIconImageProps,
                    selectTextProps,
                    selectContainerProps,
                    onSelectChangeText,
                }}
            >
                <SelectControl ref={selectControlRef} />
            </SelectContextProvider>
            {isOpened && (
                <>
                    {hasBackdrop && (
                        <Portal hostName={Portals.Backdrop}>
                            <Backdrop
                                backdrop={mainStyles?.backdrop}
                                backdropProps={backdropProps}
                                backdropChildProps={backdropChildProps}
                                onOutsidePress={onOutsidePress}
                            />
                        </Portal>
                    )}
                    <Portal hostName={Portals.OptionsList}>
                        <OptionsListContextProvider
                            value={{
                                animation,
                                aboveSelectControl,
                                flatListProps,
                                isOpened,
                                noOptionsText,
                                openedPosition,
                                optionsData,
                                scrollToSelectedOption,
                                searchValue,
                                onPressOption,
                                onPressSection,
                                selectedOption,
                                searchedOptions,
                                selectedOptionIndex,
                                sectionListProps,
                                styles: mainStyles,
                                optionButtonProps,
                                optionTextProps,
                                noOptionsProps,
                                noOptionsTextProps,
                                sectionHeaderButtonProps,
                                sectionHeaderImageProps,
                                sectionHeaderTextProps,
                                pressableSelectedOption,
                                multiple,
                            }}
                        >
                            <OptionsList ref={optionsListRef} />
                        </OptionsListContextProvider>
                    </Portal>
                </>
            )}
        </View>
    );
};

export const Select = forwardRef(SelectComp) as <T>(
    props: SelectProps<T> & { ref?: ForwardedRef<SelectRef<T>> },
) => ReactElement;

type Styles = {
    relative: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    relative: {
        position: 'relative',
    },
});

(Select as NamedExoticComponent).displayName = 'Select';
