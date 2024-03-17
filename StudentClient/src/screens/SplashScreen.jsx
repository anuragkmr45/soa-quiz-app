import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import SplashScreenGIF from '../assest/gif/splash-screen.gif';
import Logo from '../assest/logo.png';
import { defaultStyling } from '../constant/styles';

const SplashScreen = () => {

    return (
        <View style={styles.container}>
            <Image
                source={SplashScreenGIF}
                style={styles.background}
            />
            <View style={styles.contentContainer}>
                <Image
                    source={Logo}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}>QUIZZIX !!</Text>
            </View>
            <Text style={styles.bottomText}>
                Version 1.0.0
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.dark
    },
    background: {
        // ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    image: {
        width: '600%',
        height: '600%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bottomText: {
        position: 'absolute',
        bottom: 20,
        fontSize: 16,
    },
});

export default SplashScreen;
