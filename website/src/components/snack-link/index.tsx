import React from 'react';

type SnackLinkProps = {
    name: string;
    contents: string;
};
export const SnackLink = ({ name, contents }: SnackLinkProps) => {
    const code = {
        'App.tsx': {
            type: 'CODE',
            contents,
        },
    };

    const url = `https://snack.expo.dev?files=${encodeURIComponent(
        JSON.stringify(code),
    )}&dependencies=@mobile-reality/react-native-select-pro`;

    return (
        <a href={url} target="_blank" aria-label={`Open ${name} example in Expo Snack`}>
            Link
        </a>
    );
};
