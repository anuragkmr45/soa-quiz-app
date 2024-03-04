import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useAppState } from '@react-native-community/hooks';
import RNSInfo from 'react-native-sensitive-info';

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState('');

    const TOKEN_KEY = 'authToken';

    const storeToken = async (newToken) => {
        try {
            const tokenString = JSON.stringify(newToken);
            // console.log('tokenString: ', tokenString)

            if (Platform.OS === 'ios') {
                // await Keychain.setGenericPassword(TOKEN_KEY, newToken);
            } else {
                await RNSInfo.setItem(TOKEN_KEY, tokenString, {
                    sharedPreferencesName: 'mySharedPrefs',
                    keychainService: 'myKeychain'
                });
            }
            setToken(tokenString);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    };

    const deleteToken = async () => {
        try {
            if (Platform.OS === 'ios') {
                // await Keychain.resetGenericPassword();
            } else {
                await RNSInfo.deleteItem(TOKEN_KEY, {
                    sharedPreferencesName: 'mySharedPrefs',
                    keychainService: 'myKeychain'
                });
            }
            setToken('');
        } catch (error) {
            console.error('Error deleting token:', error);
        }
    };

    const getToken = async () => {
        try {
            let storedToken = null;
            if (Platform.OS === 'ios') {
                // For iOS storage using Keychain, if needed
            } else {
                storedToken = await RNSInfo.getItem(TOKEN_KEY, {
                    sharedPreferencesName: 'mySharedPrefs',
                    keychainService: 'myKeychain'
                });
            }

            // Check if storedToken is a stringified JSON object
            if (storedToken && typeof storedToken === 'string') {
                // If it's a stringified JSON object, parse it to get the string token
                setToken(storedToken);
                return storedToken;
            } else {
                const tokenString = JSON.stringify(storedToken);
                setToken(tokenString);
                console.log(tokenString)
                return tokenString;
            }
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };


    // Custom hook to persist token storage across app lifecycle
    const appState = useAppState();
    useEffect(() => {
        if (appState === 'background' || appState === 'inactive') {
            storeToken(token);
        }
    }, [appState, token]);

    return (
        <TokenContext.Provider
            value={{
                storeToken,
                getToken,
                deleteToken,
            }}
        >
            {children}
        </TokenContext.Provider>
    );
};
