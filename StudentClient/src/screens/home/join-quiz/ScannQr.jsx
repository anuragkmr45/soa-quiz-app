import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions, StatusBar, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CryptoJS from 'react-native-crypto-js';
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from 'react-native-vision-camera';

import Loader from '../../../components/loading/Loader';
import apiEndpoints from '../../../services/api';
import { defaultStyling } from '../../../constant/styles';
// import CrossIcons from '../../../assest/icons/cross.png'

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

            if (res.status === 200) {
                const quizData = res.data;
                navigation.navigate('Quiz', { quizData: quizData });
            }
        } catch (error) {
            if (error.message === 'Request failed with status code 404') {
                Alert.alert('Quiz Already Joined', '');
            } else {
                Alert.alert('Close other programs running on device')
            }
        } finally {
            setLoading(false)
        }
    };

    const decryptData = (encryptedData) => {
        const secretKey = 'weirnf#$%$erfbn9[-2-2-verc0-2@';
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: async (codes) => {
            if (codes && codes.length > 0) {
                const qrData = JSON.parse(codes[0].value);

                const qrEexpiree = qrData.expireDate
                const encriptQuizId = qrData.quizId
                const encriptQuizPass = qrData.password

                const quizId = decryptData(encriptQuizId)
                const quizPassword = decryptData(encriptQuizPass)

                const currentTime = new Date().getTime();

                if (currentTime < qrEexpiree) {
                    await handleJoinQuiz(quizId, quizPassword);
                }

            }
        }
    });

    useEffect(() => {

        Alert.alert('Make Sure Your DND Is On', 'If any interruption occurs during the exam, your quiz may be submitted. , You have a total of 5 seconds to return to the quiz', [
            { text: 'Already Done', style: 'cancel' },
            { text: 'Enable DND', onPress: () => Linking.openSettings() }
        ])

        requestPermission();
    }, []);

    return (
        <View style={styles.container}>
            {/* <View style={{ borderWidth: 2 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                    <Image source={CrossIcons} />
                </TouchableOpacity>
            </View> */}
            {
                loading ? (
                    <Loader loading={loading} />
                ) : (
                    <View style={styles.cameraContainer}>
                        <StatusBar hidden={true} />
                        <View style={{ backgroundColor: defaultStyling.light, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 5 }}>
                            <Camera
                                hdr={true}
                                style={styles.qrScanner}
                                device={device}
                                isActive={true}
                                codeScanner={codeScanner}
                                focusable={true}
                                enableZoomGesture={true}
                            />
                        </View>
                        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                            <Text style={{ color: defaultStyling.danger, fontWeight: '600', fontSize: 20 }}>Caution ⚠ (Rules)</Text>
                            <Text>😡 Quizzy gets angry when minimized..</Text>
                            <Text>😒 Quizzy wants your attention, turn on "DND" mode.</Text>
                        </View>
                    </View>
                )
            }
        </View >
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultStyling.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        // ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    qrScanner: {
        width: width / 1.2,
        height: height / 2,
    },
});

export default ScannQr;
