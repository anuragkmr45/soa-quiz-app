// useBackgroundTimer.js
import { useEffect, useRef } from 'react';
import BackgroundTimer from 'react-native-background-actions';

const useBackgroundTimer = (submitFunction, duration = 5000) => {
    const timerRef = useRef(null);

    useEffect(() => {
        const startTimer = async () => {
            try {
                await BackgroundTimer.start({
                    taskName: 'BackgroundTimerTask',
                    taskTitle: 'Background Timer Task',
                    taskDesc: 'Timer running in the background',
                    taskIcon: {
                        name: 'ic_launcher',
                        type: 'mipmap',
                    },
                    color: '#ff00ff',
                    parameters: {
                        submitFunction, // Function to call after the timer expires
                    },
                });

                // Pause the timer if the app comes to the foreground before the duration expires
                const appStateChangeListener = (newState) => {
                    if (newState === 'active') {
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                    }
                };

                AppState.addEventListener('change', appStateChangeListener);

                // Set up the timer
                timerRef.current = setTimeout(() => {
                    // Call the submit function after the duration expires
                    submitFunction();
                }, duration);
            } catch (error) {
                console.error('Failed to start background timer:', error);
            }
        };

        startTimer();

        // Cleanup function to stop the timer when component unmounts or app comes to foreground
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            BackgroundTimer.stop();
            AppState.removeEventListener('change', appStateChangeListener);
        };
    }, []);

    return {
        startTimer,
        stopTimer,
        pauseTimer,
        resumeTimer,
    };
};

export default useBackgroundTimer;
