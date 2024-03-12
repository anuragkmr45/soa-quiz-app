import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Modal, ActivityIndicator, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import FastImage from 'react-native-fast-image';

import useAuthToken from '../../hooks/token-manager/useAuthToken';
import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';
// import AboutGif from '../../assest/gif/result-gif.gif'
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

    // const handleResults = async () => {
    //     try {
    //         // const res = await apiEndpoints.getMyResults()
    //         // if (res.status === 200) {
    //         //     setResults(res.data.quizResults)
    //         // }
    //     } catch (error) {
    //         console.error('Error while fetching student results: ', error)
    //     }
    // }

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
            <ProfileCard profile={profile} results={results} />


            <Card style={styles.card} onPress={() => { navigation.navigate('About') }} >
                <Card.Content style={styles.cardContent}>
                    <View style={styles.imageContainer}>
                        {/* <FastImage
                            source={AboutGif}
                            style={styles.image}
                            onError={(error) => console.error('Error loading image:', error)}
                        /> */}
                        <View style={{ overflow: 'hidden' }}>

                            <Image source={CreatorImg} style={styles.image} />
                        </View>
                    </View>
                    <Text variant="bodyMedium" style={{ fontSize: 16 }}>About Creators</Text>
                </Card.Content>
            </Card>

            <UploadQuizDtlCard />

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
                        {/* <WebView src="https://giphy.com/embed/L2lkyiSIYFq6f4gAqq" width="480" height="324" frameBorder="0" class="giphy-embed" allowFullScreen></WebView><p><a href="https://giphy.com/stickers/harrypotter-transparent-harry-potter-dark-arts-L2lkyiSIYFq6f4gAqq">via GIPHY</a></p> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.dark,
    },
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
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
        borderRadius: 25, // Assuming you want a circular image
    },
    cardContentText: {
        color: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '92%',
        paddingHorizontal: 20,
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
