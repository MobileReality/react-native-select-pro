/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { FlatListProps, SectionListProps, TextInputProps } from 'react-native';

import type { OnChooseOption, OptionProps } from '../components/option/option.types';
import type { State } from '../state';

import type { SelectStyles } from './styles';

export type OptionTypeRequired = {
    label: string;
    value: string;
};

export type SectionType = {
    title: string | undefined;
    index: number;
};

export type CustomData<T> = T extends SectionOptionType<T> ? Pick<T, 'data'> : T;

export type OptionType<T = unknown> = OptionTypeRequired &
    CustomData<T> & { section?: SectionType };

export type SectionOptionType<T = unknown> = {
    title: string;
    data: OptionType<T>[];
};

export type OptionsType<T> = SectionOptionType<T>[] | OptionType<T>[];

export type OptionComponentProps = Pick<OptionProps, 'isSelected' | 'option'> & {
    onPressOption: OnChooseOption;
};

/**
 * `<Select />` component props
 */
export interface SelectProps<T = unknown> {
    // ---REQUIRED--- //
    /**
     *  Options to show on the list
     *
     *  @category Required
     */
    options: OptionsType<T>;

    // ---CALLBACKS--- //
    /**
     * Callback that is called when option is selected
     *
     * @param option Selected option
     * @param optionIndex Selected option index
     * @category Callback
     */
    onSelect?: (option: OptionType<T> | null, optionIndex: number) => void;

    /**
     * Callback that is called when option(s) is cleared
     *
     * @param option removed option(s)
     * @param optionIndex removed option(s) index(es)
     * @category Callback
     */
    onRemove?: (
        option: OptionType<T> | OptionType<T>[] | null,
        optionIndex: number | number[],
    ) => void;

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
     *  If provided value is `false` then animation is disabled
     *
     *  @category Animations
     *  @default true
     */
    animation?: boolean | number;

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
    hideArrow?: boolean;

    /**
     *  If `true` don't render Backdrop component
     *
     *  @category Behaviour
     *  @default false
     */
    noBackdrop?: boolean;

    // ---ADDITIONAL-FEATURES--- //
    /**
     *  Set a default option
     *  @category Additional Features
     */
    defaultOption?: OptionType<T>;

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

    /**
     * Styles
     *
     * @category Styles
     */
    styles?: SelectStyles;
}

/**
 * `<Select />` component ref
 */
export interface SelectRef<T = unknown> {
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
    getState: () => State<T>;
}

/**
 * @ignore
 */
export type OnPressOptionType<T> = (option: OptionType<T>, optionIndex: number) => void;
/**
 * @ignore
 */
export type OnPressSelectControlType = () => void;
/**
 * @ignore
 */
export type OnOutsidePress = () => void;
export type OnSetPosition = () => void;
