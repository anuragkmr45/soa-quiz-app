import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CryptoJS from 'react-native-crypto-js';
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from 'react-native-vision-camera';

import Loader from '../../../components/loading/Loader';
import apiEndpoints from '../../../services/api';
import { defaultStyling } from '../../../constant/styles';
import CrossIcons from '../../../assest/icons/cross.png'

const ScannQr = () => {
    const { requestPermission } = useCameraPermission();
    const cameraType = Camera.getAvailableCameraDevices();

    const [loading, setLoading] = useState(false);

    const device = useCameraDevice('back', {
        physicalDevices: cameraType
    });

    const navigation = useNavigation();

    const handleJoinQuiz = async (id, pass) => {
        setLoading(true);
        try {
            const res = await apiEndpoints.joinQuiz({
                quizId: id ? id : quizId,
                password: pass ? pass : password
            });
            // console.log('quiz res: ', res)
            if (res.status === 200) {
                const quizData = res.data;
                // console.log('quizData: ', quizData);
                navigation.navigate('Quiz', { quizData: quizData });
            }
        } catch (error) {
            // console.log('inside ejoin quiz catch')
            if (error.message === 'Request failed with status code 404') {
                Alert.alert('Quiz Already Joined', '');
            } else {
                Alert.alert('Error', 'Something went while joining the quiz. Please try again later.');
            }
            // console.error('Error while joining quiz: ', error);
        } finally {
            setLoading(false)
        }
    };

    const decryptData = (encryptedData) => {
        const secretKey = 'abcd';
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: async (codes) => {
            if (codes && codes.length > 0) {
                const qrData = JSON.parse(codes[0].value);
                // console.log('qrData: ', qrData)
                const qrId = 'duniw7e8wfuc98nei3dwec';

                const qrEexpiree = qrData.expireDate
                const encriptQrId = qrData.qrUniqueId
                const encriptQuizId = qrData.quizId
                const encriptQuizPass = qrData.password

                const qrUniqueId = decryptData(encriptQrId)
                const quizId = decryptData(encriptQuizId)
                const quizPassword = decryptData(encriptQuizPass)

                const currentTime = new Date().getTime();

                if (qrUniqueId === qrId) {
                    if (currentTime < qrEexpiree) {
                        await handleJoinQuiz(quizId, quizPassword);
                    } else {
                        Alert.alert('Qr Expired', '');
                    }
                } else {
                    Alert.alert('Attend Quiz Using Quizzy', '');
                    return;
                }

            }
        }
    });

    useEffect(() => {
        requestPermission();
    }, []);

    return (
        <View style={styles.container}>
            {
                loading ? (
                    <Loader loading={loading} />
                ) : (
                    <View style={styles.cameraContainer}>
                        <StatusBar hidden={true} />
                        <View style={{ position: 'absolute', top: 20, right: 20 }}>
                            <TouchableOpacity style={{ height: 100 }} onPress={() => { navigation.navigate('Home') }}>
                                <Image source={CrossIcons} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: defaultStyling.light, borderRadius: 10, paddingVertical: 40, paddingHorizontal: 10 }}>
                            <Camera
                                style={styles.qrScanner}
                                device={device}
                                isActive={true}
                                codeScanner={codeScanner}
                            />
                        </View>
                    </View>
                )
            }
        </View>
    );
};

const { width, height } = Dimensions.get('window');
const qrScannerSize = Math.min(width, height) / 1.2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultStyling.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrScanner: {
        width: qrScannerSize,
        height: qrScannerSize,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: 'inherit',
        padding: 2,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default ScannQr;
