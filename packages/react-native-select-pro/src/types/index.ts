/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {
    FlatListProps,
    ImageProps,
    PressableProps,
    SectionListProps,
    TextInputProps,
    TextProps,
    TouchableWithoutFeedbackProps,
    ViewProps,
} from 'react-native';

import type { State } from '../state';

import type { OnChooseOption, OptionComponentType } from './shared';
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

export type OptionComponentProps = Pick<
    OptionComponentType,
    'isSelected' | 'option' | 'optionIndex'
> & {
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
    onSelect?: (option: OptionType<T>, optionIndex: number) => void;

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
     * Callback that is called when section is selected with section header
     *
     * @param options Selected options
     * @param optionIndexes Selected option indexes
     * @category Callback
     */
    onSectionSelect?: (options: OptionType<T>[], optionIndexes: number[]) => void;

    /**
     * Callback that is called when section is removed with section header
     *
     * @param options Selected options
     * @param optionIndexes Selected option indexes
     * @category Callback
     */
    onSectionRemove?: (options: OptionType<T>[], optionIndexes: number[]) => void;

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

    /**
     *  If `true` the selected option is pressable and the options list will be closed after the selected option is pressed.
     *
     *  @category Behaviour
     *  @default false
     */
    pressableSelectedOption?: boolean;

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
    flatListProps?: Omit<
        FlatListProps<OptionType>,
        'ref' | 'data' | 'getItemLayout' | 'renderItem' | 'keyExtractor'
    >;

    /**
     *  `SectionListProps` imported from `react-native`
     *
     *  @category Additional Features
     */
    sectionListProps?: Omit<
        SectionListProps<OptionType>,
        | 'ref'
        | 'renderSectionHeader'
        | 'sections'
        | 'getItemLayout'
        | 'renderItem'
        | 'keyExtractor'
        | 'onLayout'
    >;

    /**
     *  `PressableProps` for ClearOption imported from `react-native`
     *
     *  @category Additional Features
     */
    clearOptionButtonProps?: Omit<PressableProps, 'style' | 'onPress'>;

    /**
     *  `ImageProps` for ClearOption imported from `react-native`
     *
     *  @category Additional Features
     */
    clearOptionImageProps?: Omit<ImageProps, 'style'>;

    /**
     *  `ViewProps` for Arrow imported from `react-native`
     *
     *  @category Additional Features
     */
    arrowContainerProps?: Omit<ViewProps, 'style'>;

    /**
     *  `ImageProps` for Arrow imported from `react-native`
     *
     *  @category Additional Features
     */
    arrowImageProps?: Omit<ImageProps, 'style'>;

    backdropProps?: Omit<TouchableWithoutFeedbackProps, 'onPress'>;

    backdropChildProps?: Omit<ViewProps, 'style'>;

    optionButtonProps?: Omit<
        PressableProps,
        'ref' | 'style' | 'onPress' | 'accessibilityRole' | 'accessibilityState' | 'disabled'
    >;

    optionTextProps?: Omit<TextProps, 'style'>;

    selectLeftIconsProps?: Omit<ViewProps, 'style'>;
    selectRightIconsProps?: Omit<ViewProps, 'style'>;
    selectLeftIconImageProps?: Omit<ImageProps, 'style'>;
    noOptionsProps?: Omit<ViewProps, 'style'>;
    noOptionsTextProps?: Omit<TextProps, 'style'>;
    sectionHeaderButtonProps?: Omit<PressableProps, 'style' | 'onPress'>;
    sectionHeaderTextProps?: Omit<TextProps, 'style'>;
    sectionHeaderImageProps?: Omit<ImageProps, 'style'>;
    selectTextProps?: Omit<TextProps, 'style'>;

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
    selectInputProps?: Omit<
        TextInputProps,
        | 'ref'
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
