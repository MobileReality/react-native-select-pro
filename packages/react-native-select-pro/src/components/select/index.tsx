import type { ForwardedRef, RefObject } from 'react';
import React, { forwardRef, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import type { TextInput, ViewStyle } from 'react-native';
import { I18nManager, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ANIMATION_DURATION, COLORS, ITEM_HEIGHT, MAX_HEIGHT_LIST } from '../../constants/styles';
import { getSize } from '../../helpers';
import { getReducedSectionData } from '../../helpers/get-reduced-section-data';
import { isSectionOptionsType } from '../../helpers/is-section-options-type';
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
        animated = false,
        animationDuration = ANIMATION_DURATION,
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
    } = props;
    const [state, dispatch] = useReducer(reducer, { ...initialData, optionsData: options });
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
    const selectedOptionTyped = selectedOption as OptionType;

    const containerRef = useRef<View>(null);
    const isMultiSelection = multiSelection && !isSectionOptionsType(optionsData);
    const isSearchable = searchable && !isSectionOptionsType(optionsData);

    useEffect(() => {
        if (!Array.isArray(optionsData)) {
            // eslint-disable-next-line no-console
            console.error('You must pass array in the options prop');
            return;
        }

        if (optionsData.length > 0) {
            dispatch({ type: Action.SetOptionsData, payload: options });

            const isValidPassDefaultOption =
                defaultOption &&
                Object.hasOwn(defaultOption, 'value') &&
                Object.hasOwn(defaultOption, 'label');

            if (isValidPassDefaultOption) {
                const isSectionData = isSectionOptionsType(optionsData);
                const foundIndex = isSectionData
                    ? getReducedSectionData(optionsData).indexOf(defaultOption)
                    : optionsData.indexOf(defaultOption);

                dispatch({
                    type: Action.SelectOption,
                    payload: {
                        selectedOption: defaultOption,
                        selectedOptionIndex: foundIndex,
                    },
                });
            }
        }
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsData]);

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
            if (!isMultiSelection || isSectionOptionsType(optionsData)) {
                return {
                    selectedOption: option,
                    selectedOptionIndex: optionIndex,
                };
            }

            const selectedOptionAsArray = selectedOption as OptionType[] | null;
            const foundSelectedOption = selectedOptionAsArray?.find(
                (selectedOption: OptionType) => selectedOption.value === option.value,
            );

            if (foundSelectedOption) {
                return {
                    selectedOption: selectedOptionAsArray,
                    selectedOptionIndex:
                        typeof selectedOptionIndex === 'number'
                            ? selectedOptionIndex
                            : [...selectedOptionIndex],
                };
            }

            const sOption = selectedOptionAsArray ? selectedOptionAsArray.concat(option) : [option];

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
            payload: {
                selectedOption: resolveOption().selectedOption,
                selectedOptionIndex: resolveOption().selectedOptionIndex,
            },
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
                const optionsDataLength = isSectionOptionsType(optionsData)
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
        dispatch({ type: Action.Close });
        if (isSearchable && selectedOptionTyped?.label) {
            dispatch({
                type: Action.SetSearchValue,
                payload: selectedOptionTyped.label,
            });
        }
        hideKeyboardIfNeeded();
    };

    useEffect(() => {
        if (isOpened) {
            onDropdownOpened?.();
        } else {
            onDropdownClosed?.();
        }
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpened]);

    return (
        <View style={[styles.relative, containerStyle]} onLayout={setPosition}>
            <SelectControl
                ref={containerRef}
                aboveSelectControl={aboveSelectControl}
                animated={animated}
                animationDuration={animationDuration}
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
                searchable={isSearchable}
                textInputProps={textInputProps}
                selectControlClearOptionA11yLabel={selectControlClearOptionA11yLabel}
                selectControlOpenDropdownA11yLabel={selectControlOpenDropdownA11yLabel}
                selectedOption={selectedOption}
                selectedOptionIndex={selectedOptionIndex}
                setPosition={setPosition}
                onPressSelectControl={onPressSelectControl}
                onSelect={onSelect}
                onRemove={onRemove}
                {...selectControlStyles}
            />
            <OptionsList
                NoOptionsComponent={NoOptionsComponent}
                OptionComponent={OptionComponent}
                aboveSelectControl={aboveSelectControl}
                animated={animated}
                animationDuration={animationDuration}
                flatListProps={flatListProps}
                isOpened={isOpened}
                multiSelection={isMultiSelection}
                noOptionsText={noOptionsText}
                openedPosition={openedPosition}
                optionsData={optionsData}
                scrollToSelectedOption={scrollToSelectedOption}
                searchValue={searchValue}
                searchable={isSearchable}
                searchedOptions={searchedOptions}
                selectedOption={selectedOption}
                selectedOptionIndex={selectedOptionIndex}
                sectionListProps={sectionListProps}
                onOutsidePress={onOutsidePress}
                onPressOption={onPressOption}
                onSelect={onSelect}
                {...optionsListStyles}
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
