import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const storeToken = (newToken) => {
        setToken(newToken);
    };

    const getToken = () => {
        return token;
    };

    const deleteToken = () => {
        setToken(null);
    };

    return (
        <TokenContext.Provider value={{ token, storeToken, getToken, deleteToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context.token;
};

export const useTokenActions = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useTokenActions must be used within a TokenProvider');
    }
    return {
        storeToken: context.storeToken,
        getToken: context.getToken,
        deleteToken: context.deleteToken,
    };
};
