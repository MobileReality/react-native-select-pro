import React, { useCallback } from 'react';
import type { SectionListData, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import {
    AccessibilityInfo,
    findNodeHandle,
    FlatList,
    SectionList,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Portal } from '@gorhom/portal';

import { Portals } from '../../constants/portals';
import {
    BORDER_WIDTH,
    COLORS,
    FONT_SIZE,
    ITEM_HEIGHT,
    MAX_HEIGHT_LIST,
    PADDING,
    SHAPE,
} from '../../constants/styles';
import { getReducedSectionData, isSectionOptionsType } from '../../helpers';
import type { OptionType } from '../../types';
import { NoOptions } from '../no-options';
import { Option } from '../option';
import { OptionsListWrapper } from '../options-list-wrapper';

import type { OptionsListProps } from './options-list.types';

export const OptionsList = ({
    aboveSelectControl,
    flatListProps,
    onPressOption,
    selectedOption,
    animation,
    searchedOptions,
    searchValue,
    isOpened,
    onOutsidePress,
    openedPosition: { width, top, left },
    optionsData,
    noOptionsText,
    scrollToSelectedOption,
    onSelect,
    NoOptionsComponent,
    OptionComponent,
    selectedOptionIndex,
    sectionListProps,
    optionsListStyles,
}: OptionsListProps) => {
    const {
        optionSelectedStyle,
        optionStyle,
        optionTextStyle,
        sectionHeaderContainerStyle,
        sectionHeaderTextStyle,
        containerStyle,
    } = optionsListStyles ?? {};

    let selectedOptionValue = '';
    let selectedOptionLabel = '';
    let selectedOptions: OptionType[] | null = null;
    const optionsWithSections = isSectionOptionsType(optionsData);

    if (selectedOption) {
        if (Array.isArray(selectedOption)) {
            selectedOptions = selectedOption;
        } else {
            selectedOptionValue = selectedOption.value;
            selectedOptionLabel = selectedOption.value;
        }
    }

    const flatList = useCallback(
        (node: FlatList | null) => {
            if (node !== null) {
                const isScrollToSelectedOption =
                    scrollToSelectedOption &&
                    selectedOptionIndex >= 0 &&
                    typeof selectedOptionIndex === 'number';

                if (isScrollToSelectedOption) {
                    try {
                        node.scrollToIndex({
                            index: selectedOptionIndex,
                            animated: false,
                        });
                        // eslint-disable-next-line no-empty
                    } catch {}
                }
            }
        },
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [scrollToSelectedOption, selectedOptionIndex, onPressOption],
    );

    const measuredRef = useCallback(
        (node: TouchableOpacity | null) => {
            if (node !== null) {
                const reactTag = findNodeHandle(node);
                if (reactTag) {
                    AccessibilityInfo.setAccessibilityFocus(reactTag);
                }
            }
        },
        // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isOpened],
    );

    const resolveData = () => {
        if (optionsWithSections || searchValue === selectedOptionLabel) {
            return optionsData;
        }
        return searchedOptions;
    };

    const findSelectedOption = (item: OptionType) => {
        if (selectedOptionValue) {
            return item.value === selectedOptionValue;
        }
        if (selectedOptions) {
            return selectedOptions.some((option) => item.value === option.value);
        }
        return false;
    };

    const renderItem = <T,>({
        item,
        index,
        section,
    }: {
        item: OptionType;
        index: number;
        section?: SectionListData<T>;
    }) => {
        const { value } = item;
        const isSelected = findSelectedOption(item);
        let optionIndex = index;
        const sectionTitle = section?.title;
        let sectionObj;
        if (optionsWithSections) {
            optionIndex = getReducedSectionData(optionsData).indexOf(item);
            sectionObj = {
                title: sectionTitle,
                index: optionsData.findIndex((el) => el.title === sectionTitle),
            };
        }
        return (
            <Option
                key={value}
                ref={index === 0 ? measuredRef : undefined}
                OptionComponent={OptionComponent}
                isSelected={isSelected}
                option={{ ...item, section: sectionObj }}
                optionSelectedStyle={optionSelectedStyle}
                optionStyle={optionStyle}
                optionTextStyle={optionTextStyle}
                optionIndex={optionIndex}
                onPressOption={onPressOption}
                onSelect={onSelect}
            />
        );
    };

    const getItemLayout = <T,>(_data: T, index: number) => {
        const height = StyleSheet.flatten(optionStyle)?.height;
        const isNumber = typeof height === 'number';
        return {
            length: isNumber ? height : ITEM_HEIGHT,
            offset: isNumber ? height * index : ITEM_HEIGHT * index,
            index,
        };
    };

    const renderSectionHeader = <T,>(info: { section: SectionListData<T> }) => (
        <View style={[styles.sectionHeaderContainerStyle, sectionHeaderContainerStyle]}>
            <Text style={[styles.sectionHeaderTextStyle, sectionHeaderTextStyle]}>
                {info.section.title}
            </Text>
        </View>
    );

    return (
        <>
            {isOpened && (
                <Portal hostName={Portals.SelectOutsideWrapper}>
                    <TouchableWithoutFeedback
                        accessibilityLabel="Close a dropdown from outside"
                        accessibilityRole="button"
                        onPress={onOutsidePress}
                    >
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                </Portal>
            )}
            <Portal hostName={Portals.Select}>
                <OptionsListWrapper
                    animation={animation}
                    isOpened={isOpened}
                    wrapperStyles={[
                        styles.options,
                        containerStyle,
                        { top, left, width },
                        aboveSelectControl ? styles.overflown : styles.notOverflown,
                    ]}
                >
                    {optionsWithSections ? (
                        <SectionList
                            testID="Options list"
                            accessibilityLabel="Options list"
                            accessibilityState={{
                                expanded: isOpened,
                            }}
                            bounces={false}
                            sections={optionsData} // search and multiselect are disabled
                            getItemLayout={getItemLayout}
                            keyExtractor={({ value }) => value}
                            keyboardShouldPersistTaps="handled"
                            persistentScrollbar={true}
                            renderSectionHeader={renderSectionHeader}
                            renderItem={renderItem}
                            {...sectionListProps}
                            ListEmptyComponent={
                                NoOptionsComponent ?? <NoOptions noOptionsText={noOptionsText} />
                            }
                        />
                    ) : (
                        <FlatList
                            ref={flatList}
                            testID="Options list"
                            accessibilityLabel="Options list"
                            accessibilityState={{
                                expanded: isOpened,
                            }}
                            bounces={false}
                            data={resolveData()}
                            getItemLayout={getItemLayout}
                            keyExtractor={({ value }) => value}
                            keyboardShouldPersistTaps="handled"
                            persistentScrollbar={true}
                            renderItem={renderItem}
                            {...flatListProps}
                            ListEmptyComponent={
                                NoOptionsComponent ?? <NoOptions noOptionsText={noOptionsText} />
                            }
                        />
                    )}
                </OptionsListWrapper>
            </Portal>
        </>
    );
};

type Styles = {
    modalOverlay: ViewStyle;
    sectionHeaderTextStyle: TextStyle;
    sectionHeaderContainerStyle: ViewStyle;
    options: ViewStyle;
    notOverflown: ViewStyle;
    overflown: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    options: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: COLORS.WHITE,
        borderWidth: BORDER_WIDTH,
        maxHeight: MAX_HEIGHT_LIST,
        elevation: 5,
    },
    notOverflown: {
        borderTopWidth: 0,
        borderBottomRightRadius: SHAPE,
        borderBottomLeftRadius: SHAPE,
    },
    overflown: {
        borderBottomWidth: 0,
        borderTopRightRadius: SHAPE,
        borderTopLeftRadius: SHAPE,
    },
    sectionHeaderTextStyle: {
        fontSize: FONT_SIZE,
        color: COLORS.BLACK,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    sectionHeaderContainerStyle: {
        padding: PADDING,
        backgroundColor: COLORS.WHITE,
    },
});
