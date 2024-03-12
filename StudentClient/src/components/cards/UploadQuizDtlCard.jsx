import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, TextInput } from 'react-native-paper';
import { View, StyleSheet, Text, BackHandler } from 'react-native';
import TouchID from 'react-native-touch-id';

import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';

const UploadQuizDtlCard = () => {
    const [quizId, setQuizId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const navigation = useNavigation();

    const getCameraPermissions = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.CAMERA);
            console.log('Camera permissions : ', result);
            return result;
        } catch (error) {
            console.error('Error while fetching camera permission : ', error);
            throw error;
        }
    };
    const handleJoinQuiz = async () => {
        setLoading(true)
        try {
            await handleToucIdAuth()
            if (quizId !== '' && password !== '' && isAuth === true) {
                const res = await apiEndpoints.joinQuiz({ quizId: quizId, password: password })

                if (res.status === 200) {
                    const quizData = res.data
                    navigation.navigate('Quiz', { quizData: quizData })
                }
            }

        } catch (error) {
            alert('Quiz Ended !!')
            console.error('Error while joining quiz: ', error)
        } finally {
            setLoading(false)
        }
    };


    const optionalConfigObject = {
        title: 'Authentication Required To Join Quiz',
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Touch sensor', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: 'Cancel', // Android
        fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
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
                            setIsAuth(true)
                        } else {
                            setIsAuth(false)
                        }
                    })
                    .catch(error => {
                        BackHandler.exitApp()
                    })
            }
        })
    }

    useEffect(() => {

        // getCameraPermissions()
    }, [])

    return (
        <View style={styles.container}>

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
                                <Text style={{ color: 'white' }} >
                                    Loading ...
                                </Text>
                            </Button>
                        ) : (
                            <Button mode="outlined" onPress={handleJoinQuiz} style={styles.button}>
                                <Text style={{ color: 'white' }} >
                                    Join Quiz
                                </Text>
                            </Button>
                        )
                    }

                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'transparent',
        color: defaultStyling.dark
    },
    button: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: defaultStyling.dark,
    },
});

export default UploadQuizDtlCard;
