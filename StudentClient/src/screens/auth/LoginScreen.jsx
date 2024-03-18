import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import useGetAndroidID from '../../hooks/background-services/useGetAndroidID.js'
import apiEndpoints from '../../services/api.js';
import useAuthToken from '../../hooks/token-manager/useAuthToken.js';

import { defaultStyling } from '../../constant/styles.js';
import LoginGif from '../../assest/image/signupHero.png'
import AuthFrmae from '../../components/frames/AuthFrame.jsx'
import Loader from '../../components/loading/Loader.jsx';

const LoginScreen = () => {

    // 2141011114
    // Anurag1234

    const [registrationNo, setRegistrationNo] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [isShowPass, setIsShowPass] = useState(false);

    const deviceId = useGetAndroidID()
    const navigation = useNavigation();
    const { storeToken } = useAuthToken()

    const handleLogin = async () => {
        setLoading(true);
        // console.log('deviceId: ', deviceId)
        try {
            if (registrationNo === '' || password === '') {
                Alert.alert('Input All Required Fields', '', [
                    { text: 'OK' },
                ])
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
            console.error('Error while login: ', error.message);

            if (error.message === 'Network Error') {
                Alert.alert('Somthering went wrong !!', 'Try again later', [
                    { text: 'OK' },
                ])
            } else {
                Alert.alert('Invalid Credentials', '', [
                    { text: 'OK' },
                ])
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? (
            <Loader loading={loading} />
        ) : (
            <AuthFrmae img={LoginGif}>
                <View style={{ height: '100%' }}>
                    <View
                        style={{
                            width: '15%',
                            height: 3,
                            backgroundColor: defaultStyling.dark,
                            elevation: 2,
                            marginVertical: '4%',
                            alignSelf: 'center',
                            borderRadius: 20
                        }}
                    />
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ color: defaultStyling.primaryText, fontSize: 40, fontWeight: '400' }}>
                            Sign in
                        </Text>
                        <View
                            style={{
                                width: '15%',
                                height: 2,
                                backgroundColor: defaultStyling.dark,
                                elevation: 2,
                                marginVertical: '4%'
                            }}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        label="Registration No"
                        value={registrationNo}
                        onChangeText={text => setRegistrationNo(text)}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={isShowPass ? false : true}
                        style={styles.input}
                        right={
                            <TextInput.Icon
                                // name=""
                                onPress={() => { setIsShowPass(!isShowPass) }}
                                style={{ backgroundColor: isShowPass ? defaultStyling.danger : defaultStyling.dark, padding: 0, height: 25, width: 25 }}
                            />
                        }
                    />

                    <View style={{ position: 'relative', top: 10, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

                        <Button
                            onPress={handleLogin}
                            style={{ borderWidth: 2, borderColor: defaultStyling.dark, backgroundColor: 'inherit', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 50 }}>
                            <Text style={{ color: defaultStyling.dark }}>Sign In</Text>
                        </Button>

                        <Button
                            onPress={() => { navigation.navigate('Signup') }}
                            style={{ borderWidth: 2, borderColor: defaultStyling.dark, backgroundColor: defaultStyling.dark, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 50 }}>
                            <Text style={{ color: defaultStyling.light }}>Sign Up</Text>
                        </Button>

                    </View>
                </View >
            </AuthFrmae >
        )
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: defaultStyling.light,
        color: defaultStyling.dark,
        marginVertical: 10
    },
    button: {
        marginTop: 10,
        backgroundColor: defaultStyling.semidark,
        borderRadius: 8,
        paddingVertical: 8,
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
        color: defaultStyling.semidark,
    },
});

export default LoginScreen;
