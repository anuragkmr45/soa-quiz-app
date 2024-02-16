import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import FastImage from 'react-native-fast-image';

import SplashScreenImg from '../assest/gif/splash-screen.gif';
import SplashScreenPregerssBar from '../components/progressbar/SplashScreenPregerssBar';

const SplashScreen = () => {

    const bounceValue = useRef(new Animated.Value(0.1)).current;

    useEffect(() => {

        const bounceAnimation = Animated.sequence([
            Animated.timing(bounceValue, { toValue: 1.04, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
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
                source={SplashScreenImg}
                style={styles.gif}
                resizeMode={FastImage.resizeMode.cover}
            />
            <SplashScreenPregerssBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    gif: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.6,
        alignSelf: 'center',
        marginBottom: 30,
    },
});

export default SplashScreen;
