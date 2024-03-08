import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, TextInput } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';
import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';

const UploadQuizDtlCard = () => {
    const [quizId, setQuizId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleJoinQuiz = async () => {
        setLoading(true)
        try {
            // if (quizId !== '' && password !== '') {
            const res = await apiEndpoints.joinQuiz({ quizId: 'itersoa1VQV', password: 'cIiwVNIz' })

            if (res.status === 200) {
                const quizData = res.data
                // console.log('quizData inside the upload quix card: ', quizData)
                navigation.navigate('Quiz', { quizData: quizData })
            }
            // }

        } catch (error) {
            console.error('Error while joining quiz: ', error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Text
                    style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: '500',
                        fontSize: 25
                    }}>Attend Live Quiz</Text>
                <Card.Content>
                    <TextInput
                        label="Quiz ID"
                        value={quizId}
                        onChangeText={text => setQuizId(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />

                    {
                        loading ? (
                            <Button mode="outlined" style={styles.button}>
                                <Text style={{ color: 'white' }} >
                                    Loading ...
                                </Text>
                            </Button>
                        ) : (
                            <Button mode="outlined" onPress={handleJoinQuiz} style={styles.button}>
                                <Text style={{ color: 'white' }} >
                                    Join Quiz
                                </Text>
                            </Button>
                        )
                    }

                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    card: {
        backgroundColor: defaultStyling.semidark,
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'transparent',
        color: defaultStyling.dark
    },
    button: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: defaultStyling.dark,
        // borderColor: defaultStyling,
    },
});

export default UploadQuizDtlCard;
