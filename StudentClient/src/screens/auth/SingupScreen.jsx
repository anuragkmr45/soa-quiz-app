import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View, TouchableHighlight, Modal, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import apiEndpoints from '../../services/api';
import useGetAndroidID from '../../hooks/background-services/useGetAndroidID';
import { courseOptions } from '../../.data/course'
import { batchOptions } from '../../.data/batch'
import { branchOptions } from '../../.data/branch'
import { sectionOptions } from '../../.data/section'
import LoginGif from '../../assest/image/auth-img.png'
import { defaultStyling } from '../../constant/styles'
import AuthFrame from '../../components/frames/AuthFrame';

const DropdownMenu = ({ visible, options, onSelect }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => onSelect('')}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView>
                        {options.map(option => (
                            <TouchableHighlight
                                key={option.value}
                                style={{ ...styles.option }}
                                onPress={() => onSelect(option.value)}
                            >
                                <Text style={styles.optionText}>{option.label}</Text>
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const SignupScreen = () => {
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [batch, setBatch] = useState('');
    const [branch, setBranch] = useState('');
    const [section, setSection] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [courseMenuVisible, setCourseMenuVisible] = useState(false);
    const [batchMenuVisible, setBatchMenuVisible] = useState(false);
    const [branchMenuVisible, setBranchMenuVisible] = useState(false);
    const [sectionMenuVisible, setSectionMenuVisible] = useState(false);

    const navigation = useNavigation();
    const deviceId = useGetAndroidID();

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    const handleSignup = async () => {
        setLoading(true);
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
                    androidId: deviceId
                });

                if (res.status === 201) {
                    goToLogin();
                    Alert.alert(`${name} Registered Successfully !! `);
                }
            }
        } catch (error) {
            console.error("Error while signup: ", error);
            Alert.alert(`${name} Already Exist !! `);
        } finally {
            setLoading(false);
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

            <TouchableHighlight
                style={styles.dropdowninput}
                onPress={() => setCourseMenuVisible(true)}
            >
                <Text style={{ color: defaultStyling.dark }}>
                    {course ? course : 'Select Course'}
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.dropdowninput}
                onPress={() => setBatchMenuVisible(true)}
            >
                <Text style={{ color: defaultStyling.dark }}>
                    {batch ? batch : 'Select Batch'}
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.dropdowninput}
                onPress={() => setBranchMenuVisible(true)}
            >
                <Text style={{ color: defaultStyling.dark }}>
                    {branch ? branch : 'Select Branch'}
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.dropdowninput}
                onPress={() => setSectionMenuVisible(true)}
            >
                <Text style={{ color: defaultStyling.dark }}>
                    {section ? section : 'Select Section'}
                </Text>
            </TouchableHighlight>

            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSignup} style={styles.button}>
                {loading ? (
                    <Text style={{ color: 'white' }}>
                        Loading ...
                    </Text>
                ) : (
                    <Text style={{ color: 'white' }}>
                        Sign Up
                    </Text>
                )}
            </Button>
            <Text onPress={goToLogin} style={styles.signupText} >
                Already having account? Go to Login
            </Text>

            <DropdownMenu
                visible={courseMenuVisible}
                options={courseOptions}
                onSelect={value => {
                    setCourse(value);
                    setCourseMenuVisible(false);
                }}
            />
            <DropdownMenu
                visible={batchMenuVisible}
                options={batchOptions}
                onSelect={value => {
                    setBatch(value);
                    setBatchMenuVisible(false);
                }}
            />
            <DropdownMenu
                visible={branchMenuVisible}
                options={branchOptions}
                onSelect={value => {
                    setBranch(value);
                    setBranchMenuVisible(false);
                }}
            />
            <DropdownMenu
                visible={sectionMenuVisible}
                options={sectionOptions}
                onSelect={value => {
                    setSection(value);
                    setSectionMenuVisible(false);
                }}
            />
        </AuthFrame>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'white',
        color: defaultStyling.dark,
        // paddingVertical: 2,
        paddingHorizontal: 5,
        // borderWidth: 1,
        borderColor: defaultStyling.dark,
        borderRadius: 5,
    },
    dropdowninput: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'white',
        color: defaultStyling.dark,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        borderRadius: 10,
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
        color: defaultStyling.dark,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: '80%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    option: {
        width: 200,
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
    },
    optionText: {
        color: defaultStyling.dark
    }
});

export default SignupScreen;