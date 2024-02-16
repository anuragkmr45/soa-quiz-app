import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';

import { defaultStyling } from '../../constant/styles.js';

const QuizCard = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleLeftButtonPress = () => {
        console.log('Selected Option:', selectedOption);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    1. This is a ten-word text.This is a ten-word text.This is a ten-word text.This is a ten-word
                </Text>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.option}>
                    <RadioButton
                        value="option1"
                        status={selectedOption === 'option1' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedOption('option1')}
                    />
                    <Text>Option 1Option 1</Text>
                </View>
                <View style={styles.option}>
                    <RadioButton
                        value="option2"
                        status={selectedOption === 'option2' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedOption('option2')}
                    />
                    <Text>Option 2Opttion 2</Text>
                </View>
                <View style={styles.option}>
                    <RadioButton
                        value="option3"
                        status={selectedOption === 'option3' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedOption('option3')}
                    />
                    <Text>Option 3Option tion 3</Text>
                </View>
                <View style={styles.option}>
                    <RadioButton
                        value="option4"
                        status={selectedOption === 'option4' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedOption('option4')}
                    />
                    <Text>Option 4Option 44Option 4</Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                {/* <TouchableOpacity style={styles.leftButton} onPress={handleLeftButtonPress}>
                    <Text>Left</Text>
                </TouchableOpacity> */}
                <Button mode="contained" style={styles.button} onPress={handleLeftButtonPress}>
                    Next
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.backgroundColor,
        color: defaultStyling.color,
        padding: 10,
        width: '100%'
    },
    textContainer: {
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
    },
    optionsContainer: {
        marginBottom: 20,
        paddingLeft: 8,
        alignSelf: 'flex-start'
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        marginTop: 10,
        width: '60%',
    },
});

export default QuizCard