import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/App.jsx'
import LoginScreen from '../screens/auth/LoginScreen.jsx';
import SignupScreen from '../screens/auth/SingupScreen.jsx';
import HomeScreen from '../screens/home/HomeScreen.jsx';
import QuizTestScreen from '../screens/quiz/QuizTestScreen.jsx';
import ResultScreen from '../screens/quiz/ResultScreen.jsx';

const Navigations = () => {
    const [splash, setSplash] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSplash(false);
        }, 1610);
    }, []);

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Splash"
        >
            {splash ? (
                <Stack.Screen name="Splash" component={SplashScreen} />
            ) : (
                <Stack.Screen name="Landing" component={LandingScreen} />
            )}

            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Quiz Test" component={QuizTestScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
    )
}

export default Navigations;