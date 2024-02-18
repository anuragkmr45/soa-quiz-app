import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Portal, Modal } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import { defaultStyling } from '../../constant/styles';
import AboutGif from '../../assest/gif/result-gif.gif'

const About = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    return (
        <>
            <Card style={styles.card} onPress={showModal}>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.imageContainer}>
                        <FastImage
                            source={AboutGif}
                            style={styles.image}
                            onError={(error) => console.error('Error loading image:', error)}
                            onLoad={() => console.log('Image loaded successfully')}
                        />
                    </View>
                    <Text variant="bodyMedium" style={{ fontSize: 16 }}>About Creators</Text>
                </Card.Content>
            </Card>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '80%',
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
        alignSelf: 'center'
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 25, // Assuming you want a circular image
    },
});

export default About