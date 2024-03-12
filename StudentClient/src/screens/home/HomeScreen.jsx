import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Modal, ActivityIndicator, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import FastImage from 'react-native-fast-image';

import useAuthToken from '../../hooks/token-manager/useAuthToken';
import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';
import CreatorImg from '../../assest/icons/coding.png'

import ProfileCard from '../../components/cards/ProfileCard';
import UploadQuizDtlCard from '../../components/cards/UploadQuizDtlCard';

const HomeScreen = () => {

    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [results, setResults] = useState([]);

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

    const handleProfile = async () => {
        setDataLoading(true)
        try {
            if (!profile) {
                const res = await apiEndpoints.getProfile()
                setProfile(res)
            }
        } catch (error) {
            console.log(error)
            alert('Login Again');
            navigation.navigate('Login')
        } finally {
            setDataLoading(false)
        }
    }

    useEffect(() => {

        handleProfile();
        // handleResults();
    }, []);

    return (
        <View style={styles.container}>
            {
                profile && (
                    <ProfileCard userName={profile?.name} />
                )
            }
            <View
                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly', flex: 1 }}
            >
                <View style={styles.profileBtns}>
                    <Button
                        mode="contained"
                        style={styles.profileBtn}
                        onPress={() => { navigation.navigate('Profile') }}
                    >
                        <Text style={{ color: defaultStyling.primaryTextColor }}>
                            My Profile
                        </Text>
                    </Button>

                    <Button
                        mode="contained"
                        style={styles.profileBtn}
                        onPress={() => {
                            navigation.navigate('Results', { results: results })
                        }}
                    >
                        <Text style={{ color: defaultStyling.primaryTextColor }}>Results</Text>
                    </Button>

                </View>

                <Card style={styles.card} onPress={() => { navigation.navigate('About') }} >
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.imageContainer}>
                            {/* <FastImage
                            source={AboutGif}
                            style={styles.image}
                            onError={(error) => console.error('Error loading image:', error)}
                        /> */}

                            <Image source={CreatorImg} style={styles.image} />
                        </View>
                        <Text variant="bodyMedium" style={{ fontSize: 16 }}>About Creators</Text>
                    </Card.Content>
                </Card>

                <UploadQuizDtlCard />
            </View>

            <View style={styles.buttonContainer}>

                {
                    loading ? (
                        <Button mode='contained' style={styles.button}>
                            <Text style={{ color: defaultStyling.primaryTextColor }} >
                                loading ...
                            </Text>
                        </Button>
                    ) : (
                        <Button mode="contained" icon='' style={styles.button} onPress={handleLogout}>
                            <Text style={{ color: defaultStyling.primaryTextColor }} >
                                Logout
                            </Text>
                        </Button>
                    )
                }
            </View>

            {/* Modal for loading */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={dataLoading}
                onRequestClose={() => {
                    // Handle modal close if needed
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={styles.modalText}>Loading...</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: defaultStyling.dark,
    },
    profileBtns: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    profileBtn: {
        backgroundColor: defaultStyling.semidark,
        borderRadius: 10,
        width: '43%',
        marginHorizontal: 5,
    },
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.70,
        shadowRadius: 4,
        elevation: 6,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 40,
        height: 40,
        // borderRadius: 25, 
    },
    buttonContainer: {
        shadowColor: defaultStyling.light,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 25,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        width: '100%',
        paddingHorizontal: 20,
        // backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    button: {
        width: '100%',
        backgroundColor: defaultStyling.danger,
        borderRadius: 12,
        paddingVertical: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: 'inherit',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 10,
        fontSize: 16,
        color: 'white'
    },
});

export default HomeScreen;
