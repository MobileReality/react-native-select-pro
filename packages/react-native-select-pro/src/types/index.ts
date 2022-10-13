/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { FlatListProps, SectionListProps, TextInputProps } from 'react-native';

import type { OnChooseOption, OptionProps } from '../components/option';
import type { State } from '../state/types';

import type { SelectStyles } from './styles';

export type OptionTypeRequired = {
    label: string;
    value: string;
};

export type SectionType = {
    title: string | undefined;
    index: number;
};

export type OptionType<T = unknown> = OptionTypeRequired & T & { section?: SectionType };

export type SectionOptionType = {
    title: string;
    data: OptionType[];
};

export type OptionsType = SectionOptionType[] | OptionType[];

export type OptionComponentProps = Pick<OptionProps, 'isSelected' | 'option'> & {
    onPressOption: OnChooseOption;
};

/**
 * `<Select />` component props
 */
export interface SelectProps extends SelectStyles {
    // ---REQUIRED--- //
    /**
     *  Options to show on the list
     *
     *  @category Required
     */
    options: OptionsType;

    // ---CALLBACKS--- //
    /**
     * Callback that is called when option is selected
     *
     * @param option Selected option
     * @param optionIndex Selected option index
     * @category Callback
     */
    onSelect?: (option: OptionType | null, optionIndex: number) => void;

    /**
     * Callback that is called when option(s) is cleared
     *
     * @param option removed option(s)
     * @param optionIndex removed option(s) index(es)
     * @category Callback
     */
    onRemove?: (option: OptionType | OptionType[] | null, optionIndex: number | number[]) => void;

    /**
     * Callback that is called when dropdown is opened
     *
     * @category Callback
     */
    onDropdownOpened?: () => void;

    /**
     * Callback that is called when dropdown is closed
     *
     * @category Callback
     */
    onDropdownClosed?: () => void;

    // ---TEXTS--- //
    /**
     * No options text
     *
     * @category Text
     * @default "No options"
     */
    noOptionsText?: string;

    /**
     * Placeholder text
     *
     * @category Text
     * @default "#808080"
     */
    placeholderText?: string;

    // ---ANIMATIONS--- //
    /**
     *  If `true` toggling the select is animated
     *
     *  @category Animations
     *  @default false
     */
    animated?: boolean;

    /**
     *  Animation duration in ms
     *
     *  @category Animations
     *  @default 200
     */
    animationDuration?: number;

    // ---BEHAVIOURS--- //
    /**
     *  If `true` enables a clear button to remove selected option
     *
     *  @category Behaviour
     *  @default true
     */
    clearable?: boolean;

    /**
     * If `true` close a dropdown after selected option
     *
     * @category Behaviour
     * @default true
     */
    closeDropdownOnSelect?: boolean;

    /**
     *  If `true` disable a select control
     *
     *  @category Behaviour
     *  @default true
     */
    disabled?: boolean;

    /**
     * If `true` options list is scrolled to the selected option
     *
     * @category Behaviour
     * @default true
     */
    scrollToSelectedOption?: boolean;

    /**
     *  If `true` hide select control arrow
     *
     *  @category Behaviour
     *  @default false
     */
    hideSelectControlArrow?: boolean;

    // ---ADDITIONAL-FEATURES--- //
    /**
     *  Set a default option
     *  @category Additional Features
     */
    defaultOption?: OptionType;

    /**
     *  `FlatListProps` imported from `react-native`
     *
     *  @category Additional Features
     */
    flatListProps?: Omit<FlatListProps<OptionType>, 'data' | 'renderItem' | 'ListEmptyComponent'>;

    /**
     *  `SectionListProps` imported from `react-native`
     *
     *  @category Additional Features
     */
    sectionListProps?: Omit<
        SectionListProps<OptionType>,
        'sections' | 'renderItem' | 'renderSectionHeader' | 'ListEmptyComponent'
    >;

    // ---SEARCH--- //
    /**
     *  If `true` let user search in a select options by typing in select
     *
     *  @default false
     *  @category Search
     */
    searchable?: boolean;

    /**
     *  Regex definition for searching options
     *
     *  @default (payload: string) => `(${payload})`
     *  @category Search
     */
    searchPattern?: (payload: string) => string;

    /**
     *  `TextInputProps` imported from `react-native`
     *
     *  @category Search
     */
    textInputProps?: Omit<
        TextInputProps,
        | 'ref'
        | 'accessibilityLabel'
        | 'editable'
        | 'placeholder'
        | 'placeholderTextColor'
        | 'style'
        | 'textAlign'
        | 'value'
        | 'onChangeText'
        | 'onPressIn'
    >;

    // ---MULTISELECT--- //
    /**
     *  if `true` then multi option can be picked
     *
     *  @category Multiselect
     *  @default false
     */
    multiSelection?: boolean;

    // ---CUSTOM-COMPONENT--- //
    /**
     * NoOptionsComponent
     *
     * @category Custom Component
     */
    NoOptionsComponent?: JSX.Element;
    /**
     * OptionComponent
     *
     * @param props OptionComponentProps
     * @category Custom Component
     */
    OptionComponent?: (props: OptionComponentProps) => JSX.Element;

    // ---COLORS--- //
    /**
     * Placeholder text color
     *
     * @category Colors
     * @default "Select..."
     */
    placeholderTextColor?: string;

    // ---ACCESSIBILITY--- //
    /**
     * selectControlClearOptionA11yLabel
     *
     * @category Accessibility
     * @default "Clear a chosen option"
     */
    selectControlClearOptionA11yLabel?: string;

    /**
     * selectControlOpenDropdownA11yLabel
     *
     * @category Accessibility
     * @default "Open a dropdown"
     */
    selectControlOpenDropdownA11yLabel?: string;
}

/**
 * `<Select />` component ref
 */
export interface SelectRef {
    /**
     * Clear a selected option
     */
    clear: () => void;
    /**
     * Open a dropdown
     */
    open: () => void;
    /**
     * Close a dropdown
     */
    close: () => void;
    /**
     * Get current state of select
     */
    getState: () => State;
}

/**
 * @ignore
 */
export type OnPressOptionType = (option: OptionType, optionIndex: number) => void;
/**
 * @ignore
 */
export type OnPressSelectControlType = () => void;
/**
 * @ignore
 */
export type OnOutsidePress = () => void;
export type OnSetPosition = () => void;
