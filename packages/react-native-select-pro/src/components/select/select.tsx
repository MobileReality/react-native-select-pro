import type { Dispatch, ForwardedRef, Reducer } from 'react';
import React, { forwardRef, useReducer, useRef } from 'react';
import type { SectionListData, ViewStyle } from 'react-native';
import { StyleSheet, UIManager, View } from 'react-native';
import { Portal } from '@gorhom/portal';

import { COLORS, Portals } from '../../constants';
import { OptionsListContextProvider, SelectContextProvider } from '../../context';
import { isAndroid, mergeObjects } from '../../helpers';
import type { ActionType, CreateInitialStateType, State } from '../../state';
import { createInitialState, reducer } from '../../state';
import { themes } from '../../themes';
import type {
    OnPressOptionType,
    OptionsType,
    OptionType,
    SelectProps,
    SelectRef,
    SelectStyles,
} from '../../types';
import { Backdrop } from '../backdrop';
import { OptionsList } from '../options-list';
import { SelectControl } from '../select-control';

import { useSelect } from './select.hooks';

if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SelectComponent = <T,>(props: SelectProps<T>, ref: ForwardedRef<SelectRef<T>>) => {
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
        styles: customStyles,
        theme = 'none',
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
    const mainStyles: SelectStyles = mergeObjects(themes[theme], customStyles);

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
                    optionsData: optionsData as OptionsType<unknown>,
                    placeholderText,
                    placeholderTextColor,
                    searchPattern,
                    searchValue,
                    onPressSelectControl,
                    selectInputProps,
                    onRemove,
                    dispatch: dispatch as Dispatch<ActionType<unknown>>,
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
                                backdropCustomStyles={mainStyles?.backdrop}
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
                                optionsData: optionsData as OptionsType<unknown>,
                                scrollToSelectedOption,
                                searchValue,
                                onPressOption: onPressOption as OnPressOptionType<unknown>,
                                onPressSection,
                                selectedOption,
                                searchedOptions: searchedOptions as OptionsType<unknown>,
                                selectedOptionIndex,
                                sectionListProps: sectionListProps as SectionListData<
                                    OptionsType<OptionType>
                                >,
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
                                disabled,
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

type Styles = {
    relative: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    relative: {
        position: 'relative',
    },
});

export const Select = forwardRef(SelectComponent) as <T>(
    props: SelectProps<T> & { ref?: ForwardedRef<SelectRef<T>> },
) => ReturnType<typeof SelectComponent>;
