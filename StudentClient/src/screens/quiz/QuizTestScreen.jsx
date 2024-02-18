import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, AppState } from 'react-native';

import CountDown from 'react-native-countdown-component';
import QuizCard from '../../components/cards/QuizCard';
import BgImg from '../../assest/image/bg-img.png';
import { defaultStyling } from '../../constant/styles';

const QuizTestScreen = () => {

    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState === 'active' && nextAppState === 'background') {
                console.log('App is working in the background.');
            }
            setAppState(nextAppState);
        };

        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, [appState]);

    return (
        <ImageBackground
            source={BgImg}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <CountDown
                until={216000} // seconds
                size={30}
                onFinish={() => alert('Time Finished')}
                digitStyle={{
                    backgroundColor: '#FFF',
                }}
                digitTxtStyle={{ color: defaultStyling.light }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: 'MM', s: 'SS' }}
            />
            <View style={styles.overlayContainer}>
                <QuizCard />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.18)'
    },
    button: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: defaultStyling.dark,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
});

export default QuizTestScreen;
