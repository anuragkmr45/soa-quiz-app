import * as React from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles';
import BgImg from '../../assest/image/bg-img.png';

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
                <Text
                    style={{
                        color: defaultStyling.dark,
                        alignSelf: 'center',
                        fontWeight: '500',
                        fontSize: 25
                    }}>Attend Live Quize</Text>
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
                        <Text style={{ color: 'white' }} >
                            Join Quiz
                        </Text>
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
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    button: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: defaultStyling.dark,
        borderColor: defaultStyling.backgroundColor,
    },
});

export default UploadQuizDtlCard;
