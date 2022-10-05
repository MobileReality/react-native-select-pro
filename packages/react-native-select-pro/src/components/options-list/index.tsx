import React, { ComponentProps, useCallback } from 'react';
import {
    AccessibilityInfo,
    findNodeHandle,
    FlatList,
    SectionList,
    SectionListData,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
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
import { getReducedSectionData } from '../../helpers/getReducedSectionData';
import { isSectionOptionsType } from '../../helpers/isSectionOptionsType';
import type { OptionalToRequired } from '../../helpers/types/OptionalToRequired';
import type { Position, State } from '../../state/types';
import type {
    OnOutsidePress,
    OnPressOptionType,
    OptionType,
} from '../../types';
import { NoOptions } from '../no-options';
import { Option } from '../option';
import { OptionsListWrapper } from '../options-list-wrapper';
import type { Select } from '../select';

type FromSelectComponentProps = Pick<
    ComponentProps<typeof Select>,
    | 'flatListProps'
    | 'optionSelectedStyle'
    | 'optionStyle'
    | 'optionTextStyle'
    | 'scrollToSelectedOption'
    | 'noOptionsText'
    | 'onSelect'
    | 'animated'
    | 'animationDuration'
    | 'optionsListStyle'
    | 'NoOptionsComponent'
    | 'OptionComponent'
    | 'searchable'
    | 'multiSelection'
    | 'sectionHeaderContainerStyle'
    | 'sectionHeaderTextStyle'
    | 'sectionListProps'
>;

type OptionsListProps = OptionalToRequired<
    FromSelectComponentProps &
        Pick<
            State,
            | 'isOpened'
            | 'openedPosition'
            | 'optionsData'
            | 'selectedOption'
            | 'searchedOptions'
            | 'searchValue'
            | 'selectedOptionIndex'
        > & {
            onOutsidePress: OnOutsidePress;
            onPressOption: OnPressOptionType;
        } & Pick<Position, 'aboveSelectControl'>
>;

export const OptionsList = ({
    aboveSelectControl,
    flatListProps,
    onPressOption,
    selectedOption,
    animated,
    animationDuration,
    searchedOptions,
    searchValue,
    searchable,
    isOpened,
    onOutsidePress,
    multiSelection,
    openedPosition: { width, top, left },
    optionsData,
    optionSelectedStyle,
    optionStyle,
    optionTextStyle,
    noOptionsText,
    scrollToSelectedOption,
    onSelect,
    optionsListStyle,
    NoOptionsComponent,
    OptionComponent,
    selectedOptionIndex,
    sectionHeaderContainerStyle,
    sectionHeaderTextStyle,
    sectionListProps,
}: OptionsListProps) => {
    const selectedOptionTyped = selectedOption as OptionType;

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
        [isOpened],
    );

    const resolveData = () => {
        if (isSectionOptionsType(optionsData)) {
            return optionsData;
        }
        if (!searchable) {
            return optionsData;
        }
        if (searchable && searchValue.length === 0) {
            return optionsData;
        }
        if (
            selectedOptionTyped &&
            searchValue?.length > 0 &&
            searchValue === selectedOptionTyped.label
        ) {
            return optionsData;
        }
        return searchedOptions;
    };

    const resolveIsSelected = (item: OptionType) => {
        if (!multiSelection) {
            return item.value === selectedOptionTyped?.value;
        }
        return (
            selectedOption &&
            (selectedOption as OptionType[]).find(
                (option) => item.value === option.value,
            )
        );
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
        const isSelected = !!resolveIsSelected(item);
        let optionIndex = index;
        const sectionTitle = section?.title;
        let sectionObj;
        if (isSectionOptionsType(optionsData)) {
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
        <View
            style={[
                styles.sectionHeaderContainerStyle,
                sectionHeaderContainerStyle,
            ]}
        >
            <Text
                style={[styles.sectionHeaderTextStyle, sectionHeaderTextStyle]}
            >
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
                    animated={animated}
                    animationDuration={animationDuration}
                    isOpened={isOpened}
                    wrapperStyles={[
                        styles.options,
                        optionsListStyle,
                        { top, left, width },
                        aboveSelectControl
                            ? styles.overflown
                            : styles.notOverflown,
                    ]}
                >
                    {isSectionOptionsType(optionsData) ? (
                        <SectionList
                            testID="Options list"
                            accessibilityLabel="Options list"
                            accessibilityState={{
                                expanded: isOpened,
                            }}
                            bounces={false}
                            sections={optionsData} // disabled multiselect and searchable
                            getItemLayout={getItemLayout}
                            keyExtractor={({ value }) => value}
                            keyboardShouldPersistTaps="handled"
                            persistentScrollbar={true}
                            renderSectionHeader={renderSectionHeader}
                            renderItem={renderItem}
                            {...sectionListProps}
                            ListEmptyComponent={
                                NoOptionsComponent || (
                                    <NoOptions noOptionsText={noOptionsText} />
                                )
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
                                NoOptionsComponent || (
                                    <NoOptions noOptionsText={noOptionsText} />
                                )
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
