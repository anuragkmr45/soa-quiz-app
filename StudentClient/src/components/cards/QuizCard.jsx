import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { defaultStyling } from '../../constant/styles';

const QuizCard = ({ questionData, onSelectOption }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        onSelectOption(questionData.question_text, option);
    };

    return (
        <Card style={{ width: '100%', backgroundColor: 'white' }}>
            <ScrollView style={{ paddingVertical: 20 }}>
                <Card.Content>
                    <ScrollView>
                        <Text style={{ color: defaultStyling.dark, marginBottom: 10, fontSize: 17 }} >
                            {questionData.question_text}
                        </Text>
                        {questionData.options.map((option, index) => (
                            <View key={index}>
                                <Chip
                                    selected={selectedOption === option}
                                    onPress={() => handleOptionPress(option)}
                                    style={{
                                        marginVertical: 8,
                                        paddingVertical: 10,
                                        backgroundColor: selectedOption === option ? defaultStyling.dark : '#e0e8eb'
                                    }}
                                >
                                    <Text style={{
                                        color: selectedOption === option ? 'white' : defaultStyling.semidark
                                    }}>
                                        {option}
                                    </Text>
                                </Chip>
                            </View>
                        ))}
                    </ScrollView>
                </Card.Content>
            </ScrollView>
        </Card>
    )
}

export default QuizCard;
