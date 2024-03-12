import React, { useState } from 'react';
import { Card, Text, Modal, Portal, Button, Image } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

// import ProfileImg from '../../assest/icons/verified.png'
import Avatar from '../../assest/gif/avatar.gif'
import { defaultStyling } from '../../constant/styles';

const ProfileCard = ({ profile, results }) => {

    const [visible, setVisible] = useState(false);
    // const navigation = useNavigation()

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

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
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.button} onPress={showModal}>
                    {/* <View>
                        <Image source={ProfileImg} style={styles.image} />
                    </View> */}
                    <Text style={styles.buttonText}>
                        My Profile
                    </Text>
                </Button>

                <Button
                    mode="contained"
                    style={styles.button}
                // onPress={() => {
                //     navigation.navigate('Results', { results: results })
                // }}
                >
                    <Text style={styles.buttonText}>Data Not Found</Text>
                </Button>

            </View>

            <Portal >
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    style={{ backgroundColor: 'rgba(0,0,0, 0.6)', paddingHorizontal: 20 }}
                >
                    <Card style={styles.card} >
                        <Card.Content>
                            <Text
                                variant="bodyLarge"
                                style={styles.cardContent}>Name : {profile?.name}
                            </Text>
                            <Text
                                variant="bodyLarge"
                                style={styles.cardContent}>Registration No : {profile?.registrationnumber}
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
        color: defaultStyling.primaryTextColor
    },
    details: {
        color: defaultStyling.primaryTextColor
    },
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '100%',
        // height: '50%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 20
    },
    button: {
        backgroundColor: defaultStyling.semidark,
        borderRadius: 10,
        width: '43%', // Adjust the width as per your requirement
        marginHorizontal: 5, // Adjust the horizontal spacing between buttons
    },
    buttonText: {
        color: defaultStyling.primaryTextColor,
        textAlign: 'center', // Center the text inside the button
    },

});

export default ProfileCard;
