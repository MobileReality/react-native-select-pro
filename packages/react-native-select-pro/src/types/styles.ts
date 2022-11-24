import type {
    ImageSourcePropType,
    ImageStyle,
    Insets,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';

export type SelectStyles = {
    /**
     * Style of container select control
     *
     * @category Styles
     */
    select?: SelectControlStyles;
    /**
     * Style of single option
     *
     * @category Styles
     */
    option?: OptionStyles;
    /**
     *  Style of options list
     *
     *  @category Styles
     */
    optionsList?: OptionsListStyles;
} & StyleProp<ViewStyle>;

export type SelectControlStyles = {
    /**
     *  Style of text select control
     *
     *  @category Styles
     */
    text?: StyleProp<TextStyle>;
    /**
     *  Style of disabled select control
     *
     *  @category Styles
     */
    disabled?: StyleProp<TextStyle>;
    /**
     *  Style of container buttons in select control
     *
     *  @category Styles
     */
    buttons?: StyleProp<ViewStyle>;
    /**
     *  Style of container buttons in select control
     *
     *  @category Styles
     */
    multiSelectionOption?: StyleProp<ViewStyle>;
    /**
     *  Styles of arrow in select control
     *
     *  @category Styles
     */
    arrow?: ArrowIconStyles;
    /**
     *  Styles of clear option in select control
     *
     *  @category Styles
     */
    clear?: ClearOptionStyles;
    /**
     * Styles of custom left icon in select control
     *
     * @category Styles
     */
    leftIcon?: LeftIconStyles;
} & StyleProp<ViewStyle>;

export type OptionStyles = {
    /**
     * Style of selected single option
     *
     * @category Styles
     */
    selected?: StyleProp<ViewStyle>;
    /**
     * Style of single option text
     *
     * @category Styles
     */
    text?: StyleProp<TextStyle>;
} & StyleProp<ViewStyle>;

export type OptionsListStyles = {
    /**
     * Style of section header container when section data type is provided
     *
     * @category Styles
     */
    sectionHeader?: StyleProp<ViewStyle>;

    /**
     * Style of section header title when section data type is provided
     *
     * @category Styles
     */
    sectionTitle?: StyleProp<TextStyle>;
} & StyleProp<ViewStyle>;

export type ClearOptionStyles = {
    /**
     *  Style of clear option button
     *
     *  @category Styles
     */
    button?: StyleProp<ViewStyle>;

    /**
     *  Hit Slop for clear option button
     *
     *  @category Styles
     */
    hitSlop?: Insets;

    /**
     *  Style of clear option image
     *
     *  @category Styles
     */
    icon?: StyleProp<ImageStyle>;
};

export type ArrowIconStyles = {
    /**
     *  Style of arrow image
     *
     *  @category Styles
     */
    icon?: StyleProp<ImageStyle>;

    /**
     *  Custom select control arrow icon source
     *
     *  @category Custom Sources
     */
    source?: ImageSourcePropType;
};

export type LeftIconStyles = {
    /**
     *  Left icon styles
     *
     *  @category Styles
     */
    icon?: StyleProp<ImageStyle>;

    /**
     *  Left icon source
     *
     *  @category Custom Sources
     */
    source?: ImageSourcePropType;
};
