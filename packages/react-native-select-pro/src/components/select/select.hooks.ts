import type { RefObject } from 'react';
import { useCallback } from 'react';
import { useEffect, useImperativeHandle, useRef } from 'react';
import type { TextInput } from 'react-native';
import { I18nManager, StyleSheet, useWindowDimensions } from 'react-native';

import { ITEM_HEIGHT, MAX_HEIGHT_LIST } from '../../constants/styles';
import { getSize, isSectionOptionsType } from '../../helpers';
import { getReducedSectionData } from '../../helpers';
import { selectedOptionResolver } from '../../helpers';
import { ERRORS, logError } from '../../helpers';
import { getSectionOptionIndexes } from '../../helpers/get-section-option-indexes';
import { Action } from '../../state/types';
import type {
    OnOutsidePress,
    OnPressOptionType,
    OnPressSelectControlType,
    OptionType,
    SelectRef,
} from '../../types';

import type { UseSelect } from './select.types';

export const useSelect = <T>({
    ref,
    containerRef,
    state,
    options,
    defaultOption,
    disabled,
    closeDropdownOnSelect,
    searchable,
    multiSelection,
    styles,
    dispatch,
    onRemove,
    onDropdownOpened,
    onDropdownClosed,
}: UseSelect<T>) => {
    const isFirstRenderRef = useRef(true);
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const { isOpened, selectedOption, optionsData, searchInputRef, selectedOptionIndex } = state;
    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);
    const isSectionedOptions = isSectionOptionsType(optionsData);

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
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsData, defaultOption, isSectionedOptions]);

    useImperativeHandle(
        ref,
        (): SelectRef<T> => ({
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
        }),
    );

    const hideKeyboardIfNeeded = () => {
        // TODO: Better condition handling, however, typo error appears in every combination
        if (searchInputRef && (searchInputRef as RefObject<TextInput>).current) {
            (searchInputRef as RefObject<TextInput>)?.current?.blur();
        }
    };

    const onPressOption: OnPressOptionType<T> = (option: OptionType<T>, optionIndex: number) => {
        if (closeDropdownOnSelect) {
            dispatch({ type: Action.Close });
        }

        const resolveOption = () => {
            if (!multiSelection) {
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

            const mergedOptions = selectedOptions ? selectedOptions.concat(option) : [option];
            const resolvedOptionsData = isSectionedOptions
                ? getReducedSectionData(optionsData)
                : optionsData;
            const optionIndexes = mergedOptions
                .map((item) => resolvedOptionsData.findIndex(({ value }) => value === item.value))
                .filter((item): item is number => item !== null);

            return {
                selectedOption: mergedOptions,
                selectedOptionIndex: optionIndexes.length > 0 ? [...optionIndexes] : -1,
            };
        };

        dispatch({
            type: Action.SelectOption,
            payload: resolveOption(),
        });

        if (searchable) {
            if (multiSelection) {
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

    const onPressSection = (title: string) => {
        if (closeDropdownOnSelect && multiSelection) {
            dispatch({ type: Action.Close });
        }
        if (!multiSelection || !isSectionedOptions) {
            return;
        }

        const resolveOption = () => {
            const sectionData = optionsData.find((item) => item.title === title)?.data;
            const newSelectedOptions =
                sectionData
                    ?.filter(
                        (item) =>
                            !selectedOptions?.some((selected) => selected.value === item.value),
                    )
                    .map((item) => ({
                        ...item,
                        section: {
                            title,
                            index: optionsData.findIndex((el) => el.title === title),
                        },
                    })) ?? [];

            if (newSelectedOptions.length === 0 && selectedOptions) {
                const restOptions = selectedOptions.filter(
                    (item) => !sectionData?.some((selected) => selected.value === item.value),
                );

                return {
                    selectedOption: restOptions.length > 0 ? restOptions : null,
                    selectedOptionIndex: restOptions
                        ? getSectionOptionIndexes(optionsData, restOptions)
                        : -1,
                };
            }

            const mergedOptions = selectedOptions
                ? selectedOptions.concat(newSelectedOptions)
                : newSelectedOptions;

            const optionIndexes = getSectionOptionIndexes(optionsData, mergedOptions);

            return {
                selectedOption: mergedOptions,
                selectedOptionIndex: optionIndexes.length > 0 ? optionIndexes : -1,
            };
        };

        dispatch({
            type: Action.SelectOption,
            payload: resolveOption(),
        });
    };

    const setPosition = () => {
        if (containerRef.current) {
            containerRef.current.measure((_x, _y, width, height, pageX, pageY) => {
                const optionHeightFromProp = StyleSheet.flatten(styles?.option)?.height;
                const optionHeight = getSize({
                    size: optionHeightFromProp,
                    sizeFallback: ITEM_HEIGHT,
                    screenSize: screenHeight,
                });

                const listHeightFromProp = StyleSheet.flatten(styles?.optionsList)?.maxHeight;
                const listHeight = getSize({
                    size: listHeightFromProp,
                    sizeFallback: MAX_HEIGHT_LIST,
                    screenSize: screenHeight,
                });
                const optionsDataLength = isSectionedOptions
                    ? getReducedSectionData(optionsData).length
                    : optionsData.length;

                const finalHeight =
                    listHeight >= optionsDataLength * optionHeight
                        ? optionsDataLength * optionHeight
                        : listHeight;

                const isOverflow = pageY + height + finalHeight > screenHeight;

                dispatch({
                    type: Action.SetPosition,
                    payload: {
                        width,
                        top: isOverflow ? pageY - finalHeight : pageY + height,
                        left: I18nManager.isRTL ? screenWidth - width - pageX : pageX,
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
        if (selectedOptionLabel && searchable) {
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

    return {
        setPosition,
        onPressOption,
        onPressSection,
        onOutsidePress,
        onPressSelectControl,
    };
};
