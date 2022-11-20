import type { ForwardedRef } from 'react';
import React, { forwardRef, useReducer, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Portal } from '@gorhom/portal';

import { Portals } from '../../constants/portals';
import { COLORS } from '../../constants/styles';
import { OptionsListContextProvider, SelectContextProvider } from '../../context';
import { initialData, reducer } from '../../state/reducer';
import type { SelectProps, SelectRef } from '../../types';
import { Backdrop } from '../backdrop';
import { OptionsList } from '../options-list';
import { SelectControl } from '../select-control';

import { useSelect } from './select.hooks';

export const Select = forwardRef((props: SelectProps, ref: ForwardedRef<SelectRef>) => {
    const {
        // Required
        options,
        // Callbacks
        onSelect,
        onRemove,
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
        // Additional features
        defaultOption,
        flatListProps,
        sectionListProps,
        // Search
        searchable = false,
        searchPattern = (payload: string) => `(${payload})`,
        textInputProps,
        // Multiselect
        multiSelection = false,
        // Custom components
        NoOptionsComponent,
        OptionComponent,
        // Colors
        placeholderTextColor = COLORS.GRAY,
        // Accessibility
        selectControlClearOptionA11yLabel,
        selectControlOpenDropdownA11yLabel,
        // Styles
        selectControlStyles,
        optionsListStyles,
        containerStyle,
        clearOptionStyles,
        arrowIconStyles,
        customLeftIconStyles,
    } = props;

    const resolvedOptionsData = Array.isArray(options) ? options : [];
    const initialState = {
        ...initialData,
        optionsData: resolvedOptionsData,
        searchValue: searchable ? '' : null,
    };
    const [state, dispatch] = useReducer(reducer, initialState);
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

    const containerRef = useRef<View>(null);

    const { setPosition, onPressOption, onOutsidePress, onPressSelectControl } = useSelect({
        options,
        containerRef,
        dispatch,
        defaultOption,
        onRemove,
        disabled,
        closeDropdownOnSelect,
        searchable,
        multiSelection,
        optionsListStyles,
        onDropdownOpened,
        onDropdownClosed,
        ref,
        state,
    });

    return (
        <View style={[styles.relative, containerStyle]} onLayout={setPosition}>
            <SelectContextProvider
                value={{
                    isOpened,
                    arrowIconStyles,
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
                    textInputProps,
                    selectControlClearOptionA11yLabel,
                    selectControlOpenDropdownA11yLabel,
                    clearOptionStyles,
                    onRemove,
                    dispatch,
                    customLeftIconStyles,
                    selectControlStyles,
                    setPosition,
                    selectedOption,
                    selectedOptionIndex,
                }}
            >
                <SelectControl ref={containerRef} />
            </SelectContextProvider>
            {isOpened && (
                <>
                    <Portal hostName={Portals.Backdrop}>
                        <Backdrop onOutsidePress={onOutsidePress} />
                    </Portal>
                    <Portal hostName={Portals.OptionsList}>
                        <OptionsListContextProvider
                            value={{
                                animation,
                                NoOptionsComponent,
                                OptionComponent,
                                aboveSelectControl,
                                flatListProps,
                                isOpened,
                                noOptionsText,
                                openedPosition,
                                optionsData,
                                scrollToSelectedOption,
                                searchValue,
                                onSelect,
                                onPressOption,
                                selectedOption,
                                searchedOptions,
                                selectedOptionIndex,
                                sectionListProps,
                                optionsListStyles,
                            }}
                        >
                            <OptionsList />
                        </OptionsListContextProvider>
                    </Portal>
                </>
            )}
        </View>
    );
});

type Styles = {
    relative: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    relative: {
        position: 'relative',
    },
});

Select.displayName = 'Select';
