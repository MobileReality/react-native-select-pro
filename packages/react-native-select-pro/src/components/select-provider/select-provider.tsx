import type { ReactNode } from 'react';
import React, { createContext } from 'react';
import { PortalHost, PortalProvider } from '@gorhom/portal';

import { APPROX_STATUSBAR_HEIGHT, Portals } from '../../constants';

type Props = {
    children: ReactNode;
};

const PortalHosts = () => {
    return (
        <>
            <PortalHost name={Portals.Backdrop} />
            <PortalHost name={Portals.OptionsList} />
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

export const SelectModalContext = createContext(0);

export const SelectModalProvider = ({ children }: Props) => {
    return (
        <SelectModalContext.Provider value={APPROX_STATUSBAR_HEIGHT}>
            <PortalHosts />
            {children}
        </SelectModalContext.Provider>
    );
};
