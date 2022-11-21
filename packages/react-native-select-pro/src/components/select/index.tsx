import React, {
    ForwardedRef,
    forwardRef,
    RefObject,
    useContext,
    useEffect,
    useImperativeHandle,
    useReducer,
    useRef,
} from 'react';
import {
    I18nManager,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    View,
    ViewStyle,
} from 'react-native';

import {
    ANIMATION_DURATION,
    COLORS,
    ITEM_HEIGHT,
    MAX_HEIGHT_LIST,
} from '../../constants/styles';
import { getSize } from '../../helpers';
import { getReducedSectionData } from '../../helpers/getReducedSectionData';
import { isSectionOptionsType } from '../../helpers/isSectionOptionsType';
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
import { SelectModalContext } from '../select-provider';

export const Select = forwardRef(
    (props: SelectProps, ref: ForwardedRef<SelectRef>) => {
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
            // Custom sources
            customLeftIconSource,
            customSelectControlArrowIconSource,
            // Colors
            placeholderTextColor = COLORS.GRAY,
            // Accessibility
            selectControlClearOptionA11yLabel,
            selectControlOpenDropdownA11yLabel,
            // Styles
            optionStyle,
            optionsListStyle,
            optionTextStyle,
            optionSelectedStyle,
            selectContainerStyle,
            selectControlArrowImageStyle,
            selectControlButtonsContainerStyle,
            selectControlClearOptionButtonStyle,
            selectControlClearOptionImageStyle,
            selectControlClearOptionButtonHitSlop,
            selectControlDisabledStyle,
            selectControlStyle,
            selectControlTextStyle,
            customLeftIconStyles,
            multiSelectionOptionStyle,
            sectionHeaderTextStyle,
            sectionHeaderContainerStyle,
        } = props;
        const [state, dispatch] = useReducer(reducer, initialData);
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
        const isMultiSelection =
            multiSelection && !isSectionOptionsType(options);
        const isSearchable = searchable && !isSectionOptionsType(options);

        useEffect(() => {
            if (!Array.isArray(options)) {
                // eslint-disable-next-line no-console
                console.error('You must pass array in the options prop');
                return;
            }

            if (options.length > 0) {
                dispatch({ type: Action.SetOptionsData, payload: options });

                const isValidPassDefaultOption =
                    defaultOption &&
                    // eslint-disable-next-line no-prototype-builtins
                    defaultOption.hasOwnProperty('value') &&
                    // eslint-disable-next-line no-prototype-builtins
                    defaultOption.hasOwnProperty('label');

                if (isValidPassDefaultOption) {
                    const isSectionData = isSectionOptionsType(options);
                    const foundIndex = isSectionData
                        ? getReducedSectionData(options).indexOf(defaultOption)
                        : options.indexOf(defaultOption);

                    dispatch({
                        type: Action.SelectOption,
                        payload: {
                            selectedOption: defaultOption,
                            selectedOptionIndex: foundIndex,
                        },
                    });
                }
            }
        }, [options]);

        useImperativeHandle(ref, () => ({
            clear: () => {
                dispatch({
                    type: Action.SelectOption,
                    payload: { selectedOption: null, selectedOptionIndex: -1 },
                });
                dispatch({ type: Action.SetOptionsData, payload: options });
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
            if (
                searchInputRef &&
                (searchInputRef as RefObject<TextInput>).current
            ) {
                (searchInputRef as RefObject<TextInput>)?.current?.blur();
            }
        };

        const onPressOption: OnPressOptionType = (
            option: OptionType,
            optionIndex: number,
        ) => {
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

                const selectedOptionAsArray = selectedOption as
                    | OptionType[]
                    | null;
                const foundSelectedOption =
                    selectedOptionAsArray &&
                    selectedOptionAsArray.find(
                        (selectedOption: OptionType) =>
                            selectedOption.value === option.value,
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

                const sOption = selectedOptionAsArray
                    ? selectedOptionAsArray.concat(option)
                    : [option];

                const sOptionIndex = optionsData
                    .map((item, index) => {
                        if (sOption.some(({ value }) => value === item.value)) {
                            return index;
                        }
                        return undefined;
                    })
                    .filter((item) => item !== undefined) as number[];

                return {
                    selectedOption: sOption,
                    selectedOptionIndex:
                        sOptionIndex.length > 0 ? [...sOptionIndex] : -1,
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
            dispatch({ type: Action.SetOptionsData, payload: options });
            if (option) {
                hideKeyboardIfNeeded();
            }
        };

        const windowDimensions = useWindowDimensions();
        const valueY = useContext(SelectModalContext);

        const setPosition = () => {
            if (containerRef.current) {
                containerRef.current.measure(
                    (_x, _y, width, height, pageX, pageY) => {
                        const listHeightFromProp =
                            StyleSheet.flatten(optionsListStyle)?.maxHeight;

                        const optionHeightFromProp =
                            StyleSheet.flatten(optionStyle)?.height;

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
                        const optionsDataLength = isSectionOptionsType(
                            optionsData,
                        )
                            ? getReducedSectionData(optionsData).length
                            : optionsData.length;
                        const finalHeight =
                            listHeight >= optionsDataLength * optionHeight
                                ? optionsDataLength * optionHeight
                                : listHeight;

                        const isOverflow =
                            pageY + height + finalHeight >
                            windowDimensions.height;

                        dispatch({
                            type: Action.SetPosition,
                            payload: {
                                width,
                                top: isOverflow
                                    ? pageY - finalHeight
                                    : pageY + height - valueY,
                                left: I18nManager.isRTL
                                    ? windowDimensions.width - width - pageX
                                    : pageX,
                                aboveSelectControl: isOverflow,
                            },
                        });
                    },
                );
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
            dispatch({ type: Action.SetOptionsData, payload: options });
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
        }, [isOpened]);

        return (
            <View
                style={[styles.relative, selectContainerStyle]}
                onLayout={setPosition}
            >
                <SelectControl
                    ref={containerRef}
                    aboveSelectControl={aboveSelectControl}
                    animated={animated}
                    animationDuration={animationDuration}
                    clearable={clearable}
                    customLeftIconSource={customLeftIconSource}
                    customLeftIconStyles={customLeftIconStyles}
                    disabled={disabled}
                    dispatch={dispatch}
                    hideSelectControlArrow={hideSelectControlArrow}
                    isOpened={isOpened}
                    multiSelection={isMultiSelection}
                    multiSelectionOptionStyle={multiSelectionOptionStyle}
                    options={options}
                    placeholderText={placeholderText}
                    placeholderTextColor={placeholderTextColor}
                    searchPattern={searchPattern}
                    searchValue={searchValue}
                    searchable={isSearchable}
                    customSelectControlArrowIconSource={
                        customSelectControlArrowIconSource
                    }
                    textInputProps={textInputProps}
                    selectControlArrowImageStyle={selectControlArrowImageStyle}
                    selectControlButtonsContainerStyle={
                        selectControlButtonsContainerStyle
                    }
                    selectControlClearOptionA11yLabel={
                        selectControlClearOptionA11yLabel
                    }
                    selectControlClearOptionButtonHitSlop={
                        selectControlClearOptionButtonHitSlop
                    }
                    selectControlClearOptionButtonStyle={
                        selectControlClearOptionButtonStyle
                    }
                    selectControlClearOptionImageStyle={
                        selectControlClearOptionImageStyle
                    }
                    selectControlDisabledStyle={selectControlDisabledStyle}
                    selectControlOpenDropdownA11yLabel={
                        selectControlOpenDropdownA11yLabel
                    }
                    selectControlStyle={selectControlStyle}
                    selectControlTextStyle={selectControlTextStyle}
                    selectedOption={selectedOption}
                    selectedOptionIndex={selectedOptionIndex}
                    setPosition={setPosition}
                    onPressSelectControl={onPressSelectControl}
                    onSelect={onSelect}
                    onRemove={onRemove}
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
                    optionSelectedStyle={optionSelectedStyle}
                    optionStyle={optionStyle}
                    optionTextStyle={optionTextStyle}
                    optionsData={optionsData}
                    optionsListStyle={optionsListStyle}
                    scrollToSelectedOption={scrollToSelectedOption}
                    searchValue={searchValue}
                    searchable={isSearchable}
                    searchedOptions={searchedOptions}
                    selectedOption={selectedOption}
                    selectedOptionIndex={selectedOptionIndex}
                    sectionHeaderContainerStyle={sectionHeaderContainerStyle}
                    sectionHeaderTextStyle={sectionHeaderTextStyle}
                    sectionListProps={sectionListProps}
                    onOutsidePress={onOutsidePress}
                    onPressOption={onPressOption}
                    onSelect={onSelect}
                />
            </View>
        );
    },
);

type Styles = {
    relative: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    relative: {
        position: 'relative',
    },
});

Select.displayName = 'Select';
