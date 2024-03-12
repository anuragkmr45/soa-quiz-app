import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, TextInput, } from 'react-native-paper';
import { View, StyleSheet, Text, BackHandler, ImageBackground, TouchableOpacity } from 'react-native';
import TouchID from 'react-native-touch-id';
import { useCameraDevice } from 'react-native-vision-camera';

import IMg from '../../assest/image/scannQrBg.png'
import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';

const UploadQuizDtlCard = () => {
    const [quizId, setQuizId] = useState('');
    const [password, setPassword] = useState('');
    const [deviceCapability, setDeviceCapability] = useState(false)
    const [loading, setLoading] = useState(false);

    const device = useCameraDevice('back')
    const navigation = useNavigation();

    const handleJoinQuiz = async (id, pass) => {
        setLoading(true)
        try {
            if (password !== '' && quizId !== '') {
                const res = await apiEndpoints.joinQuiz({
                    quizId: id ? id : quizId,
                    password: pass ? pass : password
                })

                if (res.status === 200) {
                    const quizData = res.data
                    setQuizId('')
                    setPassword('')
                    navigation.navigate('Quiz', { quizData: quizData })
                }
            }

        } catch (error) {
            alert('Quiz Room Ended !!')
            // console.error('Error while joining quiz: ', error)
        } finally {
            setLoading(false)
        }
    };

    const handleCheckDeviceCapability = async () => {
        try {
            if (device !== null) {
                setDeviceCapability(true)
            }
        } catch (error) {
            console.error('error while checking camera status : '.error)
            setDeviceCapability(false)
        }
    }

    const optionalConfigObject = {
        title: 'Authentication Required To Join Quiz',
        imageColor: '#e00606',
        imageErrorColor: '#ff0000',
        sensorDescription: 'Touch sensor',
        sensorErrorDescription: 'Failed',
        cancelText: 'Cancel',
        fallbackLabel: 'Show Passcode',
        unifiedErrors: false,
    };

    const handleToucIdAuth = () => {
        TouchID.isSupported(optionalConfigObject).then((biometryType) => {
            if (biometryType === 'FaceID') {
                console.log('FaceID is supported.');
            } else {
                TouchID.authenticate('', optionalConfigObject)
                    .then((success) => {
                        if (success === true) {
                            navigation.navigate('ScannQR')
                        } else {
                            BackHandler.exitApp()
                        }
                    })
                    .catch(error => {
                        // console.error('error while fingerpritn auth: ', error)
                        BackHandler.exitApp()
                    })
            }
        })
    }

    useEffect(() => {

        handleCheckDeviceCapability();
    }, [])

    return (
        <View style={styles.container}>

            {
                deviceCapability ? (
                    <TouchableOpacity
                        mode="outlined"
                        onPress={handleToucIdAuth}
                        style={[
                            styles.button,
                            { width: '90%', height: '60%', justifyContent: 'center', alignItems: 'center' }
                        ]}
                    >
                        <ImageBackground
                            source={IMg}
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ color: defaultStyling.primaryTextColor, fontWeight: 'bold', fontSize: 25 }}>
                                Scan QR To Attend Quiz
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                ) : (
                    <Card style={styles.card}>
                        <Text
                            style={{
                                color: 'white',
                                alignSelf: 'center',
                                fontWeight: '500',
                                fontSize: 25
                            }}>Attend Live Quiz</Text>
                        <Card.Content>
                            <TextInput
                                label="Quiz ID"
                                value={quizId}
                                onChangeText={text => setQuizId(text)}
                                style={styles.input}
                            />
                            <TextInput
                                label="Password"
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                                style={styles.input}
                            />

                            {
                                loading ? (
                                    <Button mode="outlined" style={styles.button}>
                                        <Text style={{ color: defaultStyling.primaryTextColor }} >
                                            Loading ...
                                        </Text>
                                    </Button>
                                ) : (
                                    <Button
                                        mode="outlined"
                                        onPress={() => handleJoinQuiz(quizId, password)}
                                        style={styles.button}>
                                        <Text style={{ color: defaultStyling.primaryTextColor }} >
                                            Join Quiz
                                        </Text>
                                    </Button>
                                )
                            }

                        </Card.Content>
                    </Card>
                )
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    modalContent: {
        backgroundColor: defaultStyling.dark,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 20,
        height: '50%'
    },
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '90%',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'transparent',
        color: defaultStyling.dark
    },
    button: {
        // marginTop: 10,
        borderRadius: 10,
        backgroundColor: defaultStyling.dark,
        // height: '50%',
        // width: '90%'
    },
});

export default UploadQuizDtlCard;
