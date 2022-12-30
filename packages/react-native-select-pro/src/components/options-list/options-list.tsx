import React, { forwardRef } from 'react';
import type { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { BORDER_WIDTH, COLORS, OPTIONS_LIST_HEIGHT, SHAPE } from '../../constants';
import { useOptionsListContext } from '../../context';
import { getReducedSectionData, isSectionOptionsType } from '../../helpers';
import { FlatOptionsList } from '../flat-options-list';
import { Option } from '../option';
import { OptionsListWrapper } from '../options-list-wrapper';
import { SectionOptionsList } from '../section-options-list';

import { useOptionsList } from './options-list.hooks';
import type { RenderItemProps } from './options-list.types';

export const OptionsList = forwardRef<View>((_, optionsListRef) => {
    const {
        aboveSelectControl,
        openedPosition: { width, top, left },
        styles: mainStyles,
    } = useOptionsListContext();

    const { getItemLayout, measuredRef, findSelectedOption, resolveData } = useOptionsList({
        optionStyles: mainStyles?.option,
    });

    const resolvedData = resolveData();
    const isSectionedOptions = isSectionOptionsType(resolvedData);

    const renderItem = <T,>({ item, index, section }: RenderItemProps<T>) => {
        const { value } = item;
        const isSelected = findSelectedOption(item);
        let optionIndex = index;
        const sectionTitle = section?.title;
        let sectionObj;
        if (isSectionedOptions) {
            optionIndex = getReducedSectionData(resolvedData).indexOf(item);
            sectionObj = {
                title: sectionTitle,
                index: resolvedData.findIndex((el) => el.title === sectionTitle),
            };
        }

        return (
            <Option
                key={value}
                ref={index === 0 ? measuredRef : undefined}
                option={{ ...item, section: sectionObj }}
                {...{
                    isSelected,
                    optionIndex,
                }}
            />
        );
    };

    return (
        <OptionsListWrapper
            ref={optionsListRef}
            wrapperStyles={[
                styles.optionsList,
                mainStyles?.optionsList,
                { top, left, width },
                aboveSelectControl ? styles.overflown : styles.notOverflown,
            ]}
        >
            {isSectionedOptions ? (
                <SectionOptionsList
                    {...{
                        resolvedData,
                        getItemLayout,
                        renderItem,
                    }}
                />
            ) : (
                <FlatOptionsList
                    {...{
                        resolvedData,
                        getItemLayout,
                        renderItem,
                    }}
                />
            )}
        </OptionsListWrapper>
    );
});

type Styles = {
    optionsList: ViewStyle;
    notOverflown: ViewStyle;
    overflown: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    optionsList: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: COLORS.WHITE,
        borderWidth: BORDER_WIDTH,
        height: OPTIONS_LIST_HEIGHT,
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

OptionsList.displayName = 'OptionsList';
