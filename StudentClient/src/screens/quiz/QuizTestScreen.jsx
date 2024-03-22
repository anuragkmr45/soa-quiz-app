import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity, AppState, Alert, StatusBar, BackHandler } from 'react-native';

import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';
import Loader from '../../components/loading/Loader';
import QuizCard from '../../components/cards/QuizCard';

const QuizTestScreen = ({ route }) => {
    const { quizData } = route.params;
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const [appState, setAppState] = useState(AppState.currentState);
    const [remainingTimeout, setRemainingTimeOut] = useState()

    const handleOptionSelect = (questionText, selectedOption) => {
        const updatedResponses = [...userResponses];

        updatedResponses[currentQuestionIndex] = {
            question: questionText,
            answer: selectedOption
        };
        setUserResponses(updatedResponses);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    // const handlePreviousQuestion = () => {
    //     setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    // };


    const handleQuizSubmit = async () => {
        setIsLoading(true)

        try {
            const res = await apiEndpoints.scoreCounter({
                registrationNumber: quizData.registrationNumber,
                quizId: quizData.quizID,
                responses: userResponses,
            })

            if (res.data.success === true) {
                // console.log('res.data: ', res.data)
                navigation.navigate('Result', { quizResult: res.data })
            }

        } catch (error) {
            if (error.message === 'Request failed with status code 500') {
                Alert.alert('Error While Submiting quiz !!', 'Contact Co-ordinators', [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Home') // Navigate to home screen on OK press
                    }
                ]);
            } else if (error.message === 'Request failed with status code 400') {
                Alert.alert('Quiz Already Submited', '', [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Home') // Navigate to home screen on OK press
                    }
                ]);
            } else if (error.message === 'Request failed with status code 404') {
                Alert.alert('Quiz Ended', '', [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Home') // Navigate to home screen on OK press
                    }
                ]);
            } else {
                Alert.alert('Error Due to bad internet connection', '')
            }
        } finally {
            setIsLoading(false)
        }
    }
    const startTimer = () => {
        backgroundTimer = setTimeout(() => {
            // console.log('Timer expired');
            handleQuizSubmit();
        }, 1000); // 5 seconds
        startTime = Date.now();
    };

    const stopTimer = () => {
        clearTimeout(backgroundTimer);
    };

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState === 'active' && nextAppState === 'background') {
                // Start the timer when the app goes to background
                // console.log('remaining time: ', remainingTimeout)
                if (remainingTimeout === 0) {
                    // console.log('quiz subbmited')
                    handleQuizSubmit()
                }
                startTimer();
            } else if ((appState === 'background' || appState === 'inactive') && nextAppState === 'active') {
                // If app comes back to foreground, clear the timer
                if (backgroundTimer) {
                    const elapsedTime = Date.now() - startTime;
                    const remainingTime = Math.max(0, 5000 - elapsedTime);
                    setRemainingTimeOut(remainingTime);
                    stopTimer();
                }
                // console.log('Timer reset');
            }
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        const backAction = () => {
            Alert.alert(
                'Warning',
                'Are you sure you want to go back?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: 'Yes',
                        onPress: () => navigation.goBack(),
                    },
                ],
                { cancelable: false }
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        // Clear the timer and remove event listener when the component unmounts
        return () => {
            subscription.remove();
            clearTimeout(backgroundTimer);
            backHandler.remove()
        };
    }, [appState, navigation]);


    return (
        isLoading ? (
            <Loader loading={isLoading} />
        ) : (
            <View
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <StatusBar
                    animated={true}
                    backgroundColor={defaultStyling.light}
                />
                <Text style={{ textAlign: 'center', color: 'red', fontSize: 10, fontWeight: 'bold', marginTop: 10 }}>
                    Note:- Closing the app consider as a cheating !!
                </Text>


                <View style={styles.overlayContainer}>
                    <QuizCard
                        questionData={quizData.quizDetails.quizData[currentQuestionIndex]}
                        onSelectOption={handleOptionSelect}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity
                        style={[styles.button, { backgroundColor: defaultStyling.semidark }]}
                        onPress={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        >
                        <Text style={styles.buttonText}>Previous</Text>
                    </TouchableOpacity> */}

                    {
                        currentQuestionIndex === quizData.quizDetails.quizData.length - 1 ? (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={!isLoading ? handleQuizSubmit : ''}
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: defaultStyling.dark }]}
                                onPress={handleNextQuestion}
                                disabled={currentQuestionIndex === quizData.quizDetails.quizData.length - 1}
                            >
                                <Text style={{ color: defaultStyling.light, justifyContent: 'center', alignSelf: 'center' }}>Next</Text>
                            </TouchableOpacity>
                        )
                    }

                </View>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(239, 240, 243, 1)'
    },
    overlayContainer: {
        // ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.dark,
    },
    modalContent: {
        backgroundColor: 'inherit',
        padding: 2,
        borderRadius: 10,
        alignItems: 'center',
    },
    loadingImg: {
        width: 250,
        height: 250,
        // borderRadius: 25, 
    },
    button: {
        backgroundColor: defaultStyling.dark,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 6,
        width: '85%'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: defaultStyling.primaryTextColor,
        alignSelf: 'center'
    },
});

export default QuizTestScreen;
