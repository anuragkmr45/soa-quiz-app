import React, { useState, useEffect, Children } from 'react';
import { View, StyleSheet, Text, Animated, ScrollView, Image } from 'react-native';
// import FastImage from 'react-native-fast-image';

import { defaultStyling } from '../../constant/styles';

const AuthFrame = ({ children, text, img }) => {
    const [cardAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        // Start the animation when the component mounts
        Animated.timing(cardAnimation, {
            toValue: 1, // Target value
            duration: 500, // Duration of the animation
            useNativeDriver: true, // Enable native driver for better performance
        }).start(); // Start the animation
    }, [])

    return (
        <View style={styles.container}>
            <Image
                source={img}
                // resizeMode={FastImage.resizeMode.cover}
                style={styles.image}
            />
            {/* <FastImage
                source={img}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.image}
            /> */}
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.card, {
                    transform: [{
                        translateY: cardAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [200, 0], // Slide up from 200 to 0
                        })
                    }]
                }]}>
                    <View style={styles.topSection}>
                        <Text style={{ color: defaultStyling.dark, fontSize: 20, fontWeight: 500 }}>{text}</Text>
                        <Text style={{ color: defaultStyling.dark, fontSize: 10 }}>Please {text} To Continue</Text>
                        {/* <Text style={{ color: defaultStyling.dark, fontSize: 10 }}>Login With the same </Text> */}
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {children}
                    </ScrollView>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: defaultStyling.dark,
    },
    cardContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '70%',
        alignItems: 'center',
    },
    card: {
        // backgroundColor: defaultStyling.semidark,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        backgroundColor: 'white',
        // Add shadow properties
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6, // Elevation for Android
    },

    topSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '60%',
        height: '20%',
        marginTop: 40
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default AuthFrame;
