import { View, StyleSheet } from 'react-native'
import { Divider, Button } from 'react-native-paper'
import React from 'react'

import { defaultStyling } from '../../constant/styles'
import ProfileCard from '../../components/cards/ProfileCard'
import UploadQuizDtlCard from '../../components/cards/UploadQuizDtlCard'
import apiEndpoints from '../../services/api'

const HomeScreen = () => {

    const handleLogout = async () => {
        try {
            await apiEndpoints.logout();
        } catch (error) {
            console.error('Error while logout: ', error)
            alert('Something went wrong !! Try again later')
        }
    }

    return (
        <View style={styles.conatiner}>
            <ProfileCard />
            <Divider />
            <UploadQuizDtlCard />
            <View style={styles.buttonContainer}>
                <Button mode="contained" icon='' style={styles.button} onPress={handleLogout}>
                    Logout
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.backgroundColor,
        color: defaultStyling.color,
        // padding: 2,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20, // Adjust the position as needed
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#830415'
    },
})

export default HomeScreen


// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
// import { defaultStyling } from '../../constant/styles';

// const HomeScreen = () => {
//     return (
//         <View style={styles.container}>
//             <Card style={styles.card}>
//                 <Card.Content>
//                     <Title>User Profile</Title>
//                     <Paragraph>Name: John Doe</Paragraph>
//                     <Paragraph>Reg No: 123456</Paragraph>
//                     <Paragraph>Branch: Computer Science</Paragraph>
//                     <Paragraph>Section: A</Paragraph>
//                 </Card.Content>
//             </Card>
//             <View style={styles.form}>
//                 <TextInput label="Quiz ID" />
//                 <TextInput label="Password" secureTextEntry />
//                 <Button mode="contained" style={styles.button}>Submit</Button>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//         backgroundColor: defaultStyling.backgroundColor
//     },
//     card: {
//         marginBottom: 20,
//     },
//     form: {
//         marginTop: 20,
//     },
//     button: {
//         marginTop: 10,
//     },
// });

// export default HomeScreen;
