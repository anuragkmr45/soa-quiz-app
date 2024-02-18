import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { useToken } from '../../context/TokenContext';
import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';
import AboutGif from '../../assest/gif/result-gif.gif'

import ProfileCard from '../../components/cards/ProfileCard';
import UploadQuizDtlCard from '../../components/cards/UploadQuizDtlCard';


const HomeScreen = () => {

    const [token, setToken] = useState('')
    const [profile, setProfile] = useState()

    const { deleteToken, getToken } = useToken();
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await deleteToken();
            const res = await apiEndpoints.logout();
            console.log('res: ', res)
        } catch (error) {
            console.error('Error while logout: ', error)
            alert('Something went wrong !! Try again later')
        }
    }

    const handleProfile = async () => {

        await fetchToken();
        try {
            const res = await apiEndpoints.getProfile(token)
            setProfile(res)
        } catch (error) {
            console.error('Error while feetching student profile: ', error);
        }
    }

    const fetchToken = async () => {
        try {
            const authToken = await getToken()
            // console.log('Token retrieved:', authToken);
            setToken(authToken)
        } catch (error) {
            console.error('Error while fetching token: ', error)
        }
    }


    useEffect(() => {
        fetchToken();
    }, []);

    useEffect(() => {
        if (token) {
            handleProfile();
        }
    }, [token]);

    return (
        <View style={styles.container}>
            <ProfileCard profile={profile} />

            <Card style={styles.card} onPress={() => { navigation.navigate('About') }} >
                <Card.Content style={styles.cardContent}>
                    <View style={styles.imageContainer}>
                        <FastImage
                            source={AboutGif}
                            style={styles.image}
                            onError={(error) => console.error('Error loading image:', error)}
                            onLoad={() => console.log('Image loaded successfully')}
                        />
                    </View>
                    <Text variant="bodyMedium" style={{ fontSize: 16 }}>About Creators</Text>
                </Card.Content>
            </Card>

            <UploadQuizDtlCard />

            <View style={styles.buttonContainer}>
                <Button mode="contained" icon='' style={styles.button} onPress={handleLogout}>
                    <Text style={{ color: 'white' }} >
                        Logout
                    </Text>
                </Button>
            </View>
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
        backgroundColor: '#830415',
        borderRadius: 12,
        paddingVertical: 5,
    },
});


export default HomeScreen;
