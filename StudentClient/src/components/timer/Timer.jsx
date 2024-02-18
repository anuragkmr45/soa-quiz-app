import React from 'react';
import { Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const Timer = ({ countdownTime }) => {
    // const themeColors = {
    //     dark: '#2d4c56',
    //     semidark: '#3f575e',
    //     light: '#bc1823',
    // };

    // const getColorsArray = (remainingTime) => {
    //     if (remainingTime <= 300) { // 5 minutes remaining
    //         return [themeColors.light, themeColors.light, themeColors.light, themeColors.light];
    //     }
    //     return [themeColors.dark, themeColors.semidark, themeColors.light, themeColors.light];
    // };

    return (
        <CountdownCircleTimer
            isPlaying
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
        >
            {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
    );
};

export default Timer;
