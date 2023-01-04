import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type SelectStyles = {
    /**
     * Style for the select.
     */
    select?: SelectControlStyles;

    /**
     * Style for the single option.
     */
    option?: OptionStyles;

    /**
     * Style for the options list container.
     */
    optionsList?: StyleProp<ViewStyle>;

    /**
     *  Style for the no options container.
     */
    noOptions?: StyleProp<ViewStyle> & {
        /**
         *  Style for the no options text.
         */
        text?: StyleProp<TextStyle>;
    };

    /**
     * Style for the section header.
     */
    sectionHeader?: StyleProp<ViewStyle> & SectionHeaderStyles;

    /**
     * Style for backdrop.
     */
    backdrop?: StyleProp<ViewStyle>;
} & StyleProp<ViewStyle>;

export type SelectControlStyles = {
    /**
     *  Style for the select text.
     */
    text?: StyleProp<TextStyle>;

    /**
     *  Style for the disabled select.
     */
    disabled?: StyleProp<ViewStyle>;

    /**
     *  Style for the buttons container the right side.
     */
    buttons?: StyleProp<ViewStyle>;

    /**
     *  Style for the selected option in select control.
     */
    multiSelectedOption?: StyleProp<ViewStyle> & {
        /**
         *  Style for the selected option text in select control.
         */
        text?: StyleProp<TextStyle>;

        /**
         * Style for the pressed selected option in select control.
         */
        pressed?: StyleProp<ViewStyle>;
    };

    /**
     *  Style for the arrow.
     */
    arrow?: StyleProp<ViewStyle> & {
        /**
         *  Style for the arrow icon.
         */
        icon?: StyleProp<ImageStyle>;
    };

    /**
     *  Style for the clear option button.
     */
    clear?: StyleProp<ViewStyle> & {
        /**
         *  Style for the clear option icon.
         */
        icon?: StyleProp<ImageStyle>;
    };

    /**
     * Style for the custom left icon.
     */
    leftIcon?: StyleProp<ImageStyle>;
} & StyleProp<ViewStyle>;

export type OptionStyles = StyleProp<ViewStyle> & {
    /**
     * Style for the single option text.
     */
    text?: StyleProp<TextStyle> & {
        /**
         * Style for the selected single option text.
         */
        selected?: StyleProp<TextStyle>;
    };

    /**
     * Style for the selected single option.
     */
    selected?: StyleProp<ViewStyle>;

    /**
     * Style for the pressed single option.
     */
    pressed?: StyleProp<ViewStyle>;
};

export type SectionHeaderStyles = {
    /**
     * Style for the section header text.
     */
    text?: StyleProp<TextStyle> & {
        selected?: StyleProp<TextStyle>;
    };

    clear?: {
        /**
         * Style for the section header clear icon.
         */
        icon?: StyleProp<ImageStyle>;
    };

    /**
     * Style for section header when all section options are selected.
     */
    selected?: StyleProp<ViewStyle>;
    /**
     * Style for the pressed section header.
     */
    pressed?: StyleProp<ViewStyle>;
};
