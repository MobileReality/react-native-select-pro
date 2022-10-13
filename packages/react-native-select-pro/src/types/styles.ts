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
     * Styles of select control
     *
     * @category Styles
     */
    selectControlStyles?: SelectControlStyles;

    /**
     * Styles of optionsList
     *
     * @category Styles
     */
    optionsListStyles?: OptionsListStyles;

    /**
     * Style of container select control
     *
     * @category Styles
     */
    containerStyle?: StyleProp<ViewStyle>;
};

export type SelectControlStyles = {
    /**
     *  Style of text select control
     *
     *  @category Styles
     */
    textStyle?: StyleProp<TextStyle>;

    /**
     *  Style of select control
     *
     *  @category Styles
     */
    containerStyle?: StyleProp<ViewStyle>;

    /**
     *  Style of disabled select control
     *
     *  @category Styles
     */
    disabledStyle?: StyleProp<TextStyle>;

    /**
     *  Style of container buttons in select control
     *
     *  @category Styles
     */
    buttonsContainerStyle?: StyleProp<ViewStyle>;

    /**
     *  Custom multiselection option style
     *
     *  @category Styles
     */
    multiSelectionOptionStyle?: StyleProp<ViewStyle>;

    /**
     *  Styles of arrow in select control
     *
     *  @category Styles
     */
    arrowIconStyles?: ArrowIconStyles;

    /**
     *  Styles of clear option in select control
     *
     *  @category Styles
     */
    clearOptionStyles?: ClearOptionStyles;

    /**
     * Styles of custom left icon in select control
     *
     * @category Styles
     */
    customLeftIconStyles?: CustomLeftIconStyles;
};

export type ClearOptionStyles = {
    /**
     *  Style of clear option button
     *
     *  @category Styles
     */
    buttonStyle?: StyleProp<ViewStyle>;

    /**
     *  Hit Slop for clear option button
     *
     *  @category Styles
     */
    buttonHitSlop?: Insets;

    /**
     *  Style of clear option image
     *
     *  @category Styles
     */
    iconStyle?: StyleProp<ImageStyle>;
};

export type ArrowIconStyles = {
    /**
     *  Style of arrow image
     *
     *  @category Styles
     */
    iconStyle?: StyleProp<ImageStyle>;

    /**
     *  Custom select control arrow icon source
     *
     *  @category Custom Sources
     */
    iconSource?: ImageSourcePropType;
};

export type CustomLeftIconStyles = {
    /**
     *  Custom left icon styles
     *
     *  @category Styles
     */
    iconStyle?: StyleProp<ImageStyle>;

    /**
     *  Custom left icon source
     *
     *  @category Custom Sources
     */
    iconSource?: ImageSourcePropType;
};

export type OptionsListStyles = {
    /**
     *  Style of options list
     *
     *  @category Styles
     */
    containerStyle?: StyleProp<ViewStyle>;

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
     * Style of section header container when section data type is provided
     *
     * @category Styles
     */
    sectionHeaderContainerStyle?: StyleProp<ViewStyle>;

    /**
     * Style of section header title when section data type is provided
     *
     * @category Styles
     */
    sectionHeaderTextStyle?: StyleProp<TextStyle>;
};
