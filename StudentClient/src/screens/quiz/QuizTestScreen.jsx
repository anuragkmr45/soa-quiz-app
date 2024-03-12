import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, AppState, Alert } from 'react-native';
// import CountDown from 'react-native-countdown-component';

import apiEndpoints from '../../services/api';
import QuizCard from '../../components/cards/QuizCard';
import BgImg from '../../assest/image/bg-img.png';
import { defaultStyling } from '../../constant/styles';

const QuizTestScreen = ({ route }) => {
    const { quizData } = route.params;
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const [remainingDuration, setRemainingDuration] = useState(quizData.Duration * 60 - 5);
    const [appState, setAppState] = useState(AppState.currentState);


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

    // console.log('userResponses: ', userResponses)
    const handleQuizSubmit = async () => {
        setIsLoading(true)

        try {
            const res = await apiEndpoints.scoreCounter({
                registrationNumber: quizData.registrationNumber,
                quizId: quizData.quizID,
                responses: userResponses,
            })


            if (res.data.success === true) {
                navigation.navigate('Result', { quizResult: res.data })
                // console.log(res.data)
            }

        } catch (error) {
            // console.error('Error while submiting quiz: ', error);
            Alert.alert('Quiz Already Submitted', '', [
                {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home') // Navigate to home screen on OK press
                }
            ]);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState === 'active' && nextAppState === 'background') {
                console.log('App is working in the background.');
                handleQuizSubmit();
                Alert.alert('Quiz Submitted !! Due To Clsoing Of App')
                Alert.alert('Quiz Submitted !! Due To Clsoing Of App', '', [
                    { text: 'OK', onPress: () => navigation.navigate('Home') },
                ])
            }
            // else if (appState === 'active' && nextAppState === 'inactive') {
            //     console.log('App is in the process of transitioning to the background.');
            // } else if (appState.match(/inactive|background/) && nextAppState === 'active') {
            //     console.log('App is coming to foreground');
            // }
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        const intervalId = setInterval(async () => {
            setRemainingDuration(prevDuration => {
                if (prevDuration === 0) {
                    handleQuizSubmit()
                    clearInterval(intervalId); // Stop the interval
                    return prevDuration;
                } else {
                    return prevDuration - 1;
                }
            });
        }, 600);

        return () => {
            subscription.remove();
            clearInterval(intervalId);
        };
    }, [appState]);

    return (
        <ImageBackground
            source={BgImg}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            {/* <CountDown
                until={quizData.Duration * 60} // seconds
                size={30}
                onFinish={() => alert('Time Finished')}
                digitStyle={{
                    backgroundColor: '#FFF',
                }}
                digitTxtStyle={{ color: defaultStyling.light }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: 'MM', s: 'SS' }}
            /> */}


            <Text style={{ textAlign: 'center', color: 'red', fontSize: 10, fontWeight: 'bold', marginTop: 10 }}>
                Note:- Closing the app consider as a cheating !!
            </Text>

            <View>
                <Text style={{ color: defaultStyling.dark, textAlign: 'center', fontSize: 40 }}>
                    {Math.floor(remainingDuration / 60)}:{(remainingDuration % 60).toString().padStart(2, '0')}
                </Text>
            </View>
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
                            {
                                isLoading ? (
                                    <Text style={styles.buttonText}>Loading ... </Text>
                                ) : (
                                    <>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </>
                                )
                            }
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: defaultStyling.semidark }]}
                            onPress={handleNextQuestion}
                            disabled={currentQuestionIndex === quizData.quizDetails.quizData.length - 1}
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.18)',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        color: 'white',
        alignSelf: 'center'
    },
});

export default QuizTestScreen;
