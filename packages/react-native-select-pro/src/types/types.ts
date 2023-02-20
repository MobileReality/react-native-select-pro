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
import type { Themes } from '../themes';

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

/**
 * `<Select />` component props
 */
export interface SelectProps<T = unknown> {
    /**
     *  An array of objects that represents the available options for a `Select`.
     */
    options: OptionsType<T>;

    /**
     *  An options list open-close animation can be enabled or disabled using a boolean parameter.
     *  The duration of the animation can be set using a number parameter.
     *  If you pass 0 as the duration, the animation is still occur but will be instantaneous.
     *
     *  @default true | 200
     */
    animation?: boolean | number;

    /**
     *  Show a clear button to remove selected option.
     *
     *  @default true
     */
    clearable?: boolean;

    /**
     * Close the options list after selected option.
     *
     * @default true
     */
    closeOptionsListOnSelect?: boolean;

    /**
     *  An object that represents the default option for a `Select`.
     */
    defaultOption?: OptionType<T>;

    /**
     *  Disable a `Select` pressable.
     *
     *  @default false
     */
    disabled?: boolean;

    /**
     *  Determines whether a `Select` component should have a `Backdrop` component.
     *
     *  @default true
     */
    hasBackdrop?: boolean;

    /**
     *  Determines the arrow icon should be displayed.
     *
     *  @default false
     */
    hideArrow?: boolean;

    /**
     *  Determines whether a `Select` component should allow the user to select multiple options.
     *
     *  @default false
     */
    multiple?: boolean;

    /**
     * Determines the text that should be displayed when there are no available options in a `Select` component.
     *
     * @default "No options"
     */
    noOptionsText?: string;

    /**
     * Determines the placeholder text that should be displayed in a `Select` component when no option is selected.
     *
     * @default "Select..."
     */
    placeholderText?: string;

    /**
     * Determines the color of the placeholder text in a `Select` component.
     *
     * @default "#808080"
     */
    placeholderTextColor?: string;

    /**
     *  Determines whether the selected option should still be pressable after it has been selected.
     *
     *  @default true
     */
    pressableSelectedOption?: boolean;

    /**
     * Determines whether a Select component should automatically scroll to the selected option when the options list is opened.
     *
     * @default true
     */
    scrollToSelectedOption?: boolean;

    /**
     *  Determines whether a `Select` component should include a search field that allows the user to filter the options by keyword.
     *
     *  @default false
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
     * An object that represents the styles for a `Select` component.
     *
     * @category Styles
     */
    styles?: SelectStyles;

    /**
     * CALLBACKS
     */

    /**
     * Called when section is selected with section header.
     *
     * @param options Selected options
     * @param optionIndexes Selected option indexes
     */
    onSectionSelect?: (options: OptionType<T>[], optionIndexes: number[]) => void;

    /**
     * Called when section is removed with section header.
     *
     * @param options Selected options
     * @param optionIndexes Selected option indexes
=     */
    onSectionRemove?: (options: OptionType<T>[], optionIndexes: number[]) => void;

    /**
     * Callback that is called when an option is selected
     *
     * @param option Selected option
     * @param optionIndex Selected option index
     */
    onSelect?: (option: OptionType<T>, optionIndex: number) => void;

    /**
     * Called when text is changed in select input.
     *
     * @param text Text in select input.
     */
    onSelectChangeText?: (text: string) => void;

    /**
     * Called when selected is opened.
     **/
    onSelectOpened?: () => void;

    /**
     * Called when dropdown is closed.
     */
    onSelectClosed?: () => void;

    /**
     * Callback that is called when a single option is cleared
     *
     * @param option removed option
     * @param optionIndex removed option index
     * @category Callback
     */
    onRemove?: (option: OptionType<T>, optionIndex: number) => void;

    /**
     * CUSTOMIZABLE PROPS
     */

    /**
     *  Override the arrow props.
     */
    arrowContainerProps?: Omit<ViewProps, 'style'>;

    /**
     *  Override the arrow image props.
     */
    arrowImageProps?: Omit<ImageProps, 'style'>;

    /**
     * Override the backdrop child element props.
     */
    backdropChildProps?: Omit<ViewProps, 'style'>;

    /**
     *  Override the backdrop element props.
     */
    backdropProps?: Omit<TouchableWithoutFeedbackProps, 'onPress'>;

    /**
     *  Override the clear option button props.
     */
    clearOptionButtonProps?: Omit<PressableProps, 'style' | 'onPress'>;

    /**
     *  Override the clear option image props.
     */
    clearOptionImageProps?: Omit<ImageProps, 'style'>;

    /**
     * Override the options list props.
     */
    flatListProps?: Omit<
        FlatListProps<OptionType<T>>,
        'ref' | 'data' | 'getItemLayout' | 'renderItem' | 'keyExtractor'
    >;

    /**
     * Override the no options element props.
     */
    noOptionsProps?: Omit<ViewProps, 'style'>;

    /**
     * Override the no options text props.
     */
    noOptionsTextProps?: Omit<TextProps, 'style'>;

    /**
     * Override the option button props.
     */
    optionButtonProps?: Omit<
        PressableProps,
        'ref' | 'style' | 'onPress' | 'accessibilityRole' | 'accessibilityState' | 'disabled'
    >;

    /**
     * Override the option text props.
     */
    optionTextProps?: Omit<TextProps, 'style'>;

    /**
     * Override the select container props.
     */
    selectContainerProps?: Omit<PressableProps, 'ref' | 'style' | 'onPress'>;

    /**
     *  Override the select input props.
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

    /**
     * Override the select left icon image props.
     */
    selectLeftIconImageProps?: Omit<ImageProps, 'style'>;

    /**
     * Override the select left icons props.
     */
    selectLeftIconsProps?: Omit<ViewProps, 'style'>;

    /**
     * Override the select right icons props.
     */
    selectRightIconsProps?: Omit<ViewProps, 'style'>;

    /**
     * Override the select text props.
     */
    selectTextProps?: Omit<TextProps, 'style'>;

    /**
     * Override the section header button props.
     */
    sectionHeaderButtonProps?: Omit<PressableProps, 'style' | 'onPress'>;

    /**
     * Override the section header image props.
     */
    sectionHeaderImageProps?: Omit<ImageProps, 'style'>;

    /**
     * Override the section header text props
     */
    sectionHeaderTextProps?: Omit<TextProps, 'style'>;

    /**
     * Override the sections options list props.
     */
    sectionListProps?: Omit<
        SectionListProps<OptionType<T>>,
        | 'ref'
        | 'renderSectionHeader'
        | 'sections'
        | 'getItemLayout'
        | 'renderItem'
        | 'keyExtractor'
        | 'onLayout'
    >;

    /**
     * Pre-prepared styles for light and dark theme. They can be overwritten.
     */
    theme?: Themes;
}

/**
 * `<Select />` component ref
 */
export interface SelectRef<T = unknown> {
    /**
     * Open a dropdown
     */
    open: () => void;

    /**
     * Close a dropdown
     */
    close: () => void;

    /**
     * Clear a selected option(s)
     */
    clear: () => {
        removedSelectedOption?: OptionType<T> | null;
        removedSelectedOptionIndex?: number;
        removedSelectedOptions?: OptionType<T>[] | null;
        removedSelectedOptionsIndexes?: number[];
    };

    /**
     * Get current state of select
     */
    getState: () => State<T>;
}
