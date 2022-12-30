import type {
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';

export type SelectStyles = {
    /**
     * Style of select control
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
    /**
     * Style of section header when section data type is provided
     *
     * @category Styles
     */
    sectionHeader?: SectionHeaderStyles;
    /**
     * Style of backdrop when options list is opened
     *
     * @category Styles
     */
    backdrop?: StyleProp<ViewStyle>;
} & StyleProp<ViewStyle>;

export type SelectControlStyles = {
    /**
     *  Style of text in select control
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
     *  Style of buttons container in select control
     *
     *  @category Styles
     */
    buttons?: StyleProp<ViewStyle>;
    /**
     *  Style of selected option in select control if multiSelection is enabled
     *
     *  @category Styles
     */
    multiSelectedOption?: {
        /**
         *  Style of text in selected option if multiSelection is enabled
         *
         *  @category Styles
         */
        text?: StyleProp<TextStyle>;
    } & StyleProp<ViewStyle>;
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
     * Style of single option text
     *
     * @category Styles
     */
    text?: StyleProp<TextStyle>;
    /**
     * Style of selected single option
     *
     * @category Styles
     */
    selected?: StyleProp<ViewStyle>;
    /**
     * Style of selected single option text
     *
     * @category Styles
     */
    selectedText?: StyleProp<TextStyle>;
} & StyleProp<ViewStyle>;

export type OptionsListStyles = StyleProp<ViewStyle>;

export type SectionHeaderStyles = {
    /**
     * Style of section header title
     *
     * @category Styles
     */
    text?: StyleProp<TextStyle>;
    /**
     * Style of section header clear icon when all section options are selected
     *
     * @category Styles
     */
    clearIcon?: StyleProp<ImageStyle>;
    /**
     * Style of section header when all section options are selected
     *
     * @category Styles
     */
    selected?: StyleProp<ViewStyle>;
    /**
     * Style of section header title when all section options are selected
     *
     * @category Styles
     */
    selectedText?: StyleProp<TextStyle>;
} & StyleProp<ViewStyle>;

export type ClearOptionStyles = {
    /**
     *  Style of clear option button
     *
     *  @category Styles
     */
    button?: StyleProp<ViewStyle>;

    /**
     *  Style of clear option image
     *
     *  @category Styles
     */
    icon?: StyleProp<ImageStyle>;
};

export type ArrowIconStyles = {
    /**
     *  Style of arrow button
     *
     *  @category Styles
     */
    button?: StyleProp<ViewStyle>;
    /**
     *  Style of arrow image
     *
     *  @category Styles
     */
    icon?: StyleProp<ImageStyle>;
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
