import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useAuthToken from '../hooks/token-manager/useAuthToken';
import { defaultStyling } from '../constant/styles';
import ForwardIcon from '../assest/icons/forward.webp';
import HeroImg from '../assest/image/heroimg.webp';

const App = () => {
    const [isAuth, setIsAuth] = useState(false);

    const navigation = useNavigation();
    const { getToken } = useAuthToken();

    useEffect(() => {
        const handleGetToken = async () => {
            try {
                const res = await getToken();

                if (res) {
                    setIsAuth(true);
                }
            } catch (error) {
                // Handle error gracefully
                alert('Restart your app');
            }
        };

        handleGetToken();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={defaultStyling.dark}
            />
            {/* <ImageBackground source={CurveBgImg}> */}
            <View style={{ height: '100%', overflow: 'hidden' }}>
                <Image source={HeroImg} />
            </View>
            {/* </ImageBackground> */}

            <View style={{ backgroundColor: defaultStyling.light, borderTopRightRadius: 20, borderTopLeftRadius: 20, width: '100%', position: 'absolute', bottom: 0, padding: '8%' }}>
                <View style={{ borderWidth: 2, borderRadius: 10, alignSelf: 'center', borderColor: defaultStyling.dark, width: '20%' }} />
                <Text style={{ color: defaultStyling.primaryText, fontWeight: '400', fontSize: 40, marginTop: '4%' }}>Welcome</Text>
                <Text style={{ color: defaultStyling.secondaryText, fontSize: 12, opacity: 0.6 }}>Sign in to your Registered Account</Text>
                <View style={{ width: '15%', height: 2, backgroundColor: defaultStyling.dark, elevation: 2, marginVertical: '4%' }} />


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { isAuth ? navigation.navigate('Home') : navigation.navigate('Login') }}>
                    <Image source={ForwardIcon} />
                </TouchableOpacity>
            </View>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.dark
    },
    centerContainer: {
        alignItems: 'center',
    },
    image: {
        width: 220,
        height: 220,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: defaultStyling.primaryTextColor,
        fontStyle: 'italic',
    },
    button: {
        alignItems: 'flex-end',
        // opacity: 0.7,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: defaultStyling.primaryTextColor,
        alignSelf: 'center',
    },
});

export default App;
