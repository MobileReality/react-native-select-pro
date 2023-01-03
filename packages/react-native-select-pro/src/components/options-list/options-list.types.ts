import type { OptionalToRequired } from '../../helpers';
import type { OptionStyles } from '../../types/styles';

export type UseOptionsListProps = OptionalToRequired<{
    optionStyles: OptionStyles | undefined;
}>;
