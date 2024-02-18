import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const SplashScreenPregerssBar = () => {
    const [progress, setProgress] = useState(0.1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 0.1;
                return newProgress >= 1 ? 1 : newProgress;
            });
        }, 150);

        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
        }, 3300);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

    return <ProgressBar progress={progress} color={MD3Colors.tertiary70} style={styles.loader} />;
};

const styles = StyleSheet.create({
    loader: {
        height: 12,
        borderRadius: 3,
        zIndex: 10
    },
});

export default SplashScreenPregerssBar;
