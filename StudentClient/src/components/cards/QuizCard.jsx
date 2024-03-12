import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { defaultStyling } from '../../constant/styles';

const QuizCard = ({ questionData, onSelectOption }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        onSelectOption(questionData.question_text, option);
    };

    return (
        <Card style={{ width: '100%', backgroundColor: defaultStyling.dark, maxHeight: '70%' }}>
            <ScrollView style={{ paddingVertical: 20 }}>
                <Card.Content>
                    <ScrollView>
                        <Text style={{ color: defaultStyling.primaryTextColor, marginBottom: 10, fontSize: 20 }} >
                            {questionData.question_text}
                        </Text>
                        <View style={{ paddingVertical: 20 }}>

                            {questionData?.options?.map((option, index) => (
                                <View key={index} >
                                    <TouchableOpacity
                                        selected={selectedOption === option}
                                        onPress={() => handleOptionPress(option)}
                                        style={{
                                            marginVertical: 8,
                                            padding: 10,
                                            borderRadius: 10,
                                            backgroundColor: selectedOption === option ? defaultStyling.dark : defaultStyling.semidark
                                        }}
                                    >
                                        <Text style={{
                                            color: selectedOption === option ? defaultStyling.light : defaultStyling.primaryTextColor
                                        }}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </Card.Content>
            </ScrollView>
        </Card>
    )
}

export default QuizCard;
