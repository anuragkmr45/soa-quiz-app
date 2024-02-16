import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

import { defaultStyling } from '../../constant/styles';

const ResultScreen = () => {
    // Dummy data for demonstration
    const marksObtained = 80;
    const maxMarks = 100;
    const totalQuestions = 20;
    const totalCorrect = 16;
    const totalIncorrect = totalQuestions - totalCorrect;

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quiz Name Result</Text>
            <View style={styles.resultContainer}>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Marks Obtained:</Text>
                    <Text style={styles.resultValue}>{marksObtained}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Max Marks:</Text>
                    <Text style={styles.resultValue}>{maxMarks}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Total Questions:</Text>
                    <Text style={styles.resultValue}>{totalQuestions}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Total Correct:</Text>
                    <Text style={styles.resultValue}>{totalCorrect}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Total Incorrect:</Text>
                    <Text style={styles.resultValue}>{totalIncorrect}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="contained" icon='' style={styles.button} onPress={() => { navigation.navigate('Home') }}>
                    Go Back To Home
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
        backgroundColor: defaultStyling.backgroundColor,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    resultContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    resultLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultValue: {
        fontSize: 16,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20, // Adjust the position as needed
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        width: '100%',
    },
});

export default ResultScreen;
