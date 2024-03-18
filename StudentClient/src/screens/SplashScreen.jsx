import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Logo from '../assest/logo.png';

const SplashScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image
                    source={Logo}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}></Text>
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
        backgroundColor: 'rgba(64,123,255,255)',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    image: {
        width: 200,
        height: 200,
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
