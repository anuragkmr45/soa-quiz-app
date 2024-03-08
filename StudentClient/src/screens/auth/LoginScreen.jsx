import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import apiEndpoints from '../../services/api.js';
import useAuthToken from '../../hooks/token-manager/useAuthToken.js';

import { defaultStyling } from '../../constant/styles.js';
import LoginGif from '../../assest/image/auth-img.png'
import AuthFrmae from '../../components/frames/AuthFrame.jsx'

const LoginScreen = () => {

    //     {
    //   "name": "John Doe",
    //   "registrationNumber": "123456789",
    //   "email": "john.doe@example.com",
    //   "password": "password123",
    //   "batch": "2023",
    //   "branch": "Computer Science",
    //   "section": "A",
    //   "course": "Bachelor of Science in Computer Science"
    // }



    const [registrationNo, setRegistrationNo] = useState('0987654321');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false)

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
                    password: password
                });

                if (res.status === 200) {
                    await storeToken(res.data.token);
                    navigation.navigate('Home');
                }
            }

        } catch (error) {
            console.error('Error while login: ', error);
            // alert('Login failed. Please check your credentials and try again.');
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
