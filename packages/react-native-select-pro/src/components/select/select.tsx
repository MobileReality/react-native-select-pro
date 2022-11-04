import type { ForwardedRef } from 'react';
import React, { forwardRef, useReducer, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { COLORS } from '../../constants/styles';
import { isSectionOptionsType } from '../../helpers';
import { initialData, reducer } from '../../state/reducer';
import type { SelectProps, SelectRef } from '../../types';
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
        hideSelectControlArrow = false,
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
    const isMultiSelection = multiSelection && !isSectionOptionsType(optionsData);

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
        isMultiSelection,
        optionsListStyles,
        onDropdownOpened,
        onDropdownClosed,
        ref,
        state,
    });

    return (
        <View style={[styles.relative, containerStyle]} onLayout={setPosition}>
            <SelectControl
                ref={containerRef}
                aboveSelectControl={aboveSelectControl}
                animation={animation}
                clearable={clearable}
                disabled={disabled}
                dispatch={dispatch}
                hideSelectControlArrow={hideSelectControlArrow}
                isOpened={isOpened}
                multiSelection={isMultiSelection}
                optionsData={optionsData}
                placeholderText={placeholderText}
                placeholderTextColor={placeholderTextColor}
                searchPattern={searchPattern}
                searchValue={searchValue}
                textInputProps={textInputProps}
                selectControlClearOptionA11yLabel={selectControlClearOptionA11yLabel}
                selectControlOpenDropdownA11yLabel={selectControlOpenDropdownA11yLabel}
                selectedOption={selectedOption}
                selectedOptionIndex={selectedOptionIndex}
                clearOptionStyles={clearOptionStyles}
                customLeftIconStyles={customLeftIconStyles}
                selectControlStyles={selectControlStyles}
                arrowIconStyles={arrowIconStyles}
                setPosition={setPosition}
                onPressSelectControl={onPressSelectControl}
                onRemove={onRemove}
            />
            <OptionsList
                NoOptionsComponent={NoOptionsComponent}
                OptionComponent={OptionComponent}
                aboveSelectControl={aboveSelectControl}
                animation={animation}
                flatListProps={flatListProps}
                isOpened={isOpened}
                noOptionsText={noOptionsText}
                openedPosition={openedPosition}
                optionsData={optionsData}
                scrollToSelectedOption={scrollToSelectedOption}
                searchValue={searchValue}
                searchedOptions={searchedOptions}
                selectedOption={selectedOption}
                selectedOptionIndex={selectedOptionIndex}
                sectionListProps={sectionListProps}
                optionsListStyles={optionsListStyles}
                onOutsidePress={onOutsidePress}
                onPressOption={onPressOption}
                onSelect={onSelect}
            />
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
