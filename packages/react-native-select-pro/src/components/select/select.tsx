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
        // Callbacks
        onSelect,
        onRemove,
        onSectionSelect,
        onSectionRemove,
        onDropdownOpened,
        onDropdownClosed,
        // Texts
        noOptionsText = 'No options',
        placeholderText = 'Select...',
        // Animations
        animation = true,
        // Behaviour
        clearable = true,
        closeDropdownOnSelect = true,
        disabled = false,
        scrollToSelectedOption = true,
        hideArrow = false,
        noBackdrop = false,
        pressableSelectedOption = false,
        // Additional features
        defaultOption,
        flatListProps,
        sectionListProps,
        clearOptionButtonProps,
        clearOptionImageProps,
        arrowButtonProps,
        arrowImageProps,
        backdropProps,
        backdropChildProps,
        optionTextProps,
        optionButtonProps,
        selectLeftIconsProps,
        selectRightIconsProps,
        selectLeftIconImageProps,
        noOptionsTextProps,
        sectionHeaderTextProps,
        sectionHeaderImageProps,
        sectionHeaderButtonProps,
        selectTextProps,
        noOptionsProps,
        // Search
        searchable = false,
        searchPattern = (payload: string) => `(${payload})`,
        selectInputProps,
        // Multiselect
        multiSelection = false,
        // Custom components
        OptionComponent,
        // Colors
        placeholderTextColor = COLORS.GRAY,
        // Accessibility
        selectControlOpenDropdownA11yLabel,
        // Styles
        styles: mainStyles,
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
        closeDropdownOnSelect,
        searchable,
        multiSelection,
        onDropdownOpened,
        onDropdownClosed,
        ref,
        state,
        onSectionSelect,
        onSectionRemove,
        onSelect,
    });

    return (
        <View style={[styles.relative, mainStyles]}>
            <SelectContextProvider
                value={{
                    isOpened,
                    animation,
                    aboveSelectControl,
                    clearable,
                    disabled,
                    hideArrow,
                    multiSelection,
                    optionsData,
                    placeholderText,
                    placeholderTextColor,
                    searchPattern,
                    searchValue,
                    onPressSelectControl,
                    selectInputProps,
                    selectControlOpenDropdownA11yLabel,
                    onRemove,
                    dispatch,
                    setOptionsListPosition,
                    selectedOption,
                    selectedOptionIndex,
                    styles: mainStyles,
                    clearOptionButtonProps,
                    clearOptionImageProps,
                    arrowButtonProps,
                    arrowImageProps,
                    selectRightIconsProps,
                    selectLeftIconsProps,
                    selectLeftIconImageProps,
                    selectTextProps,
                }}
            >
                <SelectControl ref={selectControlRef} />
            </SelectContextProvider>
            {isOpened && (
                <>
                    {!noBackdrop && (
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
                                OptionComponent,
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
