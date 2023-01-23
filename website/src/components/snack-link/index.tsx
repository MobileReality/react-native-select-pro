import React from 'react';

type SnackLinkProps = {
    name: string;
    contents: string;
    label?: string;
};
export const SnackLink = ({ name, contents, label = 'Expo' }: SnackLinkProps) => {
    const code = {
        'App.tsx': {
            type: 'CODE',
            contents,
        },
    };

    const url = `https://snack.expo.dev?files=${encodeURIComponent(
        JSON.stringify(code),
    )}&dependencies=@mobile-reality/react-native-select-pro@2.0.0&supportedPlatforms=ios,android`;

    return (
        <a href={url} target="_blank" aria-label={`Open ${name} example in Expo Snack`}>
            {label}
        </a>
    );
};
