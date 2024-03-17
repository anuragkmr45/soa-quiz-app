import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { defaultStyling } from '../../constant/styles';

const QuizCard = ({ questionData, onSelectOption, remainingDuration }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        onSelectOption(questionData.question_text, option);
    };

    return (
        <View style={{ paddingVertical: 10, height: '100%' }}>
            <View style={{ alignItems: 'center', zIndex: 20 }}>
                <View style={{ borderWidth: 5, borderColor: 'rgba(239, 240, 243, 1)', paddingVertical: 25, paddingHorizontal: 15, borderRadius: 150, elevation: 4, backgroundColor: defaultStyling.dark }}>
                    <Text style={{ color: defaultStyling.light, textAlign: 'center', fontSize: 20, elevation: 4 }}>
                        {Math.floor(remainingDuration / 60)}:{(remainingDuration % 60).toString().padStart(2, '0')}
                    </Text>
                </View>
            </View>
            <Card.Content style={{ backgroundColor: defaultStyling.dark, height: '30%', paddingVertical: 10, justifyContent: 'center', borderRadius: 10, elevation: 4, position: 'relative', bottom: 35 }}>
                <ScrollView style={{ marginTop: 26 }}>
                    <Text style={{ color: defaultStyling.light, marginBottom: 10, fontSize: 20 }} >
                        {questionData.question_text}
                    </Text>
                </ScrollView>
            </Card.Content>

            <ScrollView style={{ height: '100%' }}>
                <View style={{ paddingVertical: 20, paddingHorizontal: 10, height: '100%' }}>

                    {questionData?.options?.map((option, index) => (
                        <View key={index} >
                            <TouchableOpacity
                                selected={selectedOption === option}
                                onPress={() => handleOptionPress(option)}
                                style={{
                                    marginVertical: 8,
                                    padding: 10,
                                    borderRadius: 16,
                                    backgroundColor: selectedOption === option ? defaultStyling.semidark : defaultStyling.light
                                }}
                            >
                                <Text style={{
                                    color: selectedOption === option ? defaultStyling.dark : defaultStyling.primaryText
                                }}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View >
    )
}

export default QuizCard;
