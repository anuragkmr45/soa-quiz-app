import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import useGetAndroidID from '../../hooks/background-services/useGetAndroidID.js'
import apiEndpoints from '../../services/api.js';
import useAuthToken from '../../hooks/token-manager/useAuthToken.js';

import { defaultStyling } from '../../constant/styles.js';
import LoginGif from '../../assest/image/auth-img.png'
import AuthFrmae from '../../components/frames/AuthFrame.jsx'

const LoginScreen = () => {

    // 2141011114
    // Anurag1234

    const [registrationNo, setRegistrationNo] = useState('2141011114');
    const [password, setPassword] = useState('Anurag1234');
    const [loading, setLoading] = useState(false)

    const deviceId = useGetAndroidID()
    const navigation = useNavigation();
    const { storeToken } = useAuthToken()

    const handleLogin = async () => {
        setLoading(true);
        try {
            if (registrationNo === '') {
                throw new Error('Registration number is required.');
            }

            if (password === '') {
                throw new Error('Password is required.');
            }

            if (registrationNo !== '' & password !== '') {
                const res = await apiEndpoints.login({
                    registrationNumber: registrationNo,
                    password: password,
                    androidId: deviceId
                });
                // console.log('login res: ', res)
                if (res.status === 200) {
                    await storeToken(res.data.token);
                    navigation.navigate('Home');
                }
            }

        } catch (error) {
            console.error('Error while login: ', error);
            alert('Invalid Credentials ');
        } finally {
            setLoading(false);
        }
    };

    const goToSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <AuthFrmae text='Login' img={LoginGif}>
            <TextInput
                style={styles.input}
                label="Registration No"
                value={registrationNo}
                onChangeText={text => setRegistrationNo(text)}
            />
            <TextInput
                style={styles.input}
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button} disabled={loading}>

                {
                    loading ? (
                        <Text style={{ color: 'white' }} >
                            Loading ...
                        </Text>
                    ) : (
                        <Text style={{ color: 'white' }} >
                            Login
                        </Text>
                    )
                }

            </Button>
            <TouchableHighlight>
                <Text style={styles.signupText} onPress={goToSignup}>
                    Not registered yet? Go to Signup
                </Text>
            </TouchableHighlight>
            {/* <TouchableHighlight>
                <Text style={[styles.signupText, { color: 'red' }]} onPress={goToSignup}>
                    Get Help
                </Text>
            </TouchableHighlight> */}
        </AuthFrmae>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'white',
        color: 'white',
    },
    button: {
        marginTop: 10,
        backgroundColor: defaultStyling.dark,
        borderRadius: 8,
        paddingVertical: 8
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
        color: defaultStyling.secondaryTextColor,
    },
});

export default LoginScreen;
