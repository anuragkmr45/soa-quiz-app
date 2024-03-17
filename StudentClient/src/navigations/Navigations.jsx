import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert } from 'react-native';
import useAuthToken from '../hooks/token-manager/useAuthToken.js';

import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/App.jsx'
import LoginScreen from '../screens/auth/LoginScreen.jsx';
import SignupScreen from '../screens/auth/SingupScreen.jsx';
import HomeScreen from '../screens/home/HomeScreen.jsx';
import ProfileScreen from '../screens/student-profile/UserProfile.jsx';
import ResultsScreen from '../screens/student-profile/Results.jsx';
import AboutScreen from '../screens/home/About.jsx';
import ScannQRScreen from '../screens/home/join-quiz/ScannQr.jsx';
import QuizTestScreen from '../screens/quiz/QuizTestScreen.jsx';
import ResultScreen from '../screens/quiz/ResultScreen.jsx';

const Navigations = () => {
    const [splash, setSplash] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const { getToken } = useAuthToken()
    const Stack = createNativeStackNavigator();

    const handleGetToken = async () => {
        try {
            const res = await getToken();

            if (res !== '') {
                setIsAuth(true)
                // navigation.navigate('Login')
            }

        } catch (error) {
            Alert.alert('Something Went Wrong !! Login Again ')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setSplash(false);
        }, 1000);
        handleGetToken()
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

            {
                isAuth && (
                    <>
                        {/* <Stack.Screen name="About" component={TermsAndContionsScreen} /> */}
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="About" component={AboutScreen} />
                        <Stack.Screen name="Results" component={ResultsScreen} />
                        <Stack.Screen name="ScannQR" component={ScannQRScreen} />
                        <Stack.Screen name="Quiz" component={QuizTestScreen} />
                        <Stack.Screen name="Result" component={ResultScreen} />
                    </>

                )}

            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />

        </Stack.Navigator>
    )
}

export default Navigations;

