// import React from 'react'
// import { View, Text, ScrollView } from 'react-native'
// import apiEndpoints from '../../../services/api'

// import { defaultStyling } from '../../../constant/styles'

// const UserProfile = ({ route }) => {

//     console.log(route.params)

//     return (
//         <View style={{ backgroundColor: defaultStyling.dark, flex: 1 }}>
//             <ScrollView>
//                 <Text>UserProfile</Text>
//             </ScrollView>
//         </View>
//     )
// }

// export default UserProfile

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
// import FastImage from 'react-native-fast-image';

import { defaultStyling } from '../../../constant/styles';
// import ResultGif from '../../assest/gif/result-gif.gif'

const ResultScreen = ({ route }) => {
    // Dummy data for demonstration
    const { profile } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* <FastImage
                source={ResultGif}
                style={styles.background}
                resizeMode={FastImage.resizeMode.cover}
            /> */}
            {/* <Text style={styles.title}>{quizResult && quizResult.quizTitle} Result</Text> */}
            <View style={styles.resultContainer}>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Name :</Text>
                    <Text style={styles.resultValue}>{profile.name}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Registration No :</Text>
                    <Text style={styles.resultValue}>{profile.registrationnumber}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Email :</Text>
                    <Text style={styles.resultValue}>{profile.email}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Section :</Text>
                    <Text style={styles.resultValue}>{profile.section}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Branch :</Text>
                    <Text style={styles.resultValue}>{profile.branch}</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Batch :</Text>
                    <Text style={styles.resultValue}>{profile.batch}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="contained" icon='' style={styles.button} onPress={() => { navigation.navigate('Home') }}>
                    <Text style={{ color: 'white' }} >
                        Go Back To Home
                    </Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.dark,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: defaultStyling.primaryTextColor
    },
    resultContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        backgroundColor: defaultStyling.semidark
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    resultLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultValue: {
        fontSize: 16,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: defaultStyling.semidark,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 8,
    },
});

export default ResultScreen;
