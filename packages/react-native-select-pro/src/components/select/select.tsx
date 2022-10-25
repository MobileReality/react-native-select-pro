import type { ForwardedRef, RefObject } from 'react';
import { useCallback } from 'react';
import React, { forwardRef, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import type { TextInput, ViewStyle } from 'react-native';
import { I18nManager, StyleSheet, useWindowDimensions, View } from 'react-native';

import { COLORS, ITEM_HEIGHT, MAX_HEIGHT_LIST } from '../../constants/styles';
import { getSize } from '../../helpers';
import { getReducedSectionData, isSectionOptionsType } from '../../helpers';
import { selectedOptionResolver } from '../../helpers';
import { ERRORS, logError } from '../../helpers/log-error';
import { initialData, reducer } from '../../state/reducer';
import { Action } from '../../state/types';
import type {
    OnOutsidePress,
    OnPressOptionType,
    OnPressSelectControlType,
    OptionType,
    SelectProps,
    SelectRef,
} from '../../types';
import { OptionsList } from '../options-list';
import { SelectControl } from '../select-control';

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
    const isSearchable = !isSectionOptionsType(resolvedOptionsData) && searchable;
    const initialState = {
        ...initialData,
        optionsData: resolvedOptionsData,
        searchValue: isSearchable ? '' : null,
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        isOpened,
        selectedOption,
        optionsData,
        openedPosition,
        searchValue,
        searchedOptions,
        searchInputRef,
        selectedOptionIndex,
    } = state;

    const { aboveSelectControl } = openedPosition;
    const isSectionedOptions = isSectionOptionsType(optionsData);
    const isMultiSelection = multiSelection && !isSectionedOptions;
    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);

    const containerRef = useRef<View>(null);
    const isFirstRenderRef = useRef(true);

    const checkData = useCallback(() => {
        if (!Array.isArray(options)) {
            logError(ERRORS.NO_ARRAY_OPTIONS);
            return false;
        }

        return true;
    }, [options]);

    useEffect(() => {
        if (isFirstRenderRef.current) {
            checkData();
            isFirstRenderRef.current = false;
            return;
        }

        const isDataValid = checkData();
        if (!isDataValid) {
            dispatch({ type: Action.SetOptionsData, payload: [] });
            return;
        }

        if (options.length > 0) {
            dispatch({ type: Action.SetOptionsData, payload: options });
        }
    }, [options, checkData]);

    useEffect(() => {
        const isValidPassDefaultOption =
            defaultOption &&
            Object.prototype.hasOwnProperty.call(defaultOption, 'value') &&
            Object.prototype.hasOwnProperty.call(defaultOption, 'label');

        if (optionsData.length === 0 || !isValidPassDefaultOption) {
            return;
        }

        const foundIndex = isSectionedOptions
            ? getReducedSectionData(optionsData).indexOf(defaultOption)
            : optionsData.indexOf(defaultOption);

        dispatch({
            type: Action.SelectOption,
            payload: {
                selectedOption: defaultOption,
                selectedOptionIndex: foundIndex,
            },
        });
    }, [optionsData, defaultOption, isSectionedOptions]);

    useImperativeHandle(ref, () => ({
        clear: () => {
            dispatch({
                type: Action.SelectOption,
                payload: { selectedOption: null, selectedOptionIndex: -1 },
            });
            if (onRemove) {
                onRemove(selectedOption, selectedOptionIndex);
            }
        },
        open: () => {
            if (containerRef.current && !disabled) {
                dispatch({
                    type: Action.Open,
                });
                setPosition();
            }
        },
        close: () => {
            dispatch({
                type: Action.Close,
            });
        },
        getState: () => state,
    }));

    const hideKeyboardIfNeeded = () => {
        // TODO: Better condition handling, however, typo error appears in every combination
        if (searchInputRef && (searchInputRef as RefObject<TextInput>).current) {
            (searchInputRef as RefObject<TextInput>)?.current?.blur();
        }
    };

    const onPressOption: OnPressOptionType = (option: OptionType, optionIndex: number) => {
        if (closeDropdownOnSelect) {
            dispatch({ type: Action.Close });
        }

        const resolveOption = () => {
            if (!isMultiSelection || isSectionedOptions) {
                return {
                    selectedOption: option,
                    selectedOptionIndex: optionIndex,
                };
            }

            const foundSelectedOption = selectedOptions?.find(
                (selectedOption: OptionType) => selectedOption.value === option.value,
            );
            if (foundSelectedOption) {
                return {
                    selectedOption: selectedOptions,
                    selectedOptionIndex:
                        typeof selectedOptionIndex === 'number'
                            ? selectedOptionIndex
                            : [...selectedOptionIndex],
                };
            }

            const sOption = selectedOptions ? selectedOptions.concat(option) : [option];
            const sOptionIndex = optionsData
                .map((item, index) => {
                    if (sOption.some(({ value }) => value === item.value)) {
                        return index;
                    }
                    return null;
                })
                .filter((item): item is number => item !== null);

            return {
                selectedOption: sOption,
                selectedOptionIndex: sOptionIndex.length > 0 ? [...sOptionIndex] : -1,
            };
        };

        dispatch({
            type: Action.SelectOption,
            payload: resolveOption(),
        });

        if (isSearchable) {
            if (isMultiSelection) {
                dispatch({ type: Action.SetSearchValue, payload: '' });
            } else {
                dispatch({
                    type: Action.SetSearchValue,
                    payload: option.label,
                });
            }
        }

        if (option) {
            hideKeyboardIfNeeded();
        }
    };

    const windowDimensions = useWindowDimensions();

    const setPosition = () => {
        if (containerRef.current) {
            containerRef.current.measure((_x, _y, width, height, pageX, pageY) => {
                const listHeightFromProp = StyleSheet.flatten(
                    optionsListStyles?.containerStyle,
                )?.maxHeight;

                const optionHeightFromProp = StyleSheet.flatten(
                    optionsListStyles?.optionStyle,
                )?.height;

                const optionHeight = getSize({
                    size: optionHeightFromProp,
                    sizeType: 'height',
                    sizeFallback: ITEM_HEIGHT,
                    screenSize: windowDimensions.height,
                });

                const listHeight = getSize({
                    size: listHeightFromProp,
                    sizeType: 'height',
                    sizeFallback: MAX_HEIGHT_LIST,
                    screenSize: windowDimensions.height,
                });
                const optionsDataLength = isSectionedOptions
                    ? getReducedSectionData(optionsData).length
                    : optionsData.length;
                const finalHeight =
                    listHeight >= optionsDataLength * optionHeight
                        ? optionsDataLength * optionHeight
                        : listHeight;

                const isOverflow = pageY + height + finalHeight > windowDimensions.height;

                dispatch({
                    type: Action.SetPosition,
                    payload: {
                        width,
                        top: isOverflow ? pageY - finalHeight : pageY + height,
                        left: I18nManager.isRTL ? windowDimensions.width - width - pageX : pageX,
                        aboveSelectControl: isOverflow,
                    },
                });
            });
        }
    };

    const onPressSelectControl: OnPressSelectControlType = () => {
        if (isOpened) {
            dispatch({
                type: Action.Close,
            });
            return;
        }
        setPosition();
        if (containerRef.current) {
            dispatch({
                type: Action.Open,
            });
        }
    };

    const onOutsidePress: OnOutsidePress = () => {
        if (selectedOptionLabel && isSearchable) {
            dispatch({
                type: Action.SetSearchValue,
                payload: selectedOptionLabel,
            });
        }

        dispatch({ type: Action.Close });
        hideKeyboardIfNeeded();
    };

    useEffect(() => {
        if (isOpened) {
            onDropdownOpened?.();
        } else {
            onDropdownClosed?.();
        }
    }, [isOpened, onDropdownOpened, onDropdownClosed]);

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
