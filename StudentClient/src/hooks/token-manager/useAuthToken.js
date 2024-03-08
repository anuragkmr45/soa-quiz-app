import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthToken = () => {

    const storeToken = async (value) => {
        try {
            const res = await AsyncStorage.setItem('authtoken', value);
            return res;
        } catch (e) {
            console.error('error while storing auth token: ', e)
        }
    };

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('authtoken');
            return value;
        } catch (e) {
            console.error('error while getting auth token: ', e)
        }
    };

    const removeToken = async () => {
        try {
            const value = await AsyncStorage.removeItem('authtoken');
            return value;
        } catch (e) {
            console.error('error while getting auth token: ', e)
        }
    };

    return {
        storeToken,
        getToken,
        removeToken
    };
};

export default useAuthToken;
