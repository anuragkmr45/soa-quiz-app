import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { defaultStyling } from '../../constant/styles';
import ProfileCard from '../../components/cards/ProfileCard';
import UploadQuizDtlCard from '../../components/cards/UploadQuizDtlCard';
import apiEndpoints from '../../services/api';

const HomeScreen = () => {
    const handleLogout = async () => {
        try {
            await apiEndpoints.logout();
        } catch (error) {
            console.error('Error while logout: ', error)
            alert('Something went wrong !! Try again later')
        }
    }

    return (
        <View style={styles.container}>
            <ProfileCard />
            <Card style={styles.card} >
                <Card.Content>
                    <Text variant="bodyMedium" style={styles.cardContent}>Name: </Text>
                    <Text variant="bodyMedium" style={styles.cardContent}>Name: </Text>
                    <Text variant="bodyMedium" style={styles.cardContent}>Name: </Text>
                    <Text variant="bodyMedium" style={styles.cardContent}>Name: </Text>
                </Card.Content>
            </Card>
            <UploadQuizDtlCard />

            <View style={styles.buttonContainer}>
                <Button mode="contained" icon='' style={styles.button} onPress={handleLogout}>
                    Logout
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.dark,
    },
    card: {
        // color: defaultStyling.dark
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
        color: defaultStyling.dark
    },
    text: {
        color: 'white',
        marginBottom: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '92%',
        paddingHorizontal: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#830415',
        borderRadius: 12,
        paddingVertical: 5,
    },
});

export default HomeScreen;
