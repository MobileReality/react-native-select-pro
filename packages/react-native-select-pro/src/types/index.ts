/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {
    FlatListProps,
    ImageSourcePropType,
    ImageStyle,
    Insets,
    StyleProp,
    TextStyle,
    ViewStyle,
    TextInputProps,
} from 'react-native';

import type { OnChooseOption, OptionProps } from '../components/option';
import type { State } from '../state/types';

export type OptionTypeRequired = {
    label: string;
    value: string;
};

export type OptionType<T = unknown> = OptionTypeRequired & T;

export type OptionsType = OptionType[];

export type OptionComponentProps = Pick<
    OptionProps,
    'isSelected' | 'option'
> & {
    onPressOption: OnChooseOption;
};

/**
 * `<Select />` component props
 */
export interface SelectProps {
    //---REQUIRED---//
    /**
     *  Options to show on the list
     *
     *  @category Required
     */
    options: OptionsType;

    //---CALLBACKS---//
    /**
     * Callback that is called when option is selected
     *
     * @param option Selected option
     * @param optionIndex Selected option index
     * @category Callback
     */
    onSelect?: (option: OptionType | null, optionIndex: number) => void;

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

    //---TEXTS---//
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
     * @default "Select..."
     */
    placeholderText?: string;

    //---ANIMATIONS---//
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

    //---BEHAVIOURS---//
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

    //---ADDITIONAL-FEATURES---//
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
    flatListProps?: Omit<
        FlatListProps<OptionType>,
        'data' | 'renderItem' | 'ListEmptyComponent'
    >;

    //---SEARCH---//
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

    //---MULTISELECT---//
    /**
     *  if `true` then multi option can be picked
     *
     *  @category Multiselect
     *  @default false
     */
    multiSelection?: boolean;

    //---CUSTOM-COMPONENT---//
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

    //---CUSTOM-SOURCES---//
    /**
     *  Custom left icon source
     *
     *  @category Custom Sources
     */
    customLeftIconSource?: ImageSourcePropType;

    //---COLORS---//
    /**
     * Placeholder text color
     *
     * @category Colors
     * @default "Select..."
     */
    placeholderTextColor?: string;

    //---ACCESSIBILITY---//
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

    //---STYLES---//
    /**
     *  Style of arrow image
     *
     *  @category Styles
     */
    selectControlArrowImageStyle?: StyleProp<ImageStyle>;

    /**
     *  Style of text select control
     *
     *  @category Styles
     */
    selectControlTextStyle?: StyleProp<TextStyle>;

    /**
     *  Style of select control
     *
     *  @category Styles
     */
    selectControlStyle?: StyleProp<ViewStyle>;

    /**
     *  Style of disabled select control
     *
     *  @category Styles
     */
    selectControlDisabledStyle?: StyleProp<TextStyle>;

    /**
     *  Style of container buttons in select control
     *
     *  @category Styles
     */
    selectControlButtonsContainerStyle?: StyleProp<ViewStyle>;

    /**
     *  Style of clear option button
     *
     *  @category Styles
     */
    selectControlClearOptionButtonStyle?: StyleProp<ViewStyle>;

    /**
     *  Hit Slop for clear option button
     *
     *  @category Styles
     */
    selectControlClearOptionButtonHitSlop?: Insets;

    /**
     *  Style of clear option image
     *
     *  @category Styles
     */
    selectControlClearOptionImageStyle?: ImageStyle;

    /**
     * Style of container select control
     *
     * @category Styles
     */
    selectContainerStyle?: StyleProp<ViewStyle>;

    /**
     *  Style of options list
     *
     *  @category Styles
     */
    optionsListStyle?: StyleProp<ViewStyle>;

    /**
     * Style of single option
     *
     * @category Styles
     */
    optionStyle?: StyleProp<ViewStyle>;

    /**
     * Style of single option text
     *
     * @category Styles
     */
    optionTextStyle?: StyleProp<TextStyle>;

    /**
     * Style of selected single option
     *
     * @category Styles
     */
    optionSelectedStyle?: StyleProp<ViewStyle>;

    /**
     *  Custom left icon styles
     *
     *  @category Styles
     */
    customLeftIconStyles?: StyleProp<ImageStyle>;

    /**
     *  Custom multiselection option style
     *
     *  @category Styles
     */
    multiSelectionOptionStyle?: StyleProp<ViewStyle>;

    /**
     *  Other input props
     *
     *  @Search input props
     */
    inputProps?: TextInputProps;
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
export type OnPressOptionType = (
    option: OptionType,
    optionIndex: number,
) => void;
/**
 * @ignore
 */
export type OnPressSelectControlType = () => void;
/**
 * @ignore
 */
export type OnOutsidePress = () => void;
export type OnSetPosition = () => void;
