import React from 'react';
import { Card, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import Avatar from '../../assest/gif/avatar.gif'
import { defaultStyling } from '../../constant/styles';

const ProfileCard = ({ userName }) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.details} >Welcome  !! </Text>
                    {
                        userName && (
                            <Text variant="titleLarge" style={styles.details} >{userName}</Text>
                        )
                    }
                </Card.Content>
            </View>
            <FastImage
                source={Avatar}
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: '5%',
        alignItems: 'center',
        width: '99%',
        backgroundColor: defaultStyling.semidark,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        shadowColor: defaultStyling.light,
        shadowOffset: {
            width: 0,
            height: 5, // Set to a positive value to add shadow only at the bottom
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 15,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 50,
        // margin: 10,
    },
    content: {
        flex: 1,
        color: defaultStyling.primaryTextColor
    },
    details: {
        color: defaultStyling.primaryTextColor
    },
});

export default ProfileCard;
