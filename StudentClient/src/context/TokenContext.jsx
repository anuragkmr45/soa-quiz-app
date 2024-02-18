import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const storeToken = (newToken) => {
        setToken(newToken);
        // You can also store the token in AsyncStorage for persistence
    };

    const getToken = () => token;

    const deleteToken = () => {
        setToken(null);
        // You can also remove the token from AsyncStorage if stored
    };

    return (
        <TokenContext.Provider
            value={{
                token,
                storeToken,
                getToken,
                deleteToken,
            }}
        >
            {children}
        </TokenContext.Provider>
    );
};
