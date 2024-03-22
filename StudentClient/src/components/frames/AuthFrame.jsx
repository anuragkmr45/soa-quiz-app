import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, ScrollView, Image } from 'react-native';

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
                resizeMode='cover'
            />
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.card, {
                    transform: [{
                        translateY: cardAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [200, 0],
                        })
                    }]
                }]}>
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
        // alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        backgroundColor: defaultStyling.light,
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
        height: '34%',
        marginTop: 40
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default AuthFrame;
