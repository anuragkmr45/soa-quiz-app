import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
// import FastImage from 'react-native-fast-image';

import { defaultStyling } from '../../constant/styles';
// import ResultGif from '../../assest/gif/result-gif.gif'

const ResultScreen = ({ route }) => {
    // Dummy data for demonstration
    const { quizResult } = route.params;
    const navigation = useNavigation();

    const marksObtained = quizResult && quizResult.score;
    const maxMarks = quizResult && quizResult.maxmarks;
    const totalQuestions = quizResult && quizResult.totalQuestions;
    const totalCorrect = quizResult && quizResult.totalCorrect;
    const totalIncorrect = totalQuestions - totalCorrect;


    return (
        <View style={styles.container}>
            {/* <FastImage
                source={ResultGif}
                style={styles.background}
                resizeMode={FastImage.resizeMode.cover}
            /> */}
            <Text style={styles.title}>{quizResult && quizResult.quizTitle} Result</Text>
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
                    <Text style={{ color: 'white' }} >
                        Go Back To Home
                    </Text>
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
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: defaultStyling.dark,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 8,
    },
});

export default ResultScreen;
