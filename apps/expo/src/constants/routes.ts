import { Animated } from '../examples/animated';
import { Basic } from '../examples/basic';
import { SelectBottomSheet } from '../examples/bottom-sheet';
import { Callbacks } from '../examples/callbacks';
import { CustomIcons } from '../examples/custom-icons';
import { CustomOptionsData } from '../examples/custom-options-data';
import { CustomStyles } from '../examples/custom-styles';
import { ModalExample } from '../examples/modal-example';
import { MultiSelect } from '../examples/multiselect';
import { MultiSelectSearchableWithSeparatedOptions } from '../examples/multiselect-searchable-with-separated-options';
import { MultiSelectWithDefaultOptions } from '../examples/multiselect-with-default-options';
import { MultiSelectWithHiddenOptions } from '../examples/multiselect-with-hidden-options';
import { MultiSelectWithSearchable } from '../examples/multiselect-with-searchable';
import { MultiSelectWithSeparatedOptions } from '../examples/multiselect-with-separated-options';
import { MultiSelectWithSeparatedOptionsStyled } from '../examples/multiselect-with-separated-options-styled';
import { NoBackdrop } from '../examples/no-backdrop';
import { Overflow } from '../examples/overflow';
import { OverriddenFlatListProps } from '../examples/overridden-flat-list-props';
import { RealExample } from '../examples/real-example';
import { Ref } from '../examples/ref';
import { RHF } from '../examples/rhf';
import { ScrollToSelectedOption } from '../examples/scroll-to-selected-option';
import { ScrollViewExample } from '../examples/scroll-view';
import { Searchable } from '../examples/searchable';
import { SearchableInModal } from '../examples/searchable-in-modal';
import { SearchableWithKeyboardAvoidView } from '../examples/searchable-with-keyboard-avoid-view';
import { Sections } from '../examples/sections';
import { SectionsWithMultiSelect } from '../examples/sections-with-multiselect';
import { SectionsWithSearchable } from '../examples/sections-with-searchable';
import { Selects } from '../examples/selects';
import { TextInputProps } from '../examples/text-input-props';

export const ROUTES = [
    {
        name: 'Basic',
        screen: Basic,
    },
    {
        name: 'Overridden FlatList Props',
        screen: OverriddenFlatListProps,
    },
    {
        name: 'Overflow',
        screen: Overflow,
    },
    {
        name: 'With React Hook Form',
        // eslint-disable-next-line react/jsx-pascal-case
        screen: RHF,
    },
    {
        name: 'Modal',
        screen: ModalExample,
    },
    {
        name: 'Selects',
        screen: Selects,
    },
    {
        name: 'Custom Styles',
        screen: CustomStyles,
    },
    {
        name: 'Ref',
        screen: Ref,
    },
    {
        name: 'Callbacks',
        screen: Callbacks,
    },
    {
        name: 'Custom Options Data',
        screen: CustomOptionsData,
    },
    {
        name: 'Scroll To Selected Option',
        screen: ScrollToSelectedOption,
    },
    {
        name: 'Searchable',
        screen: Searchable,
    },
    {
        name: 'Searchable In Modal',
        screen: SearchableInModal,
    },
    {
        name: 'Animated',
        screen: Animated,
    },
    {
        name: 'Custom Icons',
        screen: CustomIcons,
    },
    {
        name: 'MultiSelect',
        screen: MultiSelect,
    },
    {
        name: 'MultiSelect with Searchable',
        screen: MultiSelectWithSearchable,
    },
    {
        name: 'MultiSelect with Separated Options',
        screen: MultiSelectWithSeparatedOptions,
    },
    {
        name: 'MultiSelect searchable with Separated Options',
        screen: MultiSelectSearchableWithSeparatedOptions,
    },
    {
        name: 'MultiSelect searchable with Separated Options Styled',
        screen: MultiSelectWithSeparatedOptionsStyled,
    },
    {
        name: 'MultiSelect with Hidden Options',
        screen: MultiSelectWithHiddenOptions,
    },
    {
        name: 'MultiSelect with Default Options',
        screen: MultiSelectWithDefaultOptions,
    },
    {
        name: 'TextInputProps',
        screen: TextInputProps,
    },
    {
        name: 'Sections',
        screen: Sections,
    },
    {
        name: 'Sections with Searchable',
        screen: SectionsWithSearchable,
    },
    {
        name: 'Sections with MultiSelect',
        screen: SectionsWithMultiSelect,
    },
    {
        name: 'No Backdrop',
        screen: NoBackdrop,
    },
    {
        name: 'Bottom Sheet',
        screen: SelectBottomSheet,
    },
    {
        name: 'Real Example',
        screen: RealExample,
    },
    {
        name: 'Searchable with keyboard avoid view',
        screen: SearchableWithKeyboardAvoidView,
    },
    {
        name: 'Scroll view',
        screen: ScrollViewExample,
    },
];
