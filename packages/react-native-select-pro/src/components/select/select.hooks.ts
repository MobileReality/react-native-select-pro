import { useCallback, useContext, useEffect, useImperativeHandle } from 'react';
import type { LayoutRectangle } from 'react-native';
import { I18nManager, useWindowDimensions } from 'react-native';

import { APPROX_STATUSBAR_HEIGHT } from '../../constants';
import {
    getReducedSectionData,
    getSectionOptionsIndexes,
    isValidDefaultOption,
    selectedOptionResolver,
} from '../../helpers';
import type {
    OnOutsidePress,
    OnPressOptionType,
    OnPressSelectControlType,
    OptionType,
    SelectRef,
} from '../../types';
import { isSectionOptionsType } from '../../types';
import { SelectModalContext } from '../select-provider';

import type { UseSelect } from './select.types';

export const useSelect = <T>({
    ref,
    selectControlRef,
    state,
    defaultOption,
    disabled,
    closeOptionsListOnSelect,
    searchable,
    multiple,
    dispatch,
    onRemove,
    onSelectOpened,
    onSelectClosed,
    onSectionSelect,
    onSectionRemove,
    optionsListRef,
    onSelect,
}: UseSelect<T>) => {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const valueY = useContext(SelectModalContext);
    const { isOpened, selectedOption, optionsData, searchInputRef, selectedOptionIndex } = state;
    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);
    const isSectionedOptions = isSectionOptionsType(optionsData);

    const open = useCallback(() => {
        dispatch({ type: 'open' });
    }, [dispatch]);

    const close = useCallback(() => {
        dispatch({ type: 'close' });
    }, [dispatch]);

    useEffect(() => {
        const setDefaultOption = () => {
            const isValidPassDefaultOption = isValidDefaultOption(defaultOption);

            if (optionsData.length === 0 || !isValidPassDefaultOption) {
                return;
            }

            const foundIndex = isSectionedOptions
                ? getReducedSectionData(optionsData).indexOf(defaultOption)
                : optionsData.indexOf(defaultOption);

            dispatch({
                type: 'selectOption',
                payload: {
                    selectedOption: defaultOption,
                    selectedOptionIndex: foundIndex,
                },
            });
        };

        setDefaultOption();
    }, [optionsData, defaultOption, isSectionedOptions, dispatch]);

    const measureSelectInWindow = () => {
        return new Promise<LayoutRectangle>((resolve) => {
            if (selectControlRef.current) {
                selectControlRef.current.measureInWindow((x, y, width, height) => {
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

        const isOverflow = y + height + optionsListHeight > screenHeight;
        const top = isOverflow
            ? y - optionsListHeight
            : y + height - valueY + APPROX_STATUSBAR_HEIGHT;
        const left = I18nManager.getConstants().isRTL ? screenWidth - width - x : x;

        dispatch({
            type: 'setOptionsListPosition',
            payload: {
                width,
                top,
                left,
                aboveSelectControl: isOverflow,
            },
        });
    };

    const onPressSelectControl: OnPressSelectControlType = async () => {
        if (disabled) {
            return;
        }

        if (isOpened) {
            close();
            return;
        }

        if (selectControlRef.current) {
            open();
            await setOptionsListPosition();
        }
    };

    useImperativeHandle(
        ref,
        (): SelectRef<T> => ({
            clear: () => {
                dispatch({
                    type: 'selectOption',
                    payload: { selectedOption: null, selectedOptionIndex: -1 },
                });
                if (onRemove && selectedOption) {
                    onRemove(selectedOption, selectedOptionIndex);
                }
            },
            open: async () => {
                if (selectControlRef.current) {
                    open();
                    await setOptionsListPosition();
                }
            },
            close,
            getState: () => state,
        }),
    );

    const hideKeyboardIfNeeded = useCallback(
        () => searchInputRef?.current?.blur(),
        [searchInputRef],
    );

    const resolveOption = useCallback(
        (option: OptionType<T>, optionIndex: number) => {
            if (!multiple) {
                return {
                    selectedOption: option,
                    selectedOptionIndex: optionIndex,
                };
            }

            const foundSelectedOption = selectedOptions?.find(
                (selectedOption: OptionType<T>) => selectedOption.value === option.value,
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
        },
        [isSectionedOptions, multiple, optionsData, selectedOptionIndex, selectedOptions],
    );

    const onPressOption: OnPressOptionType<T> = useCallback(
        (option: OptionType<T>, optionIndex: number) => {
            if (closeOptionsListOnSelect) {
                close();
            }

            dispatch({
                type: 'selectOption',
                payload: resolveOption(option, optionIndex),
            });

            if (searchable) {
                if (multiple) {
                    dispatch({ type: 'setSearchValue', payload: '' });
                } else {
                    dispatch({
                        type: 'setSearchValue',
                        payload: option.label,
                    });
                }
            }

            if (option) {
                hideKeyboardIfNeeded();
            }

            // callback
            if (onSelect) {
                onSelect(option, optionIndex);
            }
        },
        [
            close,
            closeOptionsListOnSelect,
            dispatch,
            hideKeyboardIfNeeded,
            multiple,
            onSelect,
            resolveOption,
            searchable,
        ],
    );

    const onPressSection = (title: string) => {
        if (closeOptionsListOnSelect && multiple) {
            close();
        }

        if (!multiple || !isSectionedOptions) {
            return;
        }

        const resolveOption = () => {
            const sectionOptions = optionsData.find((item) => item.title === title)?.data ?? [];
            const formattedSectionOptions = sectionOptions.map((item) => ({
                ...item,
                section: {
                    title,
                    index: optionsData.findIndex((el) => el.title === title),
                },
            }));
            const newSectionOptions = formattedSectionOptions.filter(
                (item) => !selectedOptions?.some((selected) => selected.value === item.value),
            );

            if (newSectionOptions.length === 0 && selectedOptions) {
                onSectionRemove?.(
                    formattedSectionOptions,
                    getSectionOptionsIndexes(optionsData, formattedSectionOptions),
                );
                const restOptions = selectedOptions.filter(
                    (item) =>
                        !formattedSectionOptions.some((selected) => selected.value === item.value),
                );

                return {
                    selectedOption: restOptions.length > 0 ? restOptions : null,
                    selectedOptionIndex: restOptions
                        ? getSectionOptionsIndexes(optionsData, restOptions)
                        : -1,
                };
            }

            const mergedOptions = selectedOptions
                ? selectedOptions.concat(newSectionOptions)
                : newSectionOptions;

            const optionsIndexes = getSectionOptionsIndexes(optionsData, mergedOptions);

            onSectionSelect?.(
                newSectionOptions,
                getSectionOptionsIndexes(optionsData, newSectionOptions),
            );

            return {
                selectedOption: mergedOptions,
                selectedOptionIndex: optionsIndexes.length > 0 ? optionsIndexes : -1,
            };
        };

        dispatch({
            type: 'selectOption',
            payload: resolveOption(),
        });

        if (searchable) {
            dispatch({ type: 'setSearchValue', payload: '' });
        }
    };

    const onOutsidePress: OnOutsidePress = () => {
        if (selectedOptionLabel && searchable) {
            dispatch({
                type: 'setSearchValue',
                payload: selectedOptionLabel,
            });
        }

        close();
        hideKeyboardIfNeeded();
    };

    useEffect(() => {
        if (isOpened) {
            onSelectOpened?.();
        } else {
            onSelectClosed?.();
        }
    }, [isOpened, onSelectOpened, onSelectClosed]);

    return {
        setOptionsListPosition,
        onPressOption,
        onPressSection,
        onOutsidePress,
        onPressSelectControl,
    };
};
