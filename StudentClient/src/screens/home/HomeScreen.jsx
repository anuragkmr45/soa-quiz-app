import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCameraPermission } from 'react-native-vision-camera';
import TouchID from 'react-native-touch-id';
import { useCameraDevice } from 'react-native-vision-camera';

import apiEndpoints from '../../services/api';
import ScanQrIcon from '../../assest/icons/scanQR.png';
import ProfileIcon from '../../assest/icons/profile.png';
import ResultIcon from '../../assest/icons/results.png';
import CreatorIcon from '../../assest/icons/creator.png';
import HomeHeroImg from '../../assest/image/signupHero.png';

import FeatureCard from '../../components/cards/FeatureCard';
import { defaultStyling } from '../../constant/styles';
import Loader from '../../components/loading/Loader';

const HomeScreen = () => {

    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [deviceCapability, setDeviceCapability] = useState(false)

    const { requestPermission } = useCameraPermission();
    const navigation = useNavigation();
    const device = useCameraDevice('back')

    const handleCheckDeviceCapability = async () => {
        try {
            if (device !== null) {
                setDeviceCapability(true)
            }
        } catch (error) {
            Alert.alert('Scanner Not Working', 'Device is not compatible', [
                { text: 'OK', onPress: () => { navigation.navigate('Login') } },
            ]);
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
            } else if (biometryType) {
                TouchID.authenticate('', optionalConfigObject)
                    .then((success) => {
                        if (success === true) {
                            navigation.navigate('ScannQR')
                        }
                    })
                    .catch(error => {
                        console.error('error while fingerpritn auth: ', error)
                        // BackHandler.exitApp()
                        Alert.alert('Touch ID not working !! ', '')
                    })
            }
            if (!biometryType) {
                navigation.navigate('ScannQR')
            }
        })
    }

    const handleFetchResults = async () => {
        setLoading(true)
        try {
            if (results.length === 0) {
                const res = await apiEndpoints.getMyResults()

                if (res.status === 200) {
                    setResults(res.data.quizResults)
                }
            }
        } catch (error) {
            Alert.alert('Result Not Found', 'Sign in again', [
                { text: 'OK', onPress: () => { navigation.navigate('Login') } },
            ]);
        } finally {
            setLoading(false)
        }
    }

    const handleProfile = async () => {
        setLoading(true)
        try {
            if (!profile) {
                const res = await apiEndpoints.getProfile()
                setProfile(res)
            }
        } catch (error) {
            Alert.alert('Profile Not Found', 'Sign in again', [
                { text: 'OK', onPress: () => { navigation.navigate('Login') } },
            ]);
            navigation.navigate('Login')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        requestPermission();
        handleFetchResults();
        handleProfile();
        handleCheckDeviceCapability();

    }, []);

    return (
        loading ? (
            <Loader loading={loading} />
        ) : (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', marginTop: 20 }}>
                    <View style={{ justifyContent: 'center', justifyContent: 'space-evenly', flexShrink: 1 }}>
                        <Text style={{ color: defaultStyling.light, fontSize: 24 }}>Hello 👋🏻 </Text>
                        <Text style={{ color: defaultStyling.light, fontSize: 30 }}>{profile?.name} </Text>
                        <View>
                            <Text style={{ color: defaultStyling.light, opacity: 0.7, fontSize: 16 }}>Scan the QR</Text>
                            <Text style={{ color: defaultStyling.light, opacity: 0.7, fontSize: 16 }}>to attend the quiz</Text>
                        </View>
                    </View>
                    <View style={styles.cardContent}>
                        <Image source={HomeHeroImg} style={styles.cardImage} />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={{ marginTop: 15, borderWidth: 2, borderRadius: 10, alignSelf: 'center', borderColor: defaultStyling.dark, width: '20%' }} />
                    <View style={styles.centerContainer}>
                        <View style={styles.featureContainer}>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={{ marginRight: 8 }}
                                    onPress={handleToucIdAuth}
                                // onPress={deviceCapability ? handleToucIdAuth : () => navigation.navigate('ScannQR')}
                                >
                                    <FeatureCard imageUrl={ScanQrIcon} text="Scan Now" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginLeft: 8 }}
                                    onPress={() => { navigation.navigate('Profile', { profile: profile }) }}
                                >
                                    <FeatureCard imageUrl={ProfileIcon} text="Profile" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={{ marginRight: 8 }}
                                    onPress={() => { navigation.navigate('Results', { results: results }) }}
                                >
                                    <FeatureCard imageUrl={ResultIcon} text="Results" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginLeft: 8 }}
                                    onPress={() => { navigation.navigate('About') }}
                                >
                                    <FeatureCard imageUrl={CreatorIcon} text="Creators" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={{ color: defaultStyling.dark, marginBottom: 10, fontSize: 12, fontWeight: '600' }}>Quizzy Version 1.0.0</Text>
                </View>
            </View>
        )
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // position: 'relative',
        backgroundColor: defaultStyling.dark,
    },
    centerContainer: {
        justifyContent: 'space-evenly',
        flex: 1,
    },
    featureContainer: {
        alignItems: 'center',
    },
    card: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '70%',
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 20,
        backgroundColor: defaultStyling.light
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: defaultStyling.primaryTextColor, // Adjust the text color as needed
    },
    cardImage: {
        width: 100,
        height: 140,
        resizeMode: 'cover',
        borderRadius: 40, // Half of the width and height to make it circular
    },
});

export default HomeScreen;
