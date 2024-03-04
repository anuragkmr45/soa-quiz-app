import React, { useState } from 'react';
import { Card, Text, Modal, Portal, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import Avatar from '../../assest/gif/avatar.gif'
import { defaultStyling } from '../../constant/styles';

const ProfileCard = ({ profile }) => {

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    // console.log(profile)
    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.details} >Welcome  !! </Text>
                        {
                            profile && (
                                <Text variant="titleLarge" style={styles.details} >{profile?.name}</Text>
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
            <Button mode="contained" style={{ backgroundColor: defaultStyling.semidark, borderRadius: 10, width: '80%', marginBottom: 10 }} onPress={showModal}>
                <Text style={{ color: 'white' }}>
                    My Profile
                </Text>
            </Button>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} style={{ backgroundColor: 'rgba(0,0,0, 0.6)', paddingHorizontal: 20 }} contentContainerStyle={containerStyle}>
                    <Card style={styles.card} >
                        <Card.Content>
                            <Text
                                variant="bodyLarge"
                                style={styles.cardContent}>Name : {profile?.name}
                            </Text>
                            <Text
                                variant="bodyLarge"
                                style={styles.cardContent}>Email : {profile?.email}
                            </Text>
                            <Text
                                variant="bodyLarge"
                                style={styles.cardContent}>Section : {profile?.section}
                            </Text>
                            <Text
                                variant="bodyLarge"
                                style={styles.cardContent}>Branch : {profile?.branch}
                            </Text>
                            <Text
                                variant="bodyLarge"
                                style={styles.cardContent}>Batch : {profile?.batch}
                            </Text>
                        </Card.Content>
                    </Card>
                </Modal>
            </Portal>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: '5%',
        alignItems: 'center',
        width: '95%',
        backgroundColor: 'transparent',
    },
    image: {
        width: 120,
        height: 120,
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
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '100%',
        // height: '50%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: defaultStyling.semidark,
        borderRadius: 10,
        width: '8%',
    },
    buttonText: {
        color: 'white',
    },
});

export default ProfileCard;
