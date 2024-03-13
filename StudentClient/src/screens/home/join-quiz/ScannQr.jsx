import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Alert, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import FastImage from 'react-native-fast-image'
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from 'react-native-vision-camera';

import apiEndpoints from '../../../services/api';
import { defaultStyling } from '../../../constant/styles';

const ScannQr = () => {
    const { requestPermission } = useCameraPermission();
    const cameraType = Camera.getAvailableCameraDevices();

    const device = useCameraDevice('back', {
        physicalDevices: cameraType
    });

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

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
            Alert.alert('Error', 'An error occurred while joining the quiz. Please try again later.');
            console.error('Error while joining quiz: ', error);
        } finally {
            setLoading(false)
        }
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: async (codes) => {
            if (codes && codes.length > 0) {
                const qrData = JSON.parse(codes[0].value);
                // console.log('qrdata: ', qrData)
                await handleJoinQuiz(qrData.quizId, qrData.password);
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
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={loading}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <ActivityIndicator size="large" color="white" />
                                <Text style={styles.modalText}>Loading...</Text>
                            </View>
                        </View>
                    </Modal>
                ) : (
                    <Camera
                        style={styles.qrScanner}
                        device={device}
                        isActive={true}
                        codeScanner={codeScanner}
                    />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultStyling.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrScanner: {
        width: '90%',
        height: '50%',
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
    loadingImg: {
        width: 250,
        height: 250,
        // borderRadius: 25, 
    },
});

export default ScannQr;
