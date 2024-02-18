import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { defaultStyling } from '../../constant/styles';

import Insta from '../../assest/image/icons/insta.png';
import Github from '../../assest/image/icons/github.png';
import Linkedin from '../../assest/image/icons/linkedin.png';

const TeamCard = ({ img, name, intro, insta, linkedin, github }) => {
    return (
        <Card style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.imageContainer}>
                    <Image source={img} style={styles.image} />
                </View>
                <Card.Content style={styles.textContent}>
                    <Text>{name}</Text>
                    <Text>{intro}</Text>
                    <View style={styles.actions}>
                        {
                            insta && (
                                <TouchableOpacity style={styles.iconButton}>
                                    <Image source={Insta} style={styles.icon} />
                                </TouchableOpacity>
                            )
                        }
                        {
                            github && (
                                <TouchableOpacity style={styles.iconButton}>
                                    <Image source={Github} style={styles.icon} />
                                </TouchableOpacity>
                            )
                        }
                        {
                            linkedin && (
                                <TouchableOpacity style={styles.iconButton}>
                                    <Image source={Linkedin} style={styles.icon} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </Card.Content>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    imageContainer: {
        marginRight: 1,
        flex: 1, // take 1/3 of the card width
    },
    image: {
        width: '40%',
        height: '40%',
        borderRadius: 8, // adjust border radius as needed
    },
    textContent: {
        flex: 2, // take 2/3 of the card width
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        backgroundColor: defaultStyling.dark,
        borderRadius: 50, // for circular shape
        padding: 8,
        marginHorizontal: 5,
    },
    icon: {
        width: 17,
        height: 17,
    },
})

export default TeamCard;
