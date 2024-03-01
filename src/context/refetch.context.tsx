import React, { createContext, useState } from 'react';

export const RefetchContext = createContext({
  refetchTrigger: false,
  triggerRefetch: () => {},
});

export const RefetchProvider = ({ children }: { children: React.ReactNode }) => {
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    const triggerRefetch = () => {
        setRefetchTrigger(prev => !prev);
    };

    return (
        <RefetchContext.Provider value={{ refetchTrigger, triggerRefetch }}>
            {children}
        </RefetchContext.Provider>
    );
};