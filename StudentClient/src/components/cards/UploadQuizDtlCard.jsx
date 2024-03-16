import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, TextInput, } from 'react-native-paper';
import { View, StyleSheet, Text, BackHandler, Image, TouchableOpacity } from 'react-native';
import TouchID from 'react-native-touch-id';
import { useCameraDevice } from 'react-native-vision-camera';

import QRImg from '../../assest/image/qr.png'
import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';

const UploadQuizDtlCard = ({ name }) => {
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
                            // BackHandler.exitApp()
                        }
                    })
                    .catch(error => {
                        console.error('error while fingerpritn auth: ', error)
                        // BackHandler.exitApp()
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
                    <View style={styles.qrCard}>
                        <TouchableOpacity onPress={handleToucIdAuth}>
                            <Image source={QRImg} style={styles.image} />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.text}>Welcome !! </Text>
                                <Text style={styles.text}>{name}</Text>
                            </View>
                            <Text style={[styles.text, { fontWeight: 'normal', fontSize: 14, marginVertical: '10%' }]}>Scan QR to attend the quiz</Text>
                        </View>
                    </View>
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
    qrCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
        padding: 10,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: defaultStyling.semidark,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    modalContent: {
        // backgroundColor: defaultStyling.dark,
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
