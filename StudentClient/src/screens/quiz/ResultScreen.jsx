import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

import { defaultStyling } from '../../constant/styles';
import CrossIcon from '../../assest/icons/cross.png'

const ResultScreen = ({ route }) => {
    // Dummy data for demonstration
    const { quizResult } = route.params;
    const navigation = useNavigation();

    const marksObtained = quizResult && quizResult.obtainedScore;
    const maxMarks = quizResult && quizResult.totalQuestions;
    const totalQuestions = quizResult && quizResult.totalQuestions;
    const totalCorrect = quizResult && quizResult.correctAttempts;
    const totalIncorrect = quizResult && quizResult.wrongAttempts;

    const [paddingValue] = useState(new Animated.Value(35));

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(paddingValue, {
                    toValue: 15,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: false // Set useNativeDriver to false
                }),
                Animated.timing(paddingValue, {
                    toValue: 35,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: false // Set useNativeDriver to false
                })
            ])
        );

        animation.start(); // Start the animation

        return () => {
            animation.stop(); // Stop the animation when the component unmounts
        };
    }, []);

    return (
        <View style={{ backgroundColor: defaultStyling.light, height: '100%', flex: 1 }}>
            <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: '65%', backgroundColor: defaultStyling.dark, elevation: 4 }}>
                <View style={{ padding: 10 }}>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => { navigation.navigate('Home') }}>
                        <Image source={CrossIcon} resizeMode='cover' />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Animated.View style={{ backgroundColor: 'rgba(217, 217, 217, 0.2)', padding: paddingValue, elevation: 0.1, borderRadius: 150 }}>
                        <View style={{ backgroundColor: 'rgba(217, 217, 217, 0.25)', padding: 25, borderRadius: 150 }}>
                            <View style={{ elevation: 4, backgroundColor: defaultStyling.light, paddingVertical: 20, paddingHorizontal: 35, borderRadius: 150 }}>
                                <Text style={{ color: defaultStyling.dark }}>Your Score</Text>
                                <Text style={{ fontSize: 60, color: defaultStyling.dark, textAlign: 'center' }}>{marksObtained}</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            </View>
            <View>
                <View style={{ position: 'relative', bottom: 60, backgroundColor: defaultStyling.light, paddingVertical: 20, borderRadius: 20, marginHorizontal: 20, elevation: 4 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 6, backgroundColor: defaultStyling.dark, borderRadius: 150, alignSelf: 'center', marginRight: 3 }} />
                                <Text style={{ color: defaultStyling.dark, fontSize: 20 }}>{maxMarks}</Text>
                            </View>
                            <Text style={{ color: defaultStyling.secondaryText, opacity: 0.6, fontSize: 10 }}>Max Marks</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ padding: 6, backgroundColor: defaultStyling.dark, borderRadius: 150, alignSelf: 'center', marginRight: 3 }} />
                                <Text style={{ color: defaultStyling.dark, fontSize: 20 }}>{totalQuestions}</Text>
                            </View>
                            <Text style={{ color: defaultStyling.secondaryText, opacity: 0.6, fontSize: 10 }}>Total Questions</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                        <View>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ padding: 6, backgroundColor: defaultStyling.success, borderRadius: 150, alignSelf: 'center', marginRight: 3 }} />
                                <Text style={{ color: defaultStyling.success, fontSize: 20 }}>{totalCorrect}</Text>
                            </View>
                            <Text style={{ color: defaultStyling.secondaryText, opacity: 0.6, fontSize: 10 }}>Correct Ans</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 6, backgroundColor: defaultStyling.danger, borderRadius: 150, alignSelf: 'center', marginRight: 3 }} />
                                <Text style={{ color: defaultStyling.danger, fontSize: 20 }}>{totalIncorrect}</Text>
                            </View>
                            <Text style={{ color: defaultStyling.secondaryText, opacity: 0.6, fontSize: 10 }}>Wrong Ans</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                <Button style={{ backgroundColor: defaultStyling.dark, paddingVertical: 10, borderRadius: 10 }} onPress={() => { navigation.navigate('Home') }}>
                    <Text style={{ color: defaultStyling.light }}>
                        Back To Home
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
        backgroundColor: defaultStyling.dark,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: defaultStyling.primaryTextColor
    },
    resultContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        backgroundColor: defaultStyling.semidark
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
        backgroundColor: defaultStyling.semidark,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 8,
    },
});

export default ResultScreen;
