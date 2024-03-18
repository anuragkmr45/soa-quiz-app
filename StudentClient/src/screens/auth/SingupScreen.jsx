import React, { useState } from 'react';
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
import Loader from '../../components/loading/Loader';

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
    const [batch, setBatch] = useState('2025');
    const [branch, setBranch] = useState('');
    const [section, setSection] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [courseMenuVisible, setCourseMenuVisible] = useState(false);
    const [batchMenuVisible, setBatchMenuVisible] = useState(false);
    const [branchMenuVisible, setBranchMenuVisible] = useState(false);
    const [sectionMenuVisible, setSectionMenuVisible] = useState(false);
    const [isShowPass, setIsShowPass] = useState(false);

    const navigation = useNavigation();
    const deviceId = useGetAndroidID();

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    const handleSignup = async () => {
        setLoading(true);
        try {

            if (name === '' && regNo === '' && section === '' && password === '') {
                Alert.alert('Input All Required Fields', '', [
                    { text: 'OK' },
                ])
            }

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
            // console.error("Error while signup: ", error);
            Alert.alert(`${name} Already Exist !! `);
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? (
            <Loader loading={loading} />
        ) : (
            <AuthFrame text='Signup' img={LoginGif}>
                <View style={{ marginVertical: 10 }}>
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
                    <Text style={{ color: defaultStyling.primaryText, fontSize: 40, fontWeight: '400' }}>
                        Sign up
                    </Text>
                    <View
                        style={{
                            width: '18%',
                            height: 2,
                            backgroundColor: defaultStyling.dark,
                            elevation: 2,
                            marginVertical: '4%'
                        }}
                    />
                </View>
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

                {/* <TouchableHighlight
                style={styles.dropdowninput}
                onPress={() => setBatchMenuVisible(true)}
            >
                <Text style={{ color: defaultStyling.dark }}>
                    {batch ? batch : 'Select Batch'}
                </Text>
            </TouchableHighlight> */}

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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>

                    <Button
                        onPress={() => { navigation.navigate('Login') }}
                        style={{ borderWidth: 2, borderColor: defaultStyling.dark, backgroundColor: 'inherit', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 50 }}>
                        <Text style={{ color: defaultStyling.dark }}>Sign In</Text>
                    </Button>

                    <Button
                        onPress={handleSignup}
                        style={{ borderWidth: 2, borderColor: defaultStyling.dark, backgroundColor: defaultStyling.dark, paddingVertical: 10, paddingHorizontal: 25, borderRadius: 50 }}>
                        <Text style={{ color: defaultStyling.light }}>Sign Up</Text>
                    </Button>

                </View>
            </AuthFrame>
        )
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'white',
        color: defaultStyling.dark,
        paddingHorizontal: 5,
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
        backgroundColor: defaultStyling.semidark,
        borderRadius: 8,
        paddingVertical: 8
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
        color: defaultStyling.semidark,
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