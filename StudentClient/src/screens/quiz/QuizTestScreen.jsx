import React from 'react';
import { AppState } from 'react-native';
// import useBackgroundTimer from '../../hooks/background-services/useBackgroundTimer';

import QuizCard from '../../components/cards/QuizCard';

const QuizTestScreen = () => {

    // const submitQuiz = () => {
    //     // Call the function to submit the quiz
    //     console.log('Submitting quiz...');
    // };

    // const { startTimer, stopTimer, pauseTimer, resumeTimer } = useBackgroundTimer(submitQuiz, 5000);

    // // Start the timer when the component mounts
    // React.useEffect(() => {
    //     startTimer();
    //     return () => stopTimer();
    // }, []);

    // // Pause the timer when the app comes to the foreground
    // React.useEffect(() => {
    //     const appStateChangeListener = (newState) => {
    //         if (newState === 'active') {
    //             pauseTimer();
    //         }
    //     };
    //     AppState.addEventListener('change', appStateChangeListener);
    //     return () => AppState.removeEventListener('change', appStateChangeListener);
    // }, []);

    return (
        <>
            <QuizCard />
        </>
    );
};

export default QuizTestScreen;
