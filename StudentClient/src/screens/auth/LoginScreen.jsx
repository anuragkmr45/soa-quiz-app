import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import apiEndpoints from '../../services/api.js';
import { useToken } from '../../context/TokenContext.jsx';
import { defaultStyling } from '../../constant/styles.js';
import LoginGif from '../../assest/image/auth-img.png'
import AuthFrmae from '../../components/frames/AuthFrame.jsx'

const LoginScreen = () => {

    // reg no = 2141011114
    // pass = anurag1234

    const [registrationNo, setRegistrationNo] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken, token] = useState('')

    const navigation = useNavigation();
    const { storeToken, getToken } = useToken()

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
                    setAuthToken(res.data.token)
                    // storeToken(authToken)
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

    // const handleGetToken = async () => {
    //     try {
    //         const res = await getToken()
    //         return res;
    //     } catch (error) {
    //         console.error('Error while fetching token data: ', error);
    //         return;
    //     }
    // }

    useEffect(() => {


        // if (token !== '') {
        //     console.log('token : ', token)
        //     navigation.navigate('Home');
        // }

    }, [])

    // console.log('token: ', token)

    // console.log('authToken: ', authToken)
    // console.log('------------------------------------------')

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
        backgroundColor: 'white',
        color: defaultStyling.dark
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
