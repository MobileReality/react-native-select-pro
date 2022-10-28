import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Portal } from '@gorhom/portal';

import { Portals } from '../../constants/portals';
import { BORDER_WIDTH, COLORS, MAX_HEIGHT_LIST, SHAPE } from '../../constants/styles';
import { getReducedSectionData, isSectionOptionsType } from '../../helpers';
import { FlatOptionsList } from '../flat-options-list';
import { Option } from '../option';
import { OptionsListWrapper } from '../options-list-wrapper';
import { SectionOptionsList } from '../section-options-list';

import { useOptionsList } from './options-list.hook';
import type { OptionsListProps, RenderItemProps } from './options-list.types';

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
    const isSectionedOptions = isSectionOptionsType(optionsData);

    const { getItemLayout, measuredRef, findSelectedOption, resolveData } = useOptionsList({
        selectedOption,
        searchedOptions,
        searchValue,
        isOpened,
        optionsData,
        optionStyle,
    });

    const renderItem = <T,>({ item, index, section }: RenderItemProps<T>) => {
        const { value } = item;
        const isSelected = findSelectedOption(item);
        let optionIndex = index;
        const sectionTitle = section?.title;
        let sectionObj;
        if (isSectionedOptions) {
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
                {...{
                    optionSelectedStyle,
                    optionStyle,
                    optionTextStyle,
                    optionIndex,
                    onPressOption,
                    onSelect,
                }}
            />
        );
    };

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
                    {isSectionedOptions ? (
                        <SectionOptionsList
                            {...{
                                isOpened,
                                optionsData,
                                noOptionsText,
                                NoOptionsComponent,
                                getItemLayout,
                                renderItem,
                                sectionHeaderTextStyle,
                                sectionHeaderContainerStyle,
                                sectionListProps,
                                onPressOption,
                                selectedOption,
                                scrollToSelectedOption,
                            }}
                        />
                    ) : (
                        <FlatOptionsList
                            {...{
                                isOpened,
                                noOptionsText,
                                scrollToSelectedOption,
                                NoOptionsComponent,
                                selectedOptionIndex,
                                onPressOption,
                                resolveData,
                                getItemLayout,
                                renderItem,
                                flatListProps,
                            }}
                        />
                    )}
                </OptionsListWrapper>
            </Portal>
        </>
    );
};

type Styles = {
    modalOverlay: ViewStyle;
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
});
