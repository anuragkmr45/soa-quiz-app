import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Animated, Easing } from 'react-native';
import FastImage from 'react-native-fast-image';

import SplashScreenGIF from '../assest/gif/splash-screen.gif';
import Logo from '../assest/logo.png';

const SplashScreen = () => {
    const bounceValue = useRef(new Animated.Value(0.1)).current;

    useEffect(() => {
        const bounceAnimation = Animated.sequence([
            Animated.timing(bounceValue, { toValue: 1.04, duration: 1600, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4, useNativeDriver: false }),
        ]);

        Animated.loop(bounceAnimation).start();

        return () => {
            bounceValue.setValue(1);
        };
    }, [bounceValue]);

    return (
        <View style={styles.container}>
            <FastImage
                source={SplashScreenGIF}
                style={styles.background}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Animated.View style={[styles.contentContainer, { transform: [{ scale: bounceValue }] }]}>
                <Image
                    source={Logo}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}>QUIZZIX !!</Text>
            </Animated.View>
            <Text style={styles.bottomText}>
                Welcome to SOA Quiz App
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
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
