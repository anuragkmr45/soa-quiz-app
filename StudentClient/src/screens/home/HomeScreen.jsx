import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCameraPermission } from 'react-native-vision-camera';

import useAuthToken from '../../hooks/token-manager/useAuthToken';
import apiEndpoints from '../../services/api';
import ProfileIcon from '../../assest/image/profile.png'
import ResultIcon from '../../assest/image/results.png'
import CreatorIcon from '../../assest/image/creators.png'
import LogoutIcon from '../../assest/image/logout.png'
import HeroImg from '../../assest/image/hero.png'

import FeatureCard from '../../components/cards/FeatureCard';
import UploadQuizDtlCard from '../../components/cards/UploadQuizDtlCard';
import { defaultStyling } from '../../constant/styles';

const HomeScreen = () => {

    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [results, setResults] = useState([]);

    const { requestPermission } = useCameraPermission();
    const { getToken, removeToken } = useAuthToken();
    const navigation = useNavigation();

    const handleLogout = async () => {
        setLoading(true)
        try {
            const authToken = await getToken();
            const res = await apiEndpoints.logout(authToken);
            if (res?.data.message === "Logout successful") {
                await removeToken();
                navigation.navigate('Login')
            } else {
                alert('Something went wrong!! Restart your app')
            }
        } catch (error) {
            // console.error('Error while logout: ', error)
            alert('Something went wrong !! Restart your app')
        } finally {
            setLoading(false)
        }
    }

    const handleFetchResults = async () => {
        try {
            if (results.length === 0) {
                const res = await apiEndpoints.getMyResults()
                // console.log('results: ', res.data.quizResults)
                if (res.status === 200) {
                    setResults(res.data.quizResults)
                }
            }
        } catch (error) {
            console.log('Error while fetching resutls: ', error)
        }
    }

    const handleProfile = async () => {
        setDataLoading(true)
        try {
            if (!profile) {
                const res = await apiEndpoints.getProfile()
                // console.log('studetn profiloe: ', res)
                setProfile(res)
            }
        } catch (error) {
            alert('Login Again');
            navigation.navigate('Login')
        } finally {
            setDataLoading(false)
        }
    }

    useEffect(() => {

        handleFetchResults()
        handleProfile();
        requestPermission();
    }, []);

    return (

        loading ? (
            <Text style={styles.text}>Loading ... </Text>
        ) : (
            <View style={styles.container} >
                {/* <View>
                    <Image source={HeroImg} style={styles.image} />
                </View> */}
                <View style={styles.card}>
                    <Text style={{ color: 'black', marginTop: 20 }}>----</Text>
                    <View style={styles.centerContainer}>
                        <UploadQuizDtlCard name={profile?.name} />
                        <View style={styles.fetureContainer}>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={{ marginRight: 14 }}
                                    onPress={() => { navigation.navigate('Profile', { profile: profile }) }}
                                >
                                    <FeatureCard imageUrl={ProfileIcon} text="Profile" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginLeft: 14 }}
                                    onPress={() => { navigation.navigate('Results', { results: results }) }}
                                >
                                    <FeatureCard imageUrl={ResultIcon} text="Results" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={{ marginRight: 14 }}
                                    onPress={() => { navigation.navigate('About') }}
                                >
                                    <FeatureCard imageUrl={CreatorIcon} text="Creators" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginLeft: 14 }}
                                    onPress={handleLogout}
                                >
                                    <FeatureCard imageUrl={LogoutIcon} text="Log out" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        backgroundColor: defaultStyling.semidark,
    },
    centerContainer: {
        justifyContent: 'space-evenly',
        flex: 1,
    },
    fetureContainer: {
        alignItems: 'center',
    },
    image: {
        height: 100,
    },
    card: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '80%',
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
        backgroundColor: 'white'
    },
    cardContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '75%',
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },

});

export default HomeScreen;
