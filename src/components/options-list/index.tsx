import React, { ComponentProps, useRef } from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { Portal } from '@gorhom/portal';

import { Portals } from '../../constants/portals';
import { BORDER_WIDTH, COLORS, ITEM_HEIGHT, MAX_HEIGHT_LIST, SHAPE } from '../../constants/styles';
import type { OptionalToRequired } from '../../helpers';
import type { Position, State } from '../../state/types';
import type { OnOutsidePress, OnPressOptionType } from '../../types';
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
}: OptionsListProps) => {
    const ref = useRef<FlatList>(null);

    const resolveData = () => {
        if (!searchable) {
            return optionsData;
        }
        if (searchable && searchValue.length === 0) {
            return optionsData;
        }
        if (selectedOption && searchValue?.length > 0 && searchValue === selectedOption.label) {
            return optionsData;
        }
        return searchedOptions;
    };

    return (
        <>
            {isOpened && (
                <Portal hostName={Portals.SelectOutsideWrapper}>
                    <TouchableWithoutFeedback
                        accessibilityLabel={'Close a dropdown from outside'}
                        onPress={onOutsidePress}>
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
                        aboveSelectControl ? styles.overflown : styles.notOverflown,
                    ]}>
                    <FlatList
                        accessibilityLabel={isOpened ? 'Options list' : ''}
                        bounces={false}
                        data={resolveData()}
                        getItemLayout={(_data, index) => {
                            const height = StyleSheet.flatten(optionStyle)?.height;
                            const isNumber = typeof height === 'number';
                            return {
                                length: isNumber ? height : ITEM_HEIGHT,
                                offset: isNumber ? height * index : ITEM_HEIGHT * index,
                                index,
                            };
                        }}
                        keyExtractor={({ value }) => value}
                        keyboardShouldPersistTaps="handled"
                        persistentScrollbar={true}
                        ref={ref}
                        renderItem={({ item, index }) => {
                            const { value } = item;
                            const isSelected = value === selectedOption?.value;
                            const isScrollToSelectedOption =
                                isSelected && ref.current && scrollToSelectedOption;

                            if (isScrollToSelectedOption) {
                                ref.current.scrollToIndex({
                                    index,
                                    animated: false,
                                });
                            }

                            return (
                                <Option
                                    OptionComponent={OptionComponent}
                                    isSelected={isSelected}
                                    key={value}
                                    onPressOption={onPressOption}
                                    onSelect={onSelect}
                                    option={item}
                                    optionSelectedStyle={optionSelectedStyle}
                                    optionStyle={optionStyle}
                                    optionTextStyle={optionTextStyle}
                                />
                            );
                        }}
                        {...flatListProps}
                        ListEmptyComponent={
                            NoOptionsComponent || <NoOptions noOptionsText={noOptionsText} />
                        }
                    />
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
