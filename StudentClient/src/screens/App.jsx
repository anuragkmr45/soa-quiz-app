import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useToken } from '../context/TokenContext';

import { defaultStyling } from '../constant/styles';
import BgImg from '../assest/image/bg-img.png';
import HeroImg from '../assest/image/heroimg.png'

const App = () => {

    const [token, setToken] = useState('')

    const navigation = useNavigation();
    const { getToken } = useToken();

    const handleNavigation = () => {
        try {
            if (token === null) {
                navigation.navigate('Login')
            }
            if (token !== null) {
                navigation.navigate('Home')
            }
        } catch (error) {
            console.log('Something went wrong !! restart the app')
        }
    }

    useEffect(() => {

        const fetchToken = async () => {
            try {
                const authToken = await getToken();
                setToken(authToken)
            } catch (error) {
                console.error('Error retrieving token:', error);
                // alert('Something went wrong !! restart the app')
            }
        };

        fetchToken();
    }, [getToken]);


    return (
        <ImageBackground
            source={BgImg}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.centerContainer}>
                    <Image source={HeroImg} style={styles.image} />
                    <Text style={styles.text}>SOA Quiz App</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNavigation}>
                    <Text style={styles.buttonText}>Get Started </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        alignItems: 'center',
    },
    image: {
        width: 220,
        height: 220,
        // marginBottom: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: defaultStyling.dark,
    },
    button: {
        backgroundColor: defaultStyling.dark,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        position: 'absolute',
        bottom: 30,
        width: '90%',
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 200,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
});

export default App;
