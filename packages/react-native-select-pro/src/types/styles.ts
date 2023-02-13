import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type SelectStyles = {
    select?: SelectControlStyles;
    option?: OptionStyles;

    /**
     * Style for the options list container.
     */
    optionsList?: StyleProp<ViewStyle>;

    noOptions?: {
        /**
         *  Style for the no options container.
         */
        container?: StyleProp<ViewStyle>;

        /**
         *  Style for the no options text.
         */
        text?: StyleProp<TextStyle>;
    };
    sectionHeader?: SectionHeaderStyles;

    /**
     * Style for backdrop.
     */
    backdrop?: StyleProp<ViewStyle>;
};

export type SelectControlStyles = {
    /**
     * Style for the select.
     */
    container?: StyleProp<ViewStyle>;
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

    multiSelectedOption?: {
        /**
         *  Style for the selected option in select control.
         */
        container?: StyleProp<ViewStyle>;

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
    arrow?: {
        /**
         * Style for the arrow container.
         */
        container?: StyleProp<ViewStyle>;

        /**
         *  Style for the arrow icon.
         */
        icon?: StyleProp<ImageStyle>;
    };

    clear?: {
        /**
         * Style for the clear option button.
         */
        container?: StyleProp<ViewStyle>;
        /**
         *  Style for the clear option icon.
         */
        icon?: StyleProp<ImageStyle>;
    };

    /**
     * Style for the custom left icon.
     */
    leftIcon?: StyleProp<ImageStyle>;
};

export type OptionStyles = {
    /**
     * Style for the single option.
     */
    container?: StyleProp<ViewStyle>;

    /**
     * Style for the pressed single option.
     */
    pressed?: StyleProp<ViewStyle>;

    selected?: {
        /**
         * Style for the selected single option.
         */
        container?: StyleProp<ViewStyle>;

        /**
         * Style for the selected single option text.
         */
        text?: StyleProp<TextStyle>;
    };

    /**
     * Style for the single option text.
     */
    text?: StyleProp<TextStyle>;
};

export type SectionHeaderStyles = {
    /**
     * Style for the section header.
     */
    container?: StyleProp<ViewStyle>;

    clear?: {
        /**
         * Style for the section header clear icon.
         */
        icon?: StyleProp<ImageStyle>;
    };

    /**
     * Style for the pressed section header.
     */
    pressed?: StyleProp<ViewStyle>;

    selected?: {
        /**
         * Style for section header when all section options are selected
         */
        container?: StyleProp<ViewStyle>;

        /**
         * Style for section header text when all section options are selected.
         */
        text?: StyleProp<TextStyle>;
    };

    /**
     * Style for the section header text.
     */
    text?: StyleProp<TextStyle>;
};
