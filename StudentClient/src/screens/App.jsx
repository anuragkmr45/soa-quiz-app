import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useAuthToken from '../hooks/token-manager/useAuthToken';
import { defaultStyling } from '../constant/styles';
import BgImg from '../assest/image/bg-img.png';
import HeroImg from '../assest/image/heroimg.png'
// import LoginIcon from '../assest/icons/login-icon.png'

const App = () => {

    const [isAuth, setIsAuth] = useState(false)

    const navigation = useNavigation();
    const { getToken } = useAuthToken();

    useEffect(() => {
        const handleGetToken = async () => {
            try {
                const res = await getToken()

                if (res) {
                    setIsAuth(true)
                }

            } catch (error) {
                // console.error('Error while getting auth token: ', error);
                alert('Restart you app')
            }
        }

        handleGetToken();
    }, [])

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

                {
                    isAuth ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { navigation.navigate('Home') }}>
                            <Text style={styles.buttonText}>Get Started </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { navigation.navigate('Login') }}>
                            <Text style={styles.buttonText}>Login</Text>
                            {/* <Image src={LoginIcon} alt="" /> */}
                        </TouchableOpacity>
                    )
                }

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
        position: 'relative', // Added
    },
    centerContainer: {
        alignItems: 'center',
        zIndex: 1, // Added
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
        shadowColor: defaultStyling.dark,
        shadowOffset: {
            width: 10,
            height: 200,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1, // Added
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: defaultStyling.primaryTextColor,
        alignSelf: 'center',
    },
    overlay: { // Added
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
        zIndex: 0, // Ensure it's below other elements
    },
});

export default App;
