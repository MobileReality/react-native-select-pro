import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { BORDER_WIDTH, COLORS, MAX_HEIGHT_LIST, SHAPE } from '../../constants/styles';
import { useOptionsListContext } from '../../context';
import { getReducedSectionData, isSectionOptionsType } from '../../helpers';
import { FlatOptionsList } from '../flat-options-list';
import { Option } from '../option';
import { OptionsListWrapper } from '../options-list-wrapper';
import { SectionOptionsList } from '../section-options-list';

import { useOptionsList } from './options-list.hooks';
import type { RenderItemProps } from './options-list.types';

export const OptionsList = () => {
    const {
        aboveSelectControl,
        openedPosition: { width, top, left },
        styles: mainStyles,
    } = useOptionsListContext();

    const { getItemLayout, measuredRef, findSelectedOption, resolveData } = useOptionsList({
        optionStyles: mainStyles?.optionsList,
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
                isSelected={isSelected}
                option={{ ...item, section: sectionObj }}
                {...{
                    optionIndex,
                }}
            />
        );
    };

    return (
        <OptionsListWrapper
            wrapperStyles={[
                styles.options,
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
};

type Styles = {
    options: ViewStyle;
    notOverflown: ViewStyle;
    overflown: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
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
