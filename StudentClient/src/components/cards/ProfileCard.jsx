import React, { useState, useEffect } from 'react';
import { Card, Text } from 'react-native-paper';
import { Image, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import apiEndpoints from '../../services/api';

import Avatar from '../../assest/gif/avatar.gif'

const ProfileCard = () => {

    // const [token, setToken] = useState('')

    // const handleProfile = async () => {
    //     try {
    //         const res = await apiEndpoints.getProfile()

    //         console.log(res)
    //     } catch (error) {
    //         console.error('Error while feetching student profile: ', error);
    //     }
    // }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.details} >Welcome  !! </Text>
                        <Text variant="titleLarge" style={styles.details} >User Name</Text>
                    </Card.Content>
                </View>
                <FastImage
                    source={Avatar}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: '5%',
        alignItems: 'center',
        width: '95%',
        backgroundColor: 'transparent', // Set background color to transparent
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 50,
        // margin: 10,
    },
    content: {
        flex: 1,
        color: 'white'
    },
    details: {
        color: 'white'
    },

});

export default ProfileCard;
