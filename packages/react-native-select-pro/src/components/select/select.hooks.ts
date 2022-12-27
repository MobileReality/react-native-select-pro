import { useContext, useEffect, useImperativeHandle } from 'react';
import type { LayoutRectangle } from 'react-native';
import { I18nManager, useWindowDimensions } from 'react-native';

import { isSectionOptionsType, isValidDefaultOption } from '../../helpers';
import {
    getReducedSectionData,
    getSectionOptionsIndexes,
    selectedOptionResolver,
} from '../../helpers';
import { Action } from '../../state';
import type {
    OnOutsidePress,
    OnPressOptionType,
    OnPressSelectControlType,
    OptionType,
    SelectRef,
} from '../../types';
import { SelectModalContext } from '../select-provider';

import type { UseSelect } from './select.types';

export const useSelect = <T>({
    ref,
    containerRef,
    state,
    defaultOption,
    disabled,
    closeDropdownOnSelect,
    searchable,
    multiSelection,
    dispatch,
    onRemove,
    onDropdownOpened,
    onDropdownClosed,
    optionsListRef,
}: UseSelect<T>) => {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const valueY = useContext(SelectModalContext);
    const { isOpened, selectedOption, optionsData, searchInputRef, selectedOptionIndex } = state;
    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);
    const isSectionedOptions = isSectionOptionsType(optionsData);

    useEffect(() => {
        const isValidPassDefaultOption = isValidDefaultOption(defaultOption);

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
    }, [optionsData, defaultOption, isSectionedOptions, dispatch]);

    const measureSelectInWindow = () => {
        return new Promise<LayoutRectangle>((resolve) => {
            if (containerRef.current) {
                containerRef.current.measureInWindow((x, y, width, height) => {
                    resolve({ x, y, width, height });
                });
            }
        });
    };

    const measureOptionsListInWindow = () => {
        return new Promise<Pick<LayoutRectangle, 'height'>>((resolve) => {
            if (optionsListRef.current) {
                optionsListRef.current.measureInWindow((_x, _y, _width, height) => {
                    resolve({ height });
                });
            }
        });
    };

    const setOptionsListPosition = async () => {
        const { x, y, width, height } = await measureSelectInWindow();
        const { height: optionsListHeight } = await measureOptionsListInWindow();

        const isOverflow = x + height + optionsListHeight > screenHeight;

        dispatch({
            type: Action.SetOptionsListPosition,
            payload: {
                width,
                top: isOverflow ? y - optionsListHeight : y + height - valueY,
                left: I18nManager.getConstants().isRTL ? screenWidth - width - x : x,
                aboveSelectControl: isOverflow,
            },
        });
    };

    const onPressSelectControl: OnPressSelectControlType = async () => {
        if (isOpened) {
            dispatch({
                type: Action.Close,
            });
            return;
        }
        if (containerRef.current) {
            dispatch({
                type: Action.Open,
            });
        }
        await setOptionsListPosition();
    };

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
                    void setOptionsListPosition();
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

    const hideKeyboardIfNeeded = () => searchInputRef?.current?.blur();

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
            const optionsIndexes = mergedOptions
                .map((item) => resolvedOptionsData.findIndex(({ value }) => value === item.value))
                .filter((item): item is number => item !== null);

            return {
                selectedOption: mergedOptions,
                selectedOptionIndex: optionsIndexes.length > 0 ? [...optionsIndexes] : -1,
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
            const sectionOptions = optionsData.find((item) => item.title === title)?.data;
            const formattedSectionOptions =
                sectionOptions
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

            if (formattedSectionOptions.length === 0 && selectedOptions) {
                const restOptions = selectedOptions.filter(
                    (item) => !sectionOptions?.some((selected) => selected.value === item.value),
                );

                return {
                    selectedOption: restOptions.length > 0 ? restOptions : null,
                    selectedOptionIndex: restOptions
                        ? getSectionOptionsIndexes(optionsData, restOptions)
                        : -1,
                };
            }

            const mergedOptions = selectedOptions
                ? selectedOptions.concat(formattedSectionOptions)
                : formattedSectionOptions;

            const optionsIndexes = getSectionOptionsIndexes(optionsData, mergedOptions);

            return {
                selectedOption: mergedOptions,
                selectedOptionIndex: optionsIndexes.length > 0 ? optionsIndexes : -1,
            };
        };

        dispatch({
            type: Action.SelectOption,
            payload: resolveOption(),
        });

        if (searchable) {
            dispatch({ type: Action.SetSearchValue, payload: '' });
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
        setOptionsListPosition,
        onPressOption,
        onPressSection,
        onOutsidePress,
        onPressSelectControl,
    };
};
