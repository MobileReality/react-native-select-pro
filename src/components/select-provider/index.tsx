import React, { ReactNode } from 'react';
import { PortalHost, PortalProvider } from '@gorhom/portal';

import { Portals } from '../../constants/portals';

type Props = {
    children: ReactNode;
};

const PortalHosts = () => {
    return (
        <>
            <PortalHost name={Portals.SelectOutsideWrapper} />
            <PortalHost name={Portals.Select} />
        </>
    );
};

export const SelectProvider = ({ children }: Props) => {
    return (
        <PortalProvider>
            {children}
            <PortalHosts />
        </PortalProvider>
    );
};

export const SelectModalProvider = ({ children }: Props) => {
    return (
        <>
            <PortalHosts />
            {children}
        </>
    );
};
