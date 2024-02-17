import React, { useState } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import apiEndpoints from '../../services/api';
import LoginGif from '../../assest/image/login.png'
import AuthFrame from '../../components/frames/AuthFrame';
import { defaultStyling } from '../../constant/styles'

const SignupScreen = () => {
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [batch, setBatch] = useState('');
    const [branch, setBranch] = useState('');
    const [section, setSection] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    const handleSignup = async () => {

        try {

            if (name !== '' && regNo !== '' && batch !== '' && branch !== '' && section !== '' && password !== '') {
                const res = await apiEndpoints.register({
                    name: name,
                    registrationNumber: regNo,
                    email: email,
                    password: password,
                    batch: batch,
                    branch: branch,
                    section: section,
                    course: course,
                })

                if (res.status === 201) {
                    goToLogin()
                    Alert.alert(`${name} Registered Successfully !! `)
                }

            }

        } catch (error) {
            console.error("Error while signup: ", error)
            Alert.alert(`${name} Already Exist !! `)
        }
    };

    return (
        <AuthFrame text='Signup' img={LoginGif}>
            <TextInput
                label="Name"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
            />
            <TextInput
                label="Registration No"
                value={regNo}
                onChangeText={text => setRegNo(text)}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                keyboardType='email-address'
            />
            <TextInput
                label="Course"
                value={course}
                onChangeText={text => setCourse(text)}
                style={styles.input}
            />
            <TextInput
                label="Batch"
                value={batch}
                onChangeText={text => setBatch(text)}
                style={styles.input}
            />
            <TextInput
                label="Branch"
                value={branch}
                onChangeText={text => setBranch(text)}
                style={styles.input}
            />
            <TextInput
                label="Section"
                value={section}
                onChangeText={text => setSection(text)}
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSignup} style={styles.button}>
                Sign Up
            </Button>
            <Text onPress={goToLogin} style={styles.signupText} >
                Already having acoount? Go to Login
            </Text>
        </AuthFrame>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'white'
    },
    button: {
        width: '100%',
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
        color: defaultStyling.secondaryTextColor,
    },
});

export default SignupScreen;
