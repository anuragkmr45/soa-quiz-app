import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthToken from '../hooks/token-manager/useAuthToken.js';

import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/App.jsx'
import LoginScreen from '../screens/auth/LoginScreen.jsx';
import SignupScreen from '../screens/auth/SingupScreen.jsx';
import HomeScreen from '../screens/home/HomeScreen.jsx';
import ResultsScreen from '../screens/student-profile/Results.jsx';
import AboutScreen from '../screens/home/About.jsx';
import QuizTestScreen from '../screens/quiz/QuizTestScreen.jsx';
import ResultScreen from '../screens/quiz/ResultScreen.jsx';

const Navigations = () => {
    const [splash, setSplash] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const navigation = useNavigation();
    const { getToken } = useAuthToken()
    const Stack = createNativeStackNavigator();

    const handleGetToken = async () => {
        try {
            const res = await getToken();

            if (res === '') {
                setIsAuth(true)
                navigation.navigate('Login')
            }

        } catch (error) {
            Alert.alert('Something Went Wrong !! Login Again ')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setSplash(false);
        }, 1610);
        handleGetToken()
        // Add event listener for back button press
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                // If user is on Login or Signup screen, navigate to Landing screen
                if (currentRouteName === "Login" || currentRouteName === "Signup") {
                    navigation.navigate("Landing");
                    return true; // prevent default back button behavior
                }
                return false; // default back button behavior
            }
        );

        // Cleanup function
        return () => backHandler.remove();
    }, []);


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
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="`Results`" component={ResultsScreen} />
            <Stack.Screen name="Quiz" component={QuizTestScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />

        </Stack.Navigator>
    )
}

export default Navigations;
