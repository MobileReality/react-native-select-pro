import React, { ReactNode } from 'react';

type Props = {
    expo: ReactNode;
    exampleLabel: string;
    githubName?: string;
}
export const TableExample = ({ expo, exampleLabel = "GitHub", githubName }: Props) => {
    return (
        <ul>
            <li>{expo}</li>
            { githubName && <li><a target="_blank" href={`https://github.com/MobileReality/react-native-select-pro/blob/v2/apps/expo/src/examples/${githubName}.tsx`}>{exampleLabel}</a></li> }
        </ul>
    )
}
