import { createContext, useContext } from 'react';

export const createSafeContext = <T extends Record<string, unknown> | null>() => {
    const context = createContext<T | undefined>(undefined);

    const useHookContext = () => {
        const value = useContext(context);
        if (value === undefined) {
            throw new Error('useContext must be inside a Provider with a value');
        }
        return value;
    };

    return [useHookContext, context.Provider] as const;
};
