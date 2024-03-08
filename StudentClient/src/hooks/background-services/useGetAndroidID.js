import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';

const useGetAndroidID = () => {
    const [androidId, setAndroidId] = useState(null);

    useEffect(() => {
        const fetchAndroidDeviceId = async () => {
            try {
                const deviceId = await DeviceInfo.getUniqueId();
                setAndroidId(deviceId);
            } catch (error) {
                console.error('Error getting Android device ID:', error);
                setAndroidId(null);
            }
        };

        // Call the fetchAndroidDeviceId function
        fetchAndroidDeviceId();

        // Cleanup function (if needed)
        return () => { };
    }, []);

    return androidId;
};

export default useGetAndroidID;
