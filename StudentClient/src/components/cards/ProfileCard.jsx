import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import { Image, View, StyleSheet } from 'react-native';

const ProfileCard = () => (
    // <Card style={styles.card}>
    <View style={styles.container}>
        <View style={styles.content}>
            <Card.Content>
                <Text variant="titleLarge" style={styles.details} >Welcome  !! </Text>
                <Text variant="titleLarge" style={styles.details} >User Name</Text>
                {/* <Text variant="bodyMedium" style={styles.details}>Reg no</Text>
                <Text variant="bodyMedium" style={styles.details}>brancg</Text>
                <Text variant="bodyMedium" style={styles.details}>Section</Text>
                <Text variant="bodyMedium" style={styles.details}>Batch</Text> */}
            </Card.Content>
        </View>
        <Image source={{ uri: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' }} style={styles.image} />
    </View>
    // </Card>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: '5%',
        alignItems: 'center',
        width: '95%',
        backgroundColor: 'transparent', // Set background color to transparent
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
    content: {
        flex: 1,
        color: 'white'
    },
    details: {
        color: 'white'
    }
});

export default ProfileCard;
