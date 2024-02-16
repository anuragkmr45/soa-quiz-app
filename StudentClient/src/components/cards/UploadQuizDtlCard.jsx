import * as React from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';

const UploadQuizDtlCard = () => {
    const [quizId, setQuizId] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleJoinQuiz = async () => {
        try {
            const res = await apiEndpoints.joinQuiz(quizId, password)
        } catch (error) {
            console.error('Error while joining quiz: ', error)
        }
        console.log('Quiz ID:', quizId);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
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
                    <Button mode="outlined" onPress={handleJoinQuiz} style={styles.button}>
                        Join Quiz
                    </Button>
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
        width: '100%'
    },
    card: {
        width: '80%',
        padding: 10,
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    button: {
        marginTop: 10,
        borderColor: defaultStyling.backgroundColor,
    },
});

export default UploadQuizDtlCard;
