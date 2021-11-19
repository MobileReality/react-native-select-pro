import type {
    FlatListProps,
    ImageStyle,
    Insets,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';

export type OptionType = {
    label: string;
    value: string;
    [key: string]: any;
};

export type OptionsType = OptionType[];

/**
 * `<Select />` component props
 */
export interface SelectProps {
    /**
     *  Options to show on the list
     *
     *  @category Required
     */
    options: OptionsType;
    /**
     * Callback that is called when option is selected
     *
     * @param option Selected option
     * @category Common
     */
    onSelect?: (option: OptionType | null) => void;

    /**
     * Callback that is called when dropdown is opened
     *
     * @category Common
     */
    onDropdownOpened?: () => void;

    /**
     * Callback that is called when dropdown is closed
     *
     * @category Common
     */
    onDropdownClosed?: () => void;

    /**
     *  Set a default option
     *  @category Common
     */
    defaultOption?: OptionType;

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
     *  If `true` hide select control arrow
     *
     *  @default false
     *  @category Common
     */
    hideSelectControlArrow?: boolean;

    /**
     *  If `true` enables a clear button to remove selected option
     *
     *  @default true
     *  @category Common
     */
    clearable?: boolean;
    /**
     *  If `true` disable a select control
     *
     *  @default true
     *  @category Common
     */
    disabled?: boolean;
    /**
     *  `FlatListProps` imported from `react-native`
     *
     *  @category Common
     */
    flatListProps?: Omit<FlatListProps<OptionType>, 'data' | 'renderItem' | 'ListEmptyComponent'>;
    /**
     * If `true` close a dropdown after selected option
     *
     * @category Common
     * @default true
     */
    closeDropdownOnSelect?: boolean;
    /**
     * Placeholder text
     *
     * @category Common
     * @default "Select..."
     */
    placeholderText?: string;
    /**
     * No options text
     *
     * @category Common
     * @default "No options"
     */
    noOptionsText?: string;
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
     * selectControlCloseDropdownA11yLabel
     *
     * @category Accessibility
     * @default "Close a dropdown"
     */
    selectControlCloseDropdownA11yLabel?: string;
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
}

/**
 * @ignore
 */
export type OnPressOptionType = (option: OptionType) => void;
/**
 * @ignore
 */
export type OnPressSelectControlType = () => void;
/**
 * @ignore
 */
export type OnOutsidePress = () => void;
