import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useAppState } from '@react-native-community/hooks';
// import * as Keychain from 'react-native-keychain'; 
import RNSInfo from 'react-native-sensitive-info'; // Import react-native-sensitive-info

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState('');

    const TOKEN_KEY = 'authToken';

    const storeToken = async (newToken) => {
        try {
            if (Platform.OS === 'ios') {
                // await Keychain.setGenericPassword(TOKEN_KEY, newToken);
            } else {
                await RNSInfo.setItem(TOKEN_KEY, newToken, {
                    sharedPreferencesName: 'mySharedPrefs',
                    keychainService: 'myKeychain'
                });
            }
            setToken(newToken);
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
                // const credentials = await Keychain.getGenericPassword();
                // storedToken = credentials ? credentials.password : null;
            } else {
                storedToken = await RNSInfo.getItem(TOKEN_KEY, {
                    sharedPreferencesName: 'mySharedPrefs',
                    keychainService: 'myKeychain'
                });
            }
            if (storedToken) {
                setToken(storedToken);
                return storedToken;
            } else {
                return null;
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
