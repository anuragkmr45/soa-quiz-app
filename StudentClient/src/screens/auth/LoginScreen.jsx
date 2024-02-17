import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import apiEndpoints from '../../services/api.js';
import LoginGif from '../../assest/image/login.png'
import AuthFrmae from '../../components/frames/AuthFrame.jsx'
import { defaultStyling } from '../../constant/styles.js';

const LoginScreen = () => {
    const [registrationNo, setRegistrationNo] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            if (registrationNo === '') {
                alert('Registration no is required');
                return;
            }

            if (password === '') {
                alert('Password is required');
                return;
            }

            if (registrationNo !== '' && password !== '') {
                const res = await apiEndpoints.login({
                    registrationNumber: registrationNo,
                    password: password,
                });

                if (res.status === 200) {
                    navigation.navigate('Home');
                }

            }
        } catch (error) {
            console.error('Error while login: ', error);
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
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Login
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
        backgroundColor: 'white'
    },
    button: {
        marginTop: 10,
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
        color: defaultStyling.secondaryTextColor,
    },
});

export default LoginScreen;
